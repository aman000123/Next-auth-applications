
"use client"
import { SignInScheema } from "@/schemaas/signinScheema";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

const VerifyAccount = ({ }) => {
    const router = useRouter()
    const params = useParams((username) => { })
    const { register, handleSubmit, watch, formState: { errors }, } = useForm()
    const onSubmit = async (formData) => {

        try {
            // const validatedData = SignInScheema.parse(formData);
            const response = await axios.post(`/api/verify-code`, {
                username: params.username,
                code: formData.code
            });
            console.log("response in verify code", response)
            toast.success(response?.data?.message);
            router.push('/signin');
        } catch (error) {
            console.error("Error submitting form verify:", error?.response?.data?.message);
            toast.error(error?.response?.data?.message);
            // toast.error("Invalid verify code")
        }
    };
    return (
        <>
            <div className="container-md">
                <form className="row g-3 mt-5" onSubmit={handleSubmit(onSubmit)} style={{ width: "25rem", margin: "auto", border: "2px solid " }}>
                    <h3>Verify your account</h3>
                    <div className="">
                        <label htmlFor="inputEmail4" className="form-label">Verification Code</label>
                        <input
                            type="number"
                            className="form-control"
                            id="inputEmail4"
                            {...register("code", { required: true })}
                        />
                    </div>

                    <div className="col-12">
                        <button type="submit" className="btn btn-primary">
                            Verify
                        </button>
                    </div>
                </form>
            </div>



        </>
    )
}

export default VerifyAccount