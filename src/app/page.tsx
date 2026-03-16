import Footer from "../components/Footer";
import Hero from "@/components/hero-section/Hero";
import Section from "@/components/company-section/BodySection";

export default function Home() {
  return (
    <main className="w-full grow">
      {/* Hero Section */}
      <Hero title="we manage values" bgImage="/studio-immobiliare.png" />

      {/* <div className="bg-white rounded-xl w-full md:w-[95%] md:mx-auto mb-20 pt-52 relative z-10 min-h-80">
        <CompanySection></CompanySection>
      </div> */}
      
      <div className="m-10">
        <Section title="Trinòa" imageURL="/Tre-architetti.png" reverse={false}>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facilis
          facere harum animi tenetur enim doloremque in minus ullam quidem
          soluta odit molestiae quibusdam modi dolore dolorem, voluptate
          voluptatem. Doloribus recusandae neque qui nulla officiis ducimus,
          vitae officia culpa provident harum?
        </Section>
      </div>
      <div className="m-10">
        <Section title="Trinòa" imageURL="/Tre-architetti.png" reverse={true}>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facilis
          facere harum animi tenetur enim doloremque in minus ullam quidem
          soluta odit molestiae quibusdam modi dolore dolorem, voluptate
          voluptatem. Doloribus recusandae neque qui nulla officiis ducimus,
          vitae officia culpa provident harum?
        </Section>
      </div>
      <Footer />
    </main>
  );
}
