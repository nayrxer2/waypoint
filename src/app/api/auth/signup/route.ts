import { NextResponse } from "next/server";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch (error) {
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { message: "Request body must be valid JSON." },
        { status: 400 },
      );
    }
    throw error;
  }

  if (
    !isRecord(body) ||
    typeof body.email !== "string" ||
    !isValidEmail(body.email) ||
    typeof body.password !== "string" ||
    body.password.length < 8
  ) {
    return NextResponse.json(
      {
        message:
          "Enter a valid email address and a password of at least 8 characters.",
      },
      { status: 400 },
    );
  }

  return NextResponse.json(
    {
      message:
        "Authentication is not configured yet. Your details were not saved.",
      success: false,
    },
    { status: 501 },
  );
}