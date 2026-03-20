import Link from "next/link";
import Section from "./BodySection";
import { ReactNode, Fragment } from "react";
import Title from "./BodyTitle";
import { ArrowRightIcon } from "@heroicons/react/20/solid";

interface BodySectionType {
  id: number;
  title: string;
  imagePath: string;
  children: string | ReactNode;
  revrese: boolean;

  divClasses: string;
}

export default function CosaFacciamo() {
  const sections: BodySectionType[] = [
    {
      id: 1,
      title: "Vendite",
      imagePath: "/Tre-architetti.png",
      children: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facilis
          facere harum animi tenetur enim doloremque in minus ullam quidem
          soluta odit molestiae quibusdam modi dolore dolorem, voluptate
          voluptatem. Doloribus recusandae neque qui nulla officiis ducimus,
          vitae officia culpa provident harum?`,
      revrese: false,
      divClasses: "mt-28 mb-16",
    },
    {
      id: 2,
      title: "Gestione Progetti",
      imagePath: "/Tre-architetti.png",
      children: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facilis
          facere harum animi tenetur enim doloremque in minus ullam quidem
          soluta odit molestiae quibusdam modi dolore dolorem, voluptate
          voluptatem. Doloribus recusandae neque qui nulla officiis ducimus,
          vitae officia culpa provident harum?`,
      revrese: true,
      divClasses: "my-28",
    },
    {
      id: 3,
      title: "Progettazione",
      imagePath: "/Guarda-orizzonte.png",
      children: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facilis
          facere harum animi tenetur enim doloremque in minus ullam quidem
          soluta odit molestiae quibusdam modi dolore dolorem, voluptate
          voluptatem. Doloribus recusandae neque qui nulla officiis ducimus,
          vitae officia culpa provident harum?`,
      revrese: false,
      divClasses: "my-28",
    },
  ];

  return (
    
      <div
        className="max-w-7xl mx-auto space-y-40 py-28 rounded-b-2xl shadow-2xl"
        style={{ backgroundColor: "#3C3833" }}
      >
        <Title number="02" title="Cosa facciamo" titleColor="#E5E0D8" />

        {sections.map((s) => (
          <Fragment key={s.id}>
            <Section
              title={s.title}
              imagePath={s.imagePath}
              reverse={s.revrese}
              style={{
                bodyColor: "#2D2A26",
                titleColor: "#E5E0D8",
                textColor: "#C4BDB1",
              }}
            >
              {s.children}

              {s.id === 1 && (
                <div className="flex items-center justify-center p-2 mt-5">
                  <Link
                    href="/vendita"
                    className="group ml-4 text-xs inline-flex items-center gap-2 font-semibold uppercase tracking-widest px-6 py-2.5 rounded-full transition-all duration-300 cursor-pointer bg-white text-black hover:bg-gray-200"
                  >
                    Vai al catalogo
                    <ArrowRightIcon className="w-4 h-4 transition-transform duration-300 ease-out group-hover:translate-x-1" />
                  </Link>
                </div>
              )}
            </Section>
          </Fragment>
        ))}
      </div>
  );
}

{
  /* <div className="flex items-center justify-center p-2 mt-5">
          <Link
            href="/vendita"
            className="group ml-4 text-xs inline-flex items-center gap-2 font-semibold uppercase tracking-widest px-6 py-2.5 rounded-full transition-all duration-300 cursor-pointer bg-white text-black hover:bg-gray-200"
          >
            Vai al catalogo
            <ArrowRightIcon className="w-4 h-4 transition-transform duration-300 ease-out group-hover:translate-x-1" />
          </Link>
        </div>

        style={{
          bodyColor: "#2D2A26",
          titleColor: "#E5E0D8",
          textColor: "#C4BDB1",
        }} */
}
