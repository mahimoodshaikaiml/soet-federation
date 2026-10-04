import { NextResponse } from "next/server";
import { COOKIE_NAME } from "@/lib/dashboard-auth";

export const dynamic = "force-dynamic";

function handleLogout(request: Request) {
  const baseUrl = new URL(request.url).origin;
  const response = NextResponse.redirect(`${baseUrl}/analytics-login`, {
    status: 303,
  });

  response.cookies.set(COOKIE_NAME, "", {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });

  return response;
}

export async function POST(request: Request) {
  return handleLogout(request);
}

export async function GET(request: Request) {
  return handleLogout(request);
}
