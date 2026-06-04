import type { Metadata } from "next";
import { Albert_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "../../components/Navbar";
import Footer from "@/components/Footer";
import { ourFileRouter } from "../api/uploadthing/core";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";

const albert = Albert_Sans({
  variable: "--font-albertsans",
  subsets: ["latin"],
  weight: ["200", "400", "600", "700"],
});

if (typeof window !== "undefined") {
  (async () => {
    if (!globalThis.Intl || !("DisplayNames" in globalThis.Intl)) {
      // @ts-expect-error formatjs does not expose native types for polyfill files
      await import("@formatjs/intl-displaynames/polyfill");
      // @ts-expect-error formatjs does not expose native types for polyfill files
      await import("@formatjs/intl-displaynames/locale-data/it");
      // @ts-expect-error formatjs does not expose native types for polyfill files
      await import("@formatjs/intl-displaynames/locale-data/en");
    }

    if (!globalThis.Intl || !("Locale" in globalThis.Intl)) {
      // @ts-expect-error formatjs does not expose native types for polyfill files
      await import("@formatjs/intl-locale/polyfill");
    }
  })();
}

// Questi dati finiscono direttamente nell'head dell'html
export const metadata: Metadata = {
  title: {
    default: "Binòa Studio",
    template: "%s | Binòa Studio",
  },
  applicationName: "Binòa Studio", // Nome dell'applicazione/sito
  openGraph: {
    siteName: "Binòa Studio", // Nome che compare quando condividi il link su WhatsApp/Social
  },
  description: "We manage values",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  const messages = await getMessages();

  // Esegui questo controllo solo lato client prima di caricare il resto

  return (
    <html lang={locale} suppressHydrationWarning data-scroll-behavior="smooth">
      <body
        className={`${albert.variable} antialiased flex flex-col min-h-screen`}
      >
        <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          <main className="grow">{children}</main>

          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
