import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await await request.json();

  console.log("Login request:", body)

  return NextResponse.json({ message: "Login endpoints works" });
}