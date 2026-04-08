"use client";

import { CardImmobileProps } from "@/types/cardImmobile.types";
import Link  from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function CardImmobile({
  id,
  immagini,
  prezzo,
  nomeImmobile,
  children,
  indirizzo,
  elimina,
}: CardImmobileProps) {
  const [isLogged, setIsLogged] = useState<boolean>(false);

  useEffect(() => {
    const logged = localStorage.getItem("isLoggedIn") === "true";
    setTimeout(() => setIsLogged(logged), 0);
  }, []);

  const formatter = new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  });

  const coverImage = immagini.find((img) => img.isCover) || immagini[0];



  return (
    <>
      <div className="max-w-xl flex flex-col rounded-xl shadow-lg m-3 cursor-pointer">
        <div className="relative w-80 h-52 overflow-hidden rounded-t-xl">
          <Image
            src={coverImage.path}
            alt={`Foto di ${nomeImmobile}`}
            fill
            className="object-cover"
          />
        </div>
        <div className="ms-2 me-5 grow">
          <h1 className="py-4 tracking-tight font-bold text-2xl">
            € {formatter.format(prezzo)}
          </h1>

          <h2 className="py-2 tracking-wide text-gray-800 text-lg font-semibold">
            {nomeImmobile}
          </h2>

          <h3 className="pb-2 leading-relaxed text-gray-600 capitalize">
            {indirizzo}
          </h3>
        </div>

        <div className="mt-auto border-t border-gray-200 p-3">{children}</div>
      </div>
      {isLogged && (
        <div className="mt-2 flex justify-between max-w-xl">
          {/* Bottone MODIFICA */}
          <Link
            href={`/form-modifica-immobile/${id}`}
            className="border-2 border-black rounded-xl text-center px-3 py-2 cursor-pointer"
            
          >
            Modifica
          </Link>
          {/* Bottone ELIMINA */}
          <button
            type="button"
            className="border-2 border-red-700 rounded-xl text-center px-3 py-2 cursor-pointe text-white bg-red-400r"
            onClick={() => elimina(id)}
          >
            Elimina
          </button>
        </div>
      )}
    </>
  );
}
