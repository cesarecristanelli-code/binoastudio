import Section from "./BodySection";
import Title from "./BodyTitle";
import FoundersGrid from "./FoundersGrid";
/* import Image from "next/image";
import Card from "../Card2"; */

export default function HomeBody() {
  return (
    <div
      className="max-w-7xl mx-auto space-y-40 py-28 mt-20 rounded-2xl shadow-2xl"
      style={{ backgroundColor: "rgb(218, 211, 201)" }}
    >
      <Title number="01" title="Chi siamo" />
      <div className="my-24">
        <Section title="Trinòa" imageURL="/Tre-architetti.png" reverse={false}>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facilis
          facere harum animi tenetur enim doloremque in minus ullam quidem
          soluta odit molestiae quibusdam modi dolore dolorem, voluptate
          voluptatem. Doloribus recusandae neque qui nulla officiis ducimus,
          vitae officia culpa provident harum?
        </Section>
      </div>
      <FoundersGrid />

      {/* Corregi la questione del footer */}
      {/* <Card title="Andrea" imageURL="/simil-andrea.tsx">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste nulla
        reprehenderit voluptas! Accusantium pariatur perspiciatis officiis a
        ratione omnis laudantium.
      </Card> */}
    </div>
  );
}
