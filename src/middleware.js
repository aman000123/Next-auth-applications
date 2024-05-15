
import { NextRequest, NextResponse } from "next/server";
import { getToken } from 'next-auth/jwt';
export { default } from 'next-auth/middleware';

//jahna jahna middleware run kare to sabko mention karte
export const config = {
    matcher: ['/dashboard/:path*', '/signin', '/signup', '/', '/verify/:path*'],//===>route pr chale to =>'/'
};

//'/dashboard/:path*' dashboard ke sare path pr dashbord/   koi bhi urls ho to

export async function middleware(req) {
    const token = await getToken({ req });//get token s from next auth
    console.log("token ", token)
    const url = req.nextUrl;//get urls
    console.log("url is", url)

    // Redirect to dashboard if the user is already authenticated
    // and trying to access sign-in, sign-up, or home page
    //if sign in hai token hai to sidhe dashboard pr jaye signin signup pr kyun jaye
    if (
        token &&
        (url.pathname.startsWith('/signin') ||
            url.pathname.startsWith('/signup') ||
            url.pathname.startsWith('/verify') ||
            url.pathname === '/')
    ) {
        console.log("token finds middleware");
        return NextResponse.redirect(new URL('/dashboard', req.url).toString());
    }
    else {
        console.log("No token found in middleware");
    }

    if (!token && url.pathname.startsWith('/dashboard')) {
        return NextResponse.redirect(new URL('/signin', req.url).toString());
    }

    return NextResponse.next();
}