import { NextResponse } from "next/server";
import {
  verifyDashboardPassword,
  createDashboardAuthToken,
  COOKIE_NAME,
  COOKIE_MAX_AGE,
} from "@/lib/dashboard-auth";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  let password = "";
  const contentType = request.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    try {
      const json = await request.json();
      password = typeof json.password === "string" ? json.password : "";
    } catch {
      password = "";
    }
  } else {
    try {
      const formData = await request.formData();
      const val = formData.get("password");
      password = typeof val === "string" ? val : "";
    } catch {
      password = "";
    }
  }

  const isValid = verifyDashboardPassword(password);
  const baseUrl = new URL(request.url).origin;

  if (!isValid) {
    return NextResponse.redirect(`${baseUrl}/analytics-login?error=1`, {
      status: 303,
    });
  }

  const token = createDashboardAuthToken();
  const response = NextResponse.redirect(`${baseUrl}/analytics-dashboard`, {
    status: 303,
  });

  response.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: COOKIE_MAX_AGE,
  });

  return response;
}
