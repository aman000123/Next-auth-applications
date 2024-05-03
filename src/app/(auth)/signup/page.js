"use client"

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form"
import Link from 'next/link';
import z from 'zod'
import axios from "axios";


const Signup = () => {
    const { register, handleSubmit, watch, formState } = useForm()

    const [username, setUsername] = useState('');//jaise hi user type karega hm check karenge ki unique hai ya nhi
    //har ek type keybord use pr req jayegi to prblem hogi
    //to debuncing technique use karte hai

    const [usernameMessage, setUsernameMessage] = useState('');
    const [isCheckingUsername, setIsCheckingUsername] = useState(false);//loader implement for check username is unique or not
    const [isSubmitting, setIsSubmitting] = useState(false);
    const debouncedUsername = useDebounce(username, 300);//Delay function calls until a set time elapses after the last invocation


    return (
        <>
            <div class="container-md">
                <form className="row g-3" onSubmit={handleSubmit(onSubmit)}>
                    <div className="col-md-7">
                        <label htmlFor="inputEmail" className="form-label" name="username">UserName</label>
                        <input type="text" className="form-control" id="inputEmail" />
                    </div>
                    <div className="col-md-7">
                        <label htmlFor="inputEmail4" className="form-label" name="email">Email</label>
                        <input type="email" className="form-control" id="inputEmail4" />
                    </div>
                    <div className="col-md-7">
                        <label htmlFor="inputPassword4" className="form-label" name="password">Password</label>
                        <input type="password" className="form-control" id="inputPassword4" />
                    </div>
                    <div className="col-12">
                        <button type="submit" className="btn btn-primary">Sign in</button>
                    </div>
                </form>
            </div>

        </>
    )
}


export default Signup

