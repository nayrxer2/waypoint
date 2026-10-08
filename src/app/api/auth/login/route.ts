import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
      const body = await request.json();

      if (
        typeof body !== "object" ||
        body === null ||
        typeof body.email !== "string" ||
        typeof body.password !== "string"
      ) 
      return NextResponse.json(
        { message: "Valid body" }, 
        { status: 200 }
      );
    } catch {
      return NextResponse.json(
        { message: "invalid email" }, 
        { status: 400 }
      );
    }
}
