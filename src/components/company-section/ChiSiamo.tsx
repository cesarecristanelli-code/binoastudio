import { Fragment } from "react";
import Section from "./BodySection";
import Title from "./BodyTitle";
import { SectionType } from "@/types/bodysection.types";
import CVSection from "./CVSection";
import { useTranslations } from "next-intl";

export default function ChiSiamo() {
  const t = useTranslations("Homepage.aboutUsSection");

  const sections: SectionType[] = [
    {
      id: 1,
      title: "BINÒA",
      imagePath: "/sfondo_binoa_v3.jpg",
      idSection: "binoa",
      children: t("introduction"),
      reverse: false,
      divClasses: "mt-28 mb-16",
    },
    {
      id: 2,
      title: t("coreValues.motto.title"),
      subtitle: "Motto",
      imagePath: "/motto-immagine.png",
      idSection: "motto",
      children: t("coreValues.motto.description"),
      reverse: true,
      divClasses: "my-28",
    },
    {
      id: 3,
      title: t("coreValues.vision.title"),
      subtitle: "Vision",
      imagePath: "/vision-immagine.png",
      idSection: "vision",
      children: t("coreValues.vision.description"),
      reverse: false,
      divClasses: "my-28",
    },
    {
      id: 4,
      title: t("coreValues.mission.title"),
      subtitle: "Mission",
      imagePath: "/mission-immagine.png",
      idSection: "mission",
      children: t("coreValues.mission.description"),
      reverse: true,
      divClasses: "my-28",
    },
  ];

  return (
    <div
      className="max-w-7xl mx-auto space-y-40 py-28 mt-20 rounded-t-2xl shadow-2xl"
      style={{ backgroundColor: "rgb(218,211,201)" }}
    >
      <Title number="01" title={t("title")} />

      {sections.map((s: SectionType) => (
        <Fragment key={s.id}>
          <div className={s.divClasses}>
            <Section
              title={s.title}
              subtitle={s.subtitle}
              imagePath={s.imagePath}
              idSection={s.idSection}
              reverse={s.reverse}
            >
              {s.children}
            </Section>
          </div>

          {s.id === 1 && <CVSection />}
        </Fragment>
      ))}
    </div>
  );
}
