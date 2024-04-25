
import mongoose, { Schema } from "mongoose";

const MessageScheema = new Schema({
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        require: true,
        default: Date.now
    }
})


const UserScheema = new Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        trim: true,//sapce ko trim karke store
        unique: true
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please use a valid email address"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    verifyCode: {
        type: String,
        required: [true, "VerifyCode is required"],
    },
    verifyCodeExpiry: {
        type: Date,
        required: [true, "VerifyCode Expiry is required"],

    },
    isVerified: {
        type: Boolean,
        default: false

    },
    isAcceptingMessage: {
        type: Boolean,
        default: true

    },
    messages: [String]
})


const UserModel = (mongoose.models.User) || mongoose.model("User", UserScheema)
export default UserModel