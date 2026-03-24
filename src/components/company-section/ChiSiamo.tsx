import { Fragment } from "react";
import Section from "./BodySection";
import Title from "./BodyTitle";
import FoundersGrid from "./FoundersGrid";
import { SectionType } from "@/types/bodysection.types";

const sections: SectionType[] = [
  {
    id: 1,
    title: "Logos",
    imagePath: "/Tre-architetti.png",
    idSection: "logos",
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
    title: "Motto",
    imagePath: "/Tre-architetti.png",
    idSection: "motto",
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
    title: "Vision",
    imagePath: "/Guarda-orizzonte.png",
    idSection: "vision",
    children: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facilis
          facere harum animi tenetur enim doloremque in minus ullam quidem
          soluta odit molestiae quibusdam modi dolore dolorem, voluptate
          voluptatem. Doloribus recusandae neque qui nulla officiis ducimus,
          vitae officia culpa provident harum?`,
    revrese: false,
    divClasses: "my-28",
  },
  {
    id: 4,
    title: "Mission",
    imagePath: "/Stretta-di-mano.png",
    idSection: "mission",
    children: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facilis
          facere harum animi tenetur enim doloremque in minus ullam quidem
          soluta odit molestiae quibusdam modi dolore dolorem, voluptate
          voluptatem. Doloribus recusandae neque qui nulla officiis ducimus,
          vitae officia culpa provident harum?`,
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
              imagePath={s.imagePath}
              idSection={s.idSection}
              reverse={s.revrese}
            >
              {s.children}
            </Section>
          </div>

          {s.id === 1 && <FoundersGrid />}
        </Fragment>
      ))}
    </div>
  );
}
