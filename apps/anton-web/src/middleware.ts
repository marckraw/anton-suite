import { NextRequest, NextResponse } from 'next/server'

const corsOptions: {
    allowedMethods: string[];
    allowedOrigins: string[];
    allowedHeaders: string[];
    exposedHeaders: string[];
    maxAge?: number;
    credentials: boolean;
  } = {
    allowedMethods: (process.env?.ALLOWED_METHODS || "").split(","),
    allowedOrigins: (process.env?.ALLOWED_ORIGIN || "").split(","),
    allowedHeaders: (process.env?.ALLOWED_HEADERS || "").split(","),
    exposedHeaders: (process.env?.EXPOSED_HEADERS || "").split(","),
    maxAge: process.env?.MAX_AGE && parseInt(process.env?.MAX_AGE) || undefined, // 60 * 60 * 24 * 30, // 30 days
    credentials: process.env?.CREDENTIALS == "true",
  };

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
    // Response
    const response = NextResponse.next();

    // Allowed origins check
    const origin = request.headers.get('origin') ?? '';
    if (corsOptions.allowedOrigins.includes('*') || corsOptions.allowedOrigins.includes(origin)) {
        response.headers.set('Access-Control-Allow-Origin', origin);
    }

    // Set default CORS headers
    response.headers.set("Access-Control-Allow-Credentials", corsOptions.credentials.toString());
    response.headers.set("Access-Control-Allow-Methods", corsOptions.allowedMethods.join(","));
    response.headers.set("Access-Control-Allow-Headers", corsOptions.allowedHeaders.join(","));
    response.headers.set("Access-Control-Expose-Headers", corsOptions.exposedHeaders.join(","));
    response.headers.set("Access-Control-Max-Age", corsOptions.maxAge?.toString() ?? "");

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