import type { Metadata } from "next";
import { Albert_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "@/components/Footer";
import { ourFileRouter } from "./api/uploadthing/core";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";

/* const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
}); */

/* const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["200", "400", "600", "700"],
}) */

const albert = Albert_Sans({
  variable: "--font-albertsans",
  subsets: ["latin"],
  weight: ["200", "400", "600", "700"],
});

/* const marcellus = Marcellus({
  variable: "--font-marcellus",
  subsets: ["latin"],
  weight: ["400"],
}); */

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" suppressHydrationWarning>
      <body
        className={`${albert.variable} antialiased flex flex-col min-h-screen`}
      >
        <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
        <Navbar />
        <main className="grow">{children}</main>

        <Footer />
      </body>
    </html>
  );
}
