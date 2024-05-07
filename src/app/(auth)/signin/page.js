"use client"
import { useSession, signIn, signOut } from "next-auth/react"

//folder name  ==(auth)  grouping karte hain collection==>routes me kam nhi karta hai
//() parenthisis lagene se wo route me count nhi grouping me use 



import { useEffect, useState } from "react";
import { useForm } from "react-hook-form"
import Link from 'next/link';
import axios from "axios";
import { useDebouncedCallback } from 'use-debounce';
import { useRouter } from "next/navigation";
import { SignUpScheema } from "@/schemaas/signupScheema";
import { toast } from "react-toastify";
import { SignInScheema } from "@/schemaas/signinScheema";

const SignIn = () => {
    const { register, handleSubmit, watch, formState: { errors }, } = useForm()

    const [isCheckingUsername, setIsCheckingUsername] = useState(false);
    //loader implement for check username is unique or not
    const [isSubmitting, setIsSubmitting] = useState(false);



    const router = useRouter()



    const onSubmit = async (formData) => {
        //use next auth in signun

        const result = await signIn('credentials', {
            redirect: false,//redirect automatic nhi
            identifier: formData.identifier,//identifier should email
            password: formData.password,
        })

        if (result?.error) {
            if (result.error === 'CredentialsSignin') {
                toast.error('Incorrect username or password')

            } else {
                toast.error()
                console.log("error in")
            }
        }

        if (result?.url) {
            console.log("success")
            // router.replace('/dashboard');
        }
    };


    return (
        <>
            <div className="container-md">
                <form className="row g-3" onSubmit={handleSubmit(onSubmit)}>

                    <div className="col-md-7">
                        <label htmlFor="inputEmail4" className="form-label">Email/Username</label>
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Email/Username"
                            id="inputEmail4"
                            name="identifier"
                            {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
                        />
                    </div>
                    <div className="col-md-7">
                        <label htmlFor="inputPassword4" className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="inputPassword4"
                            {...register("password", { required: true })}
                        />
                    </div>
                    <div className="col-12">
                        <button type="submit" className="btn btn-primary">
                            {isSubmitting ? 'Loading...' : 'Sign up'}
                        </button>
                    </div>
                </form>
            </div>

        </>
    )
}


export default SignIn

