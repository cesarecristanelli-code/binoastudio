import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("session_token")?.value;

  if (!token) return;

  const { pathname } = request.nextUrl;

  const isLoginPage = pathname === "/admin-login";
  const isAdminArea = pathname.startsWith("/admin-login/");

  if (isLoginPage && token) {
    return NextResponse.redirect(
      new URL("/admin-login/form-inserimento-immobili", request.url),
    );
  }

  if (isAdminArea && !token) {
    return NextResponse.redirect(new URL("/admin-login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin-login/:path*"],
};
