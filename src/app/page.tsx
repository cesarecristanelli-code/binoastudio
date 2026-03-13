import {
  BuildingOfficeIcon,
  EyeIcon,
  RocketLaunchIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Card from "../components/Card";
import { CardType } from "../types/card.types";
import CompanySection from "../components/CompanySection";
import Footer from "../components/Footer";

export default function Home() {
  const cards: CardType[] = [
    {
      id: 1,
      title: "Chi siamo",
      icon: <BuildingOfficeIcon />,
      styles: {
        iconColor: "text-red-800",
        iconCenter: true,
        titleCenter: true,
        hasBorder: true,
        hasShadow: false,
      },
    },
    {
      id: 2,
      title: "Vision",
      icon: <EyeIcon />,
      styles: {
        iconColor: "text-blue-800",
        iconCenter: true,
        titleCenter: true,
        hasBorder: true,
        hasShadow: false,
      },
    },
    {
      id: 3,
      title: "Mission",
      icon: <RocketLaunchIcon />,
      styles: {
        iconColor: "text-green-800",
        iconCenter: true,
        titleCenter: true,
        hasBorder: true,
        hasShadow: false,
      },
    },
  ];

  return (
    <main className="w-full grow">
      {/* Hero Section */}
      <section className="relative w-full h-[80vh] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/SfondoHero.png"
            alt="Sfondo Trinòa"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Titolo Centrato */}
        <div className="relative z-10 text-white px-6 w-full">
          <h1 className="text-4xl md:text-6xl tracking-widest text-center uppercase font-archivo">
            We Manage Values
          </h1>
        </div>
      </section>

      <section className="relative z-20 -mt-20 p-6 max-w-7xl mx-auto bg-white overflow-x-auto no-scrollbar md:rounded-3xl shadow-md">
        <div className="flex gap-20 min-w-175 md:min-w-full ">
          {cards.map((card) => (
            <a href={`#${card.id}`} key={card.id} className="grow">
              <Card
                key={card.id}
                icon={card.icon}
                title={card.title}
                styles={card.styles}
              />
            </a>
          ))}
        </div>
      </section>

      <div className="bg-white rounded-xl w-full md:w-[95%] md:mx-auto mb-20 -mt-32 pt-52 relative z-10 min-h-80">
        <CompanySection></CompanySection>
      </div>
      <Footer />
    </main>
  );
}
