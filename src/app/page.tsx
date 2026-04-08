import Hero from "@/components/hero-section/Hero";
import ChiSiamo from "@/components/company-section/ChiSiamo";
import FullBleedImage from "@/components/company-section/FullBleed";
import CosaFacciamo from "@/components/company-section/CosaFacciamo";

export default function Home() {
  return (
    <main className="w-full grow">
      {/* Hero Section */}
      <Hero title="we manage values" bgImage="/sfondohero-binoa.png" />

      <ChiSiamo />

      <FullBleedImage />

      <div className="bg-[#D1CBC0] w-screen pb-36">
        <CosaFacciamo />
      </div>
    </main>
  );
}
