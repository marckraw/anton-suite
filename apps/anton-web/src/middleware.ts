import { NextRequest, NextResponse } from 'next/server'

// Check if the request is authorized
const isAuthorized = ({headers}: {headers: NextRequest['headers']}) => {
    const antonWebApiKey = process.env.ANTON_WEB_API_KEY

    if(headers.get('authorization') === `Bearer ${antonWebApiKey}`) {
        return true
    }else {
        return false
    }
}

export async function middleware(request: NextRequest) {
    // api authorization
    if(request.nextUrl.pathname.startsWith('/api/protected')) {
        if(isAuthorized({headers: request.headers})) {
            console.log("So its authorized")
            return NextResponse.next()
        } else {
            return Response.json({error: "Unauthorized"}, {status: 401})
        }
    } else {
        const session = request.cookies.get("session");
        if (!session && !request.nextUrl.pathname.startsWith("/login") && !request.nextUrl.pathname.startsWith("/api")) {
            return NextResponse.redirect(new URL("/login", request.url));
        }

        // any other authorization
        if (session && !request.nextUrl.pathname.startsWith("/login")) {
            const res = await fetch(`${request.nextUrl.origin}/api/verify-session`, {
                headers: { Cookie: `session=${session.value}` },
            });
            if (!res.ok) {
                return NextResponse.redirect(new URL("/login", request.url));
            }
        }
    }
}


export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};