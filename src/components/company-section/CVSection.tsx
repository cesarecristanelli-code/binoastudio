import Section from "./BodySection";
import { SectionType } from "@/types/bodysection.types";

export default function CVSection() {
  const sections: SectionType[] = [
    {
      id: 1,
      title: "Andrea",
      imagePath: "/andrea.jpg",
      imagePosition: "object-top",
      idSection: "andrea",
      reverse: true,
      children: `Andrea Cristanelli è l'anima tecnica di BINÒA. 
       Architetto senior con trent'anni di esperienza, ha coordinato grandi opere e sistemi integrati alla qualità ISO 9001. 
       La sua carriera, fondata sulle regole del project management, si esprime oggi in una dimensione umana, mettendo l'ampia competenza al servizio dell'integrità. 
       In BINÒA, Andrea rende ogni immobile un progetto sicuro e protetto.`,
      divClasses: "mt-16 mb-10",
    },
    {
      id: 2,
      title: "Pietro",
      imagePath: "/tyron.jpg",
      imagePosition: "object-top",
      idSection: "pietro",
      reverse: false,
      children: `Pietro Bonetto è l'anima dinamica di BINÒA. 
       Con una formazione classica e un'esperienza maturata nell'intermediazione immobiliare, trasforma ogni contatto in un'opportunità di valore. 
       Specializzato nella ricerca di immobili e nella gestione della relazione, porta nel progetto l'energia della nuova generazione e una spiccata sensibilità comunicativa. 
       In BINÒA è il volto operativo che ascolta i bisogni delle persone per tradurli in scelte concrete.`,
      divClasses: "mb-16 mt-10",
    },
  ];

  return (
    <>
      {sections.map((s: SectionType) => (
        <div className={s.divClasses} key={s.id}>
          <Section
            title={s.title}
            subtitle={s.subtitle}
            imagePath={s.imagePath}
            imagePosition={s.imagePosition}
            idSection={s.idSection}
            reverse={s.reverse}
          >
            {s.children}
          </Section>
        </div>
      ))}
    </>
  );
}
