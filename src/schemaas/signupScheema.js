
import { z } from 'zod'

//validation
export const userNameValidation = z.string().min(2, "Username must be atleast 2 cahracters").max(10, "Useraname must be no more than 10 characters").regex(/^[a-zA-Z0-9_]+$/, "Username must not contain special characters");
//a-z,A-Z 0-9 _ underscore allow hai

export const SignUpScheema = z.object({

    username: userNameValidation,
    email: z.string().email({ message: "Invalid Email address" }),
    password: z.string().min(6, { message: "password must be atleast 6 character" })

})