"use client"

import { useSession } from "next-auth/react";

const Dashboard = () => {
    const { data } = useSession();
    console.log("data", data)
    return (
        <>

            Dashboard

        </>
    )
}

export default Dashboard