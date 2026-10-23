import { NextResponse } from "next/server";
import {
  demoCredentials,
  isMockAuthEnabled,
  mockSessionCookieName,
} from "../../../../lib/mock-auth";
import { mockUser } from "../../../../lib/mock-user";

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
    body.password.length === 0
  ) {
    return NextResponse.json(
      { message: "Enter a valid email address and password." },
      { status: 400 },
    );
  }

  if (!isMockAuthEnabled()) {
    return NextResponse.json(
      { message: "Demo login is available in development only." },
      { status: 501 },
    );
  }

  if (
    body.email.trim().toLowerCase() !== demoCredentials.email ||
    body.password !== demoCredentials.password
  ) {
    return NextResponse.json(
      { message: "Email or password is incorrect." },
      { status: 401 },
    );
  }

  const response = NextResponse.json({
    success: true,
    message: `Welcome back, ${mockUser.firstName}.`,
    user: {
      id: mockUser.id,
      name: mockUser.name,
      email: mockUser.email,
    },
  });

  response.cookies.set(mockSessionCookieName, mockUser.id, {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  return response;
}
