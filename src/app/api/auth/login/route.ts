import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  if (
    typeof body !== "object" ||
    body === null ||
    Array.isArray(body.password) ||
    typeof body.email !== "string" ||
    typeof body.password !== "string"
  ) {
    return NextResponse.json(
      { message: "Invalid request body" },
      { status: 400 },
    );
  }

  return NextResponse.json({ message: "Valid body" }, { status: 200 });
}
