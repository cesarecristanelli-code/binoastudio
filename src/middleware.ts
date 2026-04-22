import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("session_token")?.value;

  if (!token) return;

  const { pathname } = request.nextUrl;

  const isLoginPage = pathname === "/admin-login";
  const isProtectedPage =
    pathname.startsWith("/admin-login/") && pathname !== "/admin-login";

  if (isLoginPage && token) {
    return NextResponse.redirect(
      new URL("/admin-login/form-inserimento-immobili", request.url),
    );
  }

  if (isProtectedPage && !token) {
    return NextResponse.redirect(new URL("/admin-login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin-login/:path*"],
};
