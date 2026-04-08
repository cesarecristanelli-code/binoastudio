import Image from "next/image";
import HeroTitle from "./HeroTitle";

interface HeroProps {
  title: string;
  bgImage: string;
}

export default function Hero({ title, bgImage }: HeroProps) {
  return (
    <section className="relative w-screen h-[80vh] flex items-center justify-center">
      <div className="absolute inset-0 z-0">
        <Image
          src={bgImage}
          alt="Sfondo Trinòa"
          fill
          priority
          quality={100}
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <div className="relative z-10 text-gray-100 px-6 w-full">
        <HeroTitle title={title} />
      </div>
    </section>
  );
}
