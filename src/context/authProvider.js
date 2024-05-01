"use client"
//auth provider client component hota hai

import { SessionProvider } from 'next-auth/react';


export default function AuthProvider({
    children,
}) {
    return (
        <SessionProvider>

            {children}

        </SessionProvider>
    );
}
