"use client"
import { useSession, signIn, signOut } from "next-auth/react"

//folder name  ==(auth)  grouping karte hain collection==>routes me kam nhi karta hai

//() parenthisis lagene se wo route me count nhi grouping me use 


export default function Component() {
    const { data: session } = useSession()
    if (session) {
        return (
            <>
                Signed in as {session.user.email} <br />
                <button className="btn btn-danger" onClick={() => signOut()}>Sign out</button>

            </>
        )
    }
    return (
        <>
            Not signed in <br />
            <button class="btn btn-primary" onClick={() => signIn()}>Sign in</button>

        </>
    )
}
