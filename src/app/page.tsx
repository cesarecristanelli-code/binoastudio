import Footer from "../components/Footer";
import Hero from "@/components/hero-section/Hero";
import ChiSiamo from "@/components/company-section/ChiSiamo";

export default function Home() {
  return (
    <main className="w-full grow">
      {/* Hero Section */}
      <Hero title="we manage values" bgImage="/studio-immobiliare.png" />

      <ChiSiamo />

      <Footer />
    </main>
  );
}
