import { resend } from "@/connetc/resend";
import VerificationEmail from "../../emailsTemplates/verificationsEmail";


//emails always takes time
export async function sendVerificationEmail(email, username, verifyCode) {
    console.log("email", email, username, verifyCode)
    try {
        console.log("email response")
        const emailResponse = await resend.emails.send({
            from: 'aman@123example.com',
            to: email,
            subject: 'Authentication Message Verification Code',
            react: VerificationEmail({ username, otp: verifyCode }),
        });

        console.log("Email sent successfully:", emailResponse);
        return { success: true, message: 'Verification email sent successfully.' };
    } catch (emailError) {
        console.error('Error sending verification email:', emailError);
        return { success: false, message: 'Failed to send verification email.' };
    }
}
