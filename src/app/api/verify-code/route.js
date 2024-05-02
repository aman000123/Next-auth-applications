

import Connect from "@/connetc/dbconnetc";

import UserModel from "@/models/user";


export async function POST(request) {
    await Connect()

    try {
        const { username, code } = await request.json()
        //url se aa rahi hai isliye dceode karke hai 
        //url ke through 
        //decodedComponen t= space ko %20 bna deta hai

        const decodedUserName = decodeURIComponent(username)
        console.log("decoded username", username)
        const user = await UserModel.findOne({ username: decodedUserName })

        if (!user) {
            return Response.json(
                { success: false, message: 'User not found' },
                { status: 404 }
            );
        }


        // Check if the code is correct and not expired
        const isCodeValid = user.verifyCode === code;
        const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date();//user ki verify data turant ki date se jyada validity ho to code expire nhi hua hoga

        if (isCodeValid && isCodeNotExpired) {
            // Update the user's verification status
            user.isVerified = true;
            await user.save();
            return Response.json(
                { success: true, message: 'Account verified successfully' },
                { status: 200 }
            );

        } else if (!isCodeNotExpired) {
            // Code has expired
            return Response.json(
                {
                    success: false,
                    message:
                        'Verification code has expired. Please sign up again to get a new code.',
                },
                { status: 400 }
            );
        } else {
            // Code is incorrect
            return Response.json(
                { success: false, message: 'Incorrect verification code' },
                { status: 400 }
            );
        }

    } catch (error) {
        console.log("error in checking verify code ", error)
        return Response.json(
            {
                success: false,
                message: "Error checking verify code"

            },
            { status: 500 }
        );
    }
}



