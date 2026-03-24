import { CardImmobileProps } from "@/types/card.types";
import Image from "next/image";

export default function CardImmobile({
  imagePath,
  prezzo,
  nomeImmobile,
  children,
  indirizzo,
}: CardImmobileProps) {
  return (
    <div className="max-w-xl flex flex-col rounded-xl shadow-lg m-3 cursor-pointer">
      <div className="relative w-80 h-52 overflow-hidden rounded-t-xl">
        <Image
          src={imagePath}
          alt={`Foto di ${nomeImmobile}`}
          fill
          className="object-cover"
        />
      </div>
      <div className="ms-2 me-5 grow">
        <h1 className="py-4 tracking-tight font-bold text-2xl">
          € {prezzo.toFixed(2)}
        </h1>

        <h2 className="py-2 tracking-wide text-gray-800 text-lg font-semibold">
          {nomeImmobile}
        </h2>

        <h3 className="pb-2 leading-relaxed text-gray-600 capitalize">{indirizzo}</h3>
      </div>

      <div className="mt-auto border-t border-gray-200 p-3">
        {children}
      </div>
    </div>
  );
}
