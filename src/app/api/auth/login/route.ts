import { NextResponse } from "next/server";

export async function POST(request: Request) {

  const body = await request.json();

  if(typeof body.email !== "string" 
    || body.email.trim() === "" 
    || typeof body.password !==  "string" 
    || body.password.trim() === 0) {
    return NextResponse.json({ message: "Invalid request body" }, { status: 400 });
  }

  console.log("Login request:", body)

  return NextResponse.json({ message: "Login endpoints works" });
}