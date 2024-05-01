//providers option me hota hai bcz next auth ka pura mamla wo options pr depended hai
//github,google,lindein etc

import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import UserModel from '@/models/user';
import Connect from '@/connetc/dbconnetc';

export const authOptions = {
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "credentials",
            credentials: {
                email: { label: 'Email', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },
            //signin page bnana hai kitne credentials chahiye sidhe aa jaye 
            //behid the seen html form bnata

            //authorize ke liye custom methods
            async authorize(credentials) {
                //credential accespt in parameter
                //return promise karta hai
                await Connect()


                try {
                    const user = await UserModel.findOne({
                        //either user name or email check
                        $or: [
                            {
                                email: credentials.identifier
                            }, {
                                username: credentials.identifier
                            }
                        ]
                    })
                    if (!user) {
                        throw new Error('No user found with this email');
                    }
                    if (!user.isVerified) {
                        throw new Error('Please verify your account before logging in');
                    }

                    const isPasswordCorrect = await bcrypt.compare(
                        credentials.password,
                        user.password
                    );
                    if (isPasswordCorrect) {
                        return user;
                    } else {
                        throw new Error('Incorrect password');
                    }


                } catch (error) {
                    console.log("errro in next auth options", error)
                    throw new Error(err);

                }

            }
        })
    ],
    callbacks: {
        async jwt({ token, user, }) { //if jwt then return token
            // if (isPasswordCorrect) {
            //return user;===>this user is here which i have return above

            //inside token we want maximum data so i can find values from there when need

            if (user) {
                token._id = user._id?.toString(); // Convert ObjectId to string
                token.isVerified = user.isVerified;
                token.isAcceptingMessages = user.isAcceptingMessages;
                token.username = user.username;
            }
            return token
        },
        //actuall next auth session base strategy pr hi chalta hai
        async session({ session, token }) {//if session then return session in callbacks
            if (token) {
                session.user._id = token._id;
                session.user.isVerified = token.isVerified;
                session.user.isAcceptingMessages = token.isAcceptingMessages;
                session.user.username = token.username;
            }

            return session
            //now we can finds  user from token 
            //so we no need to call database
        },

    },
    pages: {
        signIn: '/signin'///page riutes to handel next auth using
    },
    session: {
        strategy: 'jwt'//which have token that user only login
    },
    secret: "secretKey"
}