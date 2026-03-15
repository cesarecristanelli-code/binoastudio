import { ReactNode } from "react";
import Image from "next/image";

interface SectionProps {
  title: string;
  children: string | ReactNode;
  imageURL: string;
  reverse: boolean;
}

export default function Section({
  title,
  children,
  imageURL,
  reverse,
}: SectionProps) {
  return (
    <section
      className={`flex flex-col ${reverse ? "md:flex-row-reverse" : "md:flex-row"} items-center py-8 md:py-12 gap-0 md:gap-8 min-h-[60vh]`}
    >
      {/* Immagine */}
      <div className="w-full md:w-1/2 aspect-4/3 md:h-112.5 relative overflow-hidden rounded-md">
        <Image
          src={imageURL}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>

      {/* Testo */}
      <div
        className={`
            w-[90%] md:w-1/2 
            -mt-16 md:mt-0 
            mx-auto md:mx-0
          bg-white md:bg-transparent 
            p-6 md:p-8 
            relative z-10 
            shadow-lg md:shadow-none
            rounded-xl md:rounded-none
        `}
      >
        <h3 className="text-3xl font-arvo mb-4 uppercase tracking-[0.2em] md:text-gray-100">
          {title}
        </h3>
        <p className="text-gray-700 leading-relaxed max-w-md">{children}</p>
      </div>
    </section>
  );
}
