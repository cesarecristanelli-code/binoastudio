import { ReactNode, Fragment } from "react";
import Section from "./BodySection";
import Title from "./BodyTitle";
import FoundersGrid from "./FoundersGrid";

interface BodySectionType {
  id: number;
  title: string;
  imagePath: string;
  children: string | ReactNode;
  revrese: boolean;
  divClasses: string;
}

const sections: BodySectionType[] = [
  {
    id: 1,
    title: "Trinòa",
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
    title: "Motto",
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
    title: "Vision",
    imagePath: "/Guarda-orizzonte.png",
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
      className="max-w-7xl mx-auto space-y-40 py-28 mt-20 rounded-2xl shadow-2xl"
      style={{ backgroundColor: "rgb(218,211,201)" }}
    >
      <Title number="01" title="Chi siamo" />

      {sections.map((s) => (
        <Fragment key={s.id}>
          <div className={s.divClasses}>
            <Section
              title={s.title}
              imagePath={s.imagePath}
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
