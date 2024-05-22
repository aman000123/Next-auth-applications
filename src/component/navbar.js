"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import React from "react";
import Logo from '../assets/OIP (14).svg'
import Image from "next/image";

const Navbar = () => {
    const { data } = useSession(); // useSession() returns an object containing two values: data and status
    const router = useRouter();

    const handleLogOut = async (e) => {
        e.preventDefault();
        await signOut({ redirect: false });
        router.push("/signin");
    };
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarTogglerDemo03"
                    aria-controls="navbarTogglerDemo03"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon" />
                </button>
                <Link href="/" className="navbar-brand">
                    <Image
                        src={Logo}
                        alt="Logo"
                        width={50}
                        height={50}
                    />
                </Link>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" href="#">
                                Dashboard
                            </Link>
                        </li>
                        {data ? (
                            <>
                                <li className="nav-item">
                                    <span className="nav-link">{data.user.username}</span>
                                </li>
                                <li className="nav-item">
                                    <button
                                        className="nav-link btn"
                                        type="button"
                                        onClick={handleLogOut}
                                    >
                                        Logout
                                    </button>
                                </li>
                            </>
                        ) : (
                            <li className="nav-item">
                                <Link className="nav-link" href="/signin">
                                    Signin
                                </Link>
                            </li>
                        )}
                    </ul>
                    <form className="d-flex">
                        <input
                            className="form-control me-2"
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                        />
                        <button className="btn btn-outline-success" type="submit">
                            Search
                        </button>
                    </form>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;