import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";

// 1. Configurazione base di next-intl
const intlProxy = createMiddleware({
  locales: ["it", "en"],
  defaultLocale: "it",
  localePrefix: "always",
});

export function proxy(request: NextRequest) {
  const token = request.cookies.get("session_token")?.value;
  const { pathname } = request.nextUrl;

  const segments = pathname.split("/");
  const hasLocalePrefix = segments[1] === "it" || segments[1] === "en";
  const locale = hasLocalePrefix ? segments[1] : "it";

  const pathWithoutLocale = hasLocalePrefix ? pathname.replace(`/${locale}`, "") || "/" : pathname;

  const isLoginPage = pathWithoutLocale === "/admin-login";
  const isProtectedPage =
    pathWithoutLocale.startsWith("/admin-login/") && pathWithoutLocale !== "/admin-login";

  if (isLoginPage && token) {
    return NextResponse.redirect(
      new URL(`/${locale}/admin-login/form-inserimento-immobili`, request.url),
    );
  }

  if (isProtectedPage && !token) {
    return NextResponse.redirect(new URL(`/${locale}/admin-login`, request.url));
  }

  return intlProxy(request);
}

export const config = {
  // Ignora le chiamate API, i file statici (.jpg, .css) e i file di sistema di Next.js
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
