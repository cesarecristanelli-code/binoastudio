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
      className={`flex flex-col ${reverse ? "md:flex-row-reverse" : "md:flex-row"} items-center py-12 gap-8 min-h-[60vh]`}
    >
      {/* Immagine */}
      <div className="w-full md:w-1/2 h-100 relative overflow-hidden rounded-md">
        <Image
          src={imageURL}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>

      {/* Testo */}
      <div className="w-full md:w-1/2 px-8 flex flex-col justify-center">
        <h3 className="text-3xl font-serif mb-4 uppercase tracking-widest">
          {title}
        </h3>
        <p className="text-gray-700 leading-relaxed max-w-md">{children}</p>
      </div>
    </section>
  );
}
