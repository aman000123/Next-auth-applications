

import Connect from "@/connetc/dbconnetc";
import UserModel from "@/models/user";
import bcrypt from 'bcryptjs'
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";


export async function POST(request) {

    await Connect()
    try {

        const { username, email, password } = await request.json()

        const existingUserVerifiedByUserName = await UserModel.findOne({
            username,
            isVerified: true
        })
        if (existingUserVerifiedByUserName) {
            return Response.json({
                success: false,
                message: "Username is already exist"
            },
                {
                    status: 400
                })

        }

        const existingUserByEmail = await UserModel.findOne({ email })
        let verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
        console.log("verify code", verifyCode)


        //check email exist or not

        if (existingUserByEmail) {
            //if user is  existing then and verified then
            if (existingUserByEmail.isVerified) {
                return Response.json(
                    {
                        success: false,
                        message: 'User already exists with this email',
                    },
                    { status: 400 }
                );
            } else {

                const hashedPassword = await bcrypt.hash(password, 10);
                existingUserByEmail.password = hashedPassword;
                existingUserByEmail.verifyCode = verifyCode;
                existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000);   //current time me 1 hour increase
                //new key se object milta hai
                //so object refrence store karta hai //date is objects
                await existingUserByEmail.save();
            }


        } else {


            await existingUserByEmail.save();
            const hashedPassword = await bcrypt.hash(password, 10);
            const expiryDate = new Date();
            expiryDate.setHours(expiryDate.getHours() + 1);

            const newUser = new UserModel({
                username,
                email,
                password: hashedPassword,
                verifyCode,
                verifyCodeExpiry: expiryDate,
                isVerified: false,
                isAcceptingMessages: true,
                messages: [],
            });
            console.log("new user", newUser)
            await newUser.save();
        }

        //send verification email now after save users
        const emailResponse = await sendVerificationEmail(
            email,
            username,
            verifyCode
        );
        if (!emailResponse.success) {
            return Response.json(
                {
                    success: false,
                    message: emailResponse.message,
                },
                { status: 500 }
            );
        }

        return Response.json(
            {
                success: true,
                message: 'User registered successfully. Please verify your account.',
            },
            { status: 201 }
        );



    } catch (error) {
        console.log("error in signup", error)
        return Response.json({
            success: false,
            message: "Erro in registering user"
        },
            {
                status: 500
            })
    }

}
