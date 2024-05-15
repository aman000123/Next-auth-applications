
"use client"

import { useSession, signOut } from "next-auth/react"
import { User } from 'next-auth'
import { useRouter } from "next/navigation"
import Link from "next/link"
const Navbar = () => {

    const { data } = useSession()//useSession() returns an object containing two values: data and status:
    console.log("data", data)
    console.log("user related", data?.user)

    const router = useRouter()


    const handleLogOut = (e) => {
        e.preventDefault()
        signOut()
        router.push('/signin')
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Navbar</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="#">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Link</a>
                            </li>


                            {data ? (
                                <>
                                    <li className="nav-item">
                                        {data?.user?.username}

                                    </li>
                                    <button className="nav-link" onClick={handleLogOut}>Logout</button>
                                </>
                            ) :
                                <Link className="nav-item" href="/signin">
                                    <button>Signin</button>
                                </Link>
                            }
                        </ul>

                    </div>
                </div>
            </nav>

        </>
    )
}

export default Navbar