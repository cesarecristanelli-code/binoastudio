import { Fragment } from "react";
import Section from "./BodySection";
import Title from "./BodyTitle";
// import FoundersGrid from "./FoundersGrid";
import { SectionType } from "@/types/bodysection.types";
import CVImage from "./CVImage";

const sections: SectionType[] = [
  {
    id: 1,
    title: "BINÒA",
    imagePath: "/Tre-architetti.png",
    idSection: "binoa",
    children: (
      <>
        <b>BINÒA</b> nasce dall&apos;incontro tra la solidità tecnica di Andrea,
        architetto senior, e l&apos;energia di Pietro, esperto in marketing
        immobiliare. Fondiamo due generazioni e competenze speculari per
        superare i limiti del nostro tempo. Guidati dal motto{" "}
        <b>“Gestiamo valori”</b>, seguiamo un percorso strategico che evolve
        dalla vendita sicura alla gestione di grandi progetti. Uniamo rigore
        tecnico e cura umana per garantire intese solide e trasparenti.
      </>
    ),
    revrese: false,
    divClasses: "mt-28 mb-16",
  },
  {
    id: 2,
    title: "GESTIAMO VALORI",
    subtitle: "Motto",
    imagePath: "/Tre-architetti.png",
    idSection: "motto",
    children: `Per BINÒA ogni progetto è in primis un incontro tra persone. 
    Uniamo il rigore dell'architettura all'ascolto profondo per tutelare il capitale umano e la serenità dei clienti. 
    Diamo trasparenza ai principi che rendono una dimora il riflesso autentico dei valori di chi la abita.`,
    revrese: true,
    divClasses: "my-28",
  },
  {
    id: 3,
    title: "GESTIAMO IMMOBILI IN MODO INTEGRALE",
    subtitle: "Vision",
    imagePath: "/Guarda-orizzonte.png",
    idSection: "vision",
    children: `Guardiamo al futuro del mercato evolvendo come partner strategici per investimenti complessi 
    e progettazione internazionale. La nostra ambizione è governare l'intero ciclo di vita dell'edificio, colmando 
    ogni distanza tecnica o burocratica per unire stabilmente persone e dimore.`,
    revrese: false,
    divClasses: "my-28",
  },
  {
    id: 4,
    title: "CI PRENDIAMO CURA DEGLI IMMOBILI",
    subtitle: "Mission",
    imagePath: "/Stretta-di-mano.png",
    idSection: "mission",
    children: `Operiamo attraverso un metodo che renda la vendita sicura e trasparente, integrando analisi urbanistica 
    e marketing relazionale per garantire una gestione completa. Accompagniamo le persone con onestà e competenza, mettendo 
    la tutela e la valorizzazione del progetto o della vendita al centro di ogni nostra azione.`,
    revrese: true,
    divClasses: "my-28",
  },
];

export default function ChiSiamo() {
  return (
    <div
      className="max-w-7xl mx-auto space-y-40 py-28 mt-20 rounded-t-2xl shadow-2xl"
      style={{ backgroundColor: "rgb(218,211,201)" }}
    >
      <Title number="01" title="Chi siamo" />

      {sections.map((s) => (
        <Fragment key={s.id}>
          <div className={s.divClasses}>
            <Section
              title={s.title}
              subtitle={s.subtitle}
              imagePath={s.imagePath}
              idSection={s.idSection}
              reverse={s.revrese}
            >
              {s.children}
            </Section>
          </div>

          {s.id === 1 && <CVImage />}
        </Fragment>
      ))}
    </div>
  );
}
