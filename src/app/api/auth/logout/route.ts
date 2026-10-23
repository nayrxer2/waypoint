import { NextResponse } from "next/server";
import { mockSessionCookieName } from "../../../../lib/mock-auth";

export async function POST() {
  const response = NextResponse.json({ success: true });
  response.cookies.set(mockSessionCookieName, "", {
    maxAge: 0,
    path: "/",
    sameSite: "lax",
  });

  return response;
}
