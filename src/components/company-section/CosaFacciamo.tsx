import Link from "next/link";
import Section from "./BodySection";
import { Fragment } from "react";
import Title from "./BodyTitle";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { SectionType } from "@/types/bodysection.types";
import { useTranslations } from "next-intl";
// import Form from "./FormCommenti";

export default function CosaFacciamo() {
  const t = useTranslations("Homepage.whatWeDoSection");
  const sections: SectionType[] = [
    {
      id: 1,
      title: t("services.realEstate.title"),
      imagePath: "/compravendita-immagine.jpg",
      idSection: "compravendita-immobiliare",
      children: t("services.realEstate.description"),
      reverse: false,
      divClasses: "mt-28 mb-16",
    },
    {
      id: 2,
      title: t("services.projectManagement.title"),
      imagePath: "/gestione-immagine.jpg",
      idSection: "gestione-progetti",
      children: t("services.projectManagement.description"),
      reverse: true,
      divClasses: "my-28",
    },
    {
      id: 3,
      title: t("services.design.title"),
      imagePath: "/progettazione-immagine.jpg",
      idSection: "progettazione",
      children: t("services.design.description"),
      reverse: false,
      divClasses: "my-28",
    },
  ];

  return (
    <div
      className="max-w-7xl mx-auto space-y-40 py-28 rounded-b-2xl shadow-2xl"
      style={{ backgroundColor: "#3C3833" }}
    >
      <Title number="02" title={t("title")} titleColor="#E5E0D8" />

      {sections.map((s) => (
        <Fragment key={s.id}>
          <Section
            title={s.title}
            imagePath={s.imagePath}
            reverse={s.reverse}
            idSection={s.idSection}
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
                  {t("services.realEstate.button")}
                  <ArrowRightIcon className="w-4 h-4 transition-transform duration-300 ease-out group-hover:translate-x-1" />
                </Link>
              </div>
            )}
          </Section>
        </Fragment>
      ))}
      {/* <div className="container flex justify-center items-center mx-auto">
        <Form />
      </div> */}
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
