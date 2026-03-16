import Footer from "../components/Footer";
import Hero from "@/components/hero-section/Hero";
import HomeBody from "@/components/company-section/HomeBody";

export default function Home() {
  return (
    <main className="w-full grow">
      {/* Hero Section */}
      <Hero title="we manage values" bgImage="/studio-immobiliare.png" />

      {/* <div className="bg-white rounded-xl w-full md:w-[95%] md:mx-auto mb-20 pt-52 relative z-10 min-h-80">
        <CompanySection></CompanySection>
      </div> */}
      
      <HomeBody />
      <Footer />
    </main>
  );
}
