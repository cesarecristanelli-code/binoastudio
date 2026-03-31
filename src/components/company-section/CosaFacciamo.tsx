import Link from "next/link";
import Section from "./BodySection";
import { Fragment } from "react";
import Title from "./BodyTitle";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { SectionType } from "@/types/bodysection.types";
import Form from "./FormCommenti";

export default function CosaFacciamo() {
  const sections: SectionType[] = [
    {
      id: 1,
      title: "COMPRAVENDITA IMMOBILIARE",
      imagePath: "/Tre-architetti.png",
      idSection: "compravendita-immobiliare",
      children: (
        <>
          Offriamo un servizio di intermediazione che ha come obiettivo una{" "}
          <b>“vendita sicura”</b>. Uniamo la ricerca commerciale di Pietro al
          rigore tecnico di Andrea, garantendo che ogni immobile abbia i
          documenti necessari in ordine. Accompagniamo i clienti con
          trasparenza, trasformando la trattativa in un&apos;intesa solida.
        </>
      ),
      revrese: false,
      divClasses: "mt-28 mb-16",
    },
    {
      id: 2,
      title: "GESTIONE PROGETTI",
      imagePath: "/Tre-architetti.png",
      idSection: "gestione-progetti",
      children: (
        <>
          Ci proponiamo come partner strategici per imprese e investitori anche
          nel ruolo di <b>Site Manager</b>. Gestiamo la complessità, con un
          approccio metodico che si fonda dalle norme ISO del project
          management. Dalla pianificazione dei processi tecnici ed economici
          oltre a quelli legati al marketing e alla compravendita in corso di
          costruzione, solleviamo committenti e imprese da aspetti critici sia
          tecnici che operativi, garantendo efficienza e qualità per trasformare
          le aree di sviluppo in realtà concrete.
        </>
      ),
      revrese: true,
      divClasses: "my-28",
    },
    {
      id: 3,
      title: "PROGETTAZIONE",
      imagePath: "/Guarda-orizzonte.png",
      idSection: "progettazione",
      children: (
        <>
          Trasformiamo le idee in spazi attraverso una progettazione integrale
          che unisce estetica e ingegnerizzazione. Ci occupiamo anche dei
          cantieri, con una particolare attenzione all&apos;ambiente.
          Supportiamo il cliente dal concept iniziale fino alla firma finale,
          assicurando che ogni intervento, dalla ristrutturazione alla grande
          opera, sia tecnicamente solido e protetto
        </>
      ),
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
                  Vai al catalogo
                  <ArrowRightIcon className="w-4 h-4 transition-transform duration-300 ease-out group-hover:translate-x-1" />
                </Link>
              </div>
            )}
          </Section>
        </Fragment>
      ))}
      <div className="container flex justify-center items-center mx-auto">
        <Form />
      </div>
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
