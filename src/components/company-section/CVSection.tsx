import { useTranslations } from "next-intl";
import Section from "./BodySection";
import { SectionType } from "@/types/bodysection.types";

export default function CVSection() {
  const t = useTranslations("Homepage.aboutUsSection.team");

  const sections: SectionType[] = [
    {
      id: 1,
      title: "Andrea",
      imagePath: "/andrea.jpg",
      imagePosition: "object-top",
      idSection: "andrea",
      reverse: true,
      children: t("andrea"),
      divClasses: "mt-16 mb-10",
    },
    {
      id: 2,
      title: "Pietro",
      imagePath: "/tyron.jpg",
      imagePosition: "object-top",
      idSection: "pietro",
      reverse: false,
      children: t("pietro"),
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
