import Footer from "../components/Footer";
import Hero from "@/components/hero-section/Hero";
import HomeBody from "@/components/company-section/HomeBody";

export default function Home() {
  return (
    <main className="w-full grow">
      {/* Hero Section */}
      <Hero title="we manage values" bgImage="/studio-immobiliare.png" />

      <HomeBody />

      <Footer />
    </main>
  );
}
