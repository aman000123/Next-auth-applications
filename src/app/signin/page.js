"use client"
import { useSession, signIn, signOut } from "next-auth/react"

//folder name  ==(auth)  grouping karte hain collection==>routes me kam nhi karta hai
//() parenthisis lagene se wo route me count nhi grouping me use 
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form"
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { SignInScheema } from "@/schemaas/signinScheema";

const SignIn = () => {
    const { register, handleSubmit } = useForm()
    //loader implement for check username is unique or not
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter()

    const onSubmit = async (formData) => {
        setIsSubmitting(true);
        try {
            // Validate form data using a schema (you can define your own validation schema)
            const validatedData = SignInScheema.parse(formData);
            // Sign in with credentials provider (NextAuth)
            const result = await signIn('credentials', {
                redirect: false,
                identifier: validatedData.identifier,
                password: validatedData.password,
            });
            // Check the result from the signIn method
            console.log("result", result)
            if (result?.error) {
                // Handle specific authentication errors
                if (result.error === 'No user found with this email') {
                    toast.error('User not found. Please check your email/username and try again.');
                } else if (result.error === 'Incorrect password') {
                    toast.error('Incorrect password');
                } else {
                    toast.error('Error signing in. Please try again.');
                }
            } else if (result?.url) {
                console.log('Successful sign-in');
                toast.success("Login Sucessfully done")
                router.push('/')
            }
        } catch (error) {
            console.error('Error signing in:', error);
            toast.error('Error signing in. Please try again.');
        } finally {
            setIsSubmitting(false); // Reset submitting state
        }
    };

    return (
        <>
            <div className="container-md">
                <form className="row g-3 mt-4" style={{ width: "30rem", margin: "auto" }} onSubmit={handleSubmit(onSubmit)} >
                    <div className="col-md-9">
                        <label htmlFor="inputEmail4" className="form-label">Email/Username</label>
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Email/Username"
                            id="inputEmail4"
                            name="identifier"
                            {...register("identifier", { required: true, pattern: /^\S+@\S+$/i })}
                        />
                    </div>
                    <div className="col-md-9">
                        <label htmlFor="inputPassword4" className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="inputPassword4"
                            {...register("password", { required: true })}
                        />
                    </div>
                    <div className="col-md-9">
                        <div className="row">
                            <div class="col-4">
                                <button type="submit" className="btn btn-secondary">
                                    {isSubmitting ? 'Signing In...' : 'Sign In'}
                                </button>
                            </div>
                            <div class="col-8">
                                <p className="fs-6">Not have an account? <Link href="/signup">Sign up here</Link></p>
                            </div>

                        </div>
                    </div>
                </form>
            </div>

        </>
    )
}
export default SignIn

