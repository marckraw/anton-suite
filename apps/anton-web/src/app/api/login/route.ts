import { NextResponse } from "next/server";
import { sign } from "jsonwebtoken";
import { serialize } from "cookie";

export async function POST(request: Request) {
    const { password } = await request.json();
    console.log("password", password);
    console.log("process.env.AUTH_PASSWORD", process.env.AUTH_PASSWORD);
    if (password === process.env.AUTH_PASSWORD) {
        const token = sign({}, process.env.SESSION_SECRET!, { expiresIn: "1h" });
        const serialized = serialize("session", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 3600,
            path: "/",
        });
        return new NextResponse(JSON.stringify({ success: true }), {
            status: 200,
            headers: { "Set-Cookie": serialized },
        });
    } else {
        return NextResponse.json({ success: false }, { status: 401 });
    }
}
