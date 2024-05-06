"use client"

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form"
import Link from 'next/link';
import axios from "axios";
import { useDebouncedCallback } from 'use-debounce';
import { useRouter } from "next/navigation";
import { SignUpScheema } from "@/schemaas/signupScheema";
import { toast } from "react-toastify";

const Signup = () => {
    const { register, handleSubmit, watch, formState: { errors }, } = useForm()
    const [username, setUsername] = useState('');

    const [usernameMessage, setUsernameMessage] = useState('');
    const [isCheckingUsername, setIsCheckingUsername] = useState(false);
    //loader implement for check username is unique or not
    const [isSubmitting, setIsSubmitting] = useState(false);

    //jaise hi user type karega hm check karenge ki unique hai ya nhi
    //har ek type keybord use pr req jayegi to prblem hogi
    //to debuncing technique use karte hai


    const [debouncedUsername, setDebouncedUsername] = useState('');
    const handleDebouncedUsername = useDebouncedCallback((value) => {
        console.log("denbounce value of username", value)
        setDebouncedUsername(value);
    }, 300);
    //paramenter taken ===>initial value,deleay in milllisecond
    //Delay function calls until a set time elapses after the last invocation
    //useDebounce===>value turant set nhi hogi us time ke bad set hogi jo diya rahega
    //immediately change pr nhi debounce ways me req sent hogi server me hamesha nhi
    const router = useRouter()

    //when user type username then req sent to server for check user is unique or not
    //when debounced username value changed then req sent
    // Effect to trigger username uniqueness check when debouncedUsername changes
    useEffect(() => {
        const checkUniqueUsername = async () => {
            if (debouncedUsername.trim() !== '') {
                setIsCheckingUsername(true);
                try {
                    const encodedUsername = encodeURIComponent(debouncedUsername);
                    const response = await axios.get(`/api/check-username-unique?username=${encodedUsername}`);
                    console.log("Response from unique check:", response);
                    setUsernameMessage(response.data.message);
                    const { message, success } = response.data;
                    setUsernameMessage(message);
                } catch (error) {
                    console.error("Error checking uniqueness:", error);
                    setUsernameMessage("Error checking username uniqueness");
                } finally {
                    setIsCheckingUsername(false);
                }
            }
        };
        checkUniqueUsername();
    }, [debouncedUsername]);


    const onSubmit = async (data) => { //data comes from form se hi aata hai
        console.log("form submit data", data)
        setIsSubmitting(true)
        try {
            // Validate form data against Zod schema
            const validatedData = SignUpScheema._parse(data);
            const response = await axios.post('/api/signup', validatedData)
            console.log("respone in signup", response)
            toast.success(response?.data?.message)
            router.push(`/verify/${username}`)
        }
        catch (error) {
            console.log("error in submit form", error)
            const axiosError = errors
            //toast.error
            let errorMsg = axiosError.response?.data.message
            setIsSubmitting(false);
        }

    }
    return (
        <>
            <div className="container-md">
                <form className="row g-3" onSubmit={handleSubmit(onSubmit)}>
                    <div className="col-md-7">
                        <label htmlFor="inputEmail" className="form-label" name="username">UserName</label>
                        <input type="text" className="form-control" id="inputEmail"
                            {...register("username", { required: true, maxLength: 10, minLength: 2 })}
                            onChange={(e) => handleDebouncedUsername(e.target.value)}
                        />
                        {isCheckingUsername && <p>Checking username...</p>}
                        <p className="text-sm"
                            style={{
                                color: usernameMessage !== 'Username is unique' ? 'red' : 'green',
                            }}
                        >
                            {usernameMessage}
                        </p>
                    </div>
                    <div className="col-md-7">
                        <label htmlFor="inputEmail4" className="form-label" name="email">Email</label>
                        <input type="email" className="form-control" id="inputEmail4"
                            {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
                        />
                    </div>
                    <div className="col-md-7">
                        <label htmlFor="inputPassword4" className="form-label" name="password"
                            {...register("password", { required: true })}
                        >Password</label>
                        <input type="password" className="form-control" id="inputPassword4" />
                    </div>
                    <div className="col-12">
                        <button type="submit" className="btn btn-primary">

                            {isSubmitting ? 'Loading' : 'Sign up'}
                        </button>
                    </div>
                </form>
            </div>

        </>
    )
}


export default Signup

