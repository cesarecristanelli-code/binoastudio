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
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam
          sunt error, libero inventore neque corporis nulla non quam praesentium
          beatae dolor laborum accusamus in porro officiis corrupti qui
          veritatis officia pariatur delectus tenetur. Nesciunt aut dolore
          doloribus numquam sapiente veritatis libero alias modi aliquam culpa,
          quidem, nisi assumenda fugit velit? Beatae numquam, quas ipsa qui quia
          pariatur eum corporis omnis, alias veritatis ipsum dolorum natus
          consectetur impedit voluptatum ab adipisci.
        </Section>
      </div>
      <Footer />
    </main>
  );
}
