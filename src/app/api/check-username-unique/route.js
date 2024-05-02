

import UserModel from "@/models/user";
import Connect from "@/connetc/dbconnetc";
import { z } from 'zod'
import { SignUpScheema, userNameValidation } from "@/schemaas/signupScheema";


//jb bhi zod use to schema ki need
const UsernameQuerySchema = z.object({
    username: userNameValidation,
    //signup:SignUpScheema = signup check karna ho to validatiions
});

//check if username is valid or not
export async function GET(request) {


    //use this in all routes if methods get nhai ho to 
    await Connect()

    try {
        //username url query se check karenge 
        //jo bhi check karega wo ek url bhejega quert ke sath

        //localhost:3000/api/check-unique-user?username=aman


        // const url = new URL(request.url, 'http://localhost'); // Provide a base URL if needed
        // const queryParams = Object.fromEntries(url.searchParams.entries());
        // const result = UsernameQuerySchema.safeParse(queryParams);

        const { searchParams } = new URL(request.url)//return { 'username' => 'aman' }

        const queryParams = {
            username: searchParams.get('username')
        };
        const result = UsernameQuerySchema.safeParse(queryParams);
        console.log("result in user unique", result)
        if (!result.success) {
            const usernameErrors = result.error.format().username?._errors || [];
            //only username related error chahiye hota h 
            //result.error.format() sare type ke error hote hain isme
            return Response.json(
                {
                    success: false,
                    message:
                        usernameErrors?.length > 0
                            ? usernameErrors.join(', ')
                            : 'Invalid query parameters',
                },
                { status: 400 }
            );
        }


        const { username } = result.data;

        const existingVerifiedUser = await UserModel.findOne({
            username,
            isVerified: true,
        });
        if (existingVerifiedUser) {
            return Response.json(
                {
                    success: false,
                    message: 'Username is already taken',
                },
                { status: 200 }
            );
        }

        return Response.json(
            {
                success: true,
                message: 'Username is unique',
            },
            { status: 200 }
        );

    } catch (error) {
        console.log("error in checking user name unique", error)
        return Response.json(
            {
                success: false,
                message: "Error checking username"
                // usernameErrors?.length > 0
                //   ? usernameErrors.join(', ')
                //   : 'Invalid query parameters',
            },
            { status: 500 }
        );
    }
}

