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

export function middleware(request: NextRequest) {
    if(isAuthorized({headers: request.headers})) {
        return NextResponse.next()
    } else {
        return Response.json({error: "Unauthorized"}, {status: 401})
    }
}

export const config = {
    matcher: '/api/:path*'
}