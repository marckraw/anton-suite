import { NextResponse } from "next/server";
import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = cookies();
  const token = cookieStore.get("session");

  if (!token) {
    return NextResponse.json({ isLoggedIn: false }, { status: 401 });
  }

  try {
    verify(token.value, process.env.SESSION_SECRET!);
    return NextResponse.json({ isLoggedIn: true });
  } catch {
    return NextResponse.json({ isLoggedIn: false }, { status: 401 });
  }
}
