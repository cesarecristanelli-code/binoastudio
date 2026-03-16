import Section from "./BodySection";
import Title from "./BodyTitle";
import FoundersGrid from "./FoundersGrid";
import Image from "next/image";

export default function HomeBody() {
  return (
    <div
      className="max-w-7xl mx-auto space-y-40 py-28 mt-20 rounded-2xl shadow-2xl"
      style={{ backgroundColor: "rgb(218, 211, 201)" }}
    >
      <Title />
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


      {/* Idea per la nuova Card */}
      <div
        className="mx-auto my-20 grid grid-cols-3 gap-2 rounded-2xl max-h-60 max-w-md border-2 p-3 pe-0"
        style={{ backgroundColor: "rgb(242, 238, 232)", borderColor: "rgb(230, 224, 215)" }}
      >
        <div className=" overflow-hidden relative rounded-s-2xl rounded-e-lg">
          <Image
            src="/simil-andrea.png"
            alt="ciao"
            fill
            className="object-cover"
          />
        </div>
        <div className="p-3 col-span-2">
          <h3 className="font-arvo text-[#5C5854] tracking-wider pb-5">
            Andrea
          </h3>
          <p className="leading-relaxed text-[#332F2C]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque,
            molestiae.
          </p>
        </div>
      </div>
    </div>
  );
}
