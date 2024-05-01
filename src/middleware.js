
import { NextRequest, NextResponse } from "next/server";
import { getToken } from 'next-auth/jwt';
export { default } from 'next-auth/middleware';

//jahna jahna middleware run kare to sabko mention karte
export const config = {
    matcher: ['/dashboard/:path*', '/signin', '/signup', '/', '/verify/:path*'],//===>route pr chale to =>'/'
};

//'/dashboard/:path*' dashboard ke sare path pr dashbord/   koi bhi urls ho to

export async function middleware(NextRequest) {
    const token = await getToken({ req: NextRequest });//get token s from next auth
    const url = NextRequest.nextUrl;//get urls

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
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    if (!token && url.pathname.startsWith('/dashboard')) {
        return NextResponse.redirect(new URL('/signin', request.url));
    }

    return NextResponse.next();
}