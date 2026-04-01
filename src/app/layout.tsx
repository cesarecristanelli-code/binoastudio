import type { Metadata } from "next";
import { Albert_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "@/components/Footer";

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

// Questi dati finiscono direttamente nell'head dell'html
export const metadata: Metadata = {
  title: "Binoa Studio",
  description: "We manage values",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <body
        className={`${albert.variable} antialiased flex flex-col min-h-screen`}
      >
        <Navbar />
        <main className="grow">{children}</main>

        <Footer />
      </body>
    </html>
  );
}
