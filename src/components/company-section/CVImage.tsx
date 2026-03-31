// Controlla bene il codice

"use client";

import Image from "next/image";
import React, { useState } from "react";

export default function CVImage() {
  // Stato per capire quale descrizione mostrare: null | 'left' | 'right'
  const [activeSide, setActiveSide] = useState<null | "left" | "right">(null);

  const data = {
    left: {
      name: "Pietro",
      desc: "Pietro Bonetto è l'anima dinamica di BINÒA. Con una solida formazione classica e un'esperienza maturata nel marketing e nell'intermediazione immobiliare, trasforma ogni contatto in un'opportunità di valore. Specializzato nella ricerca di immobili e nella gestione della relazione, porta nel progetto l'energia della nuova generazione e una spiccata sensibilità comunicativa. In BINÒA è il volto operativo che ascolta i bisogni delle persone per tradurli in scelte trasparenti e sicure.",
    },
    right: {
      name: "Andrea",
      desc: "Andrea Cristanelli è l'anima tecnica di BINÒA. Architetto senior con trent'anni di esperienza, ha coordinato grandi opere internazionali e sistemi integrati alla qualità ISO 9001. La sua carriera, fondata sul rigore del project management, si esprime oggi in una dimensione umana, mettendo l'ampia competenza al servizio della trasparenza. In BINÒA, Andrea è il garante della solidità tecnica, rendendo ogni immobile un progetto sicuro e protetto.",
    },
  };
  return (
    <section className="relative w-full h-[50vh] md:h-[80vh] min-h-125 overflow-hidden bg-gray-900 group">
      {/* 1. Immagine di Sfondo (occupa tutto) */}
      <Image
        src="/abbraccio.png"
        alt="Team"
        fill
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />

      {/* 2. Layout a due Colonne */}
      <div className="absolute inset-0 flex">
        {/* LATO SINISTRO (Uomo 50enne) */}
        <div className="relative flex-1 flex flex-col items-center justify-center transition-all duration-500 hover:bg-black/20">
          {/* Bottone che appare in hover */}
          {!activeSide && (
            <button
              onClick={() => setActiveSide("right")}
              className="cursor-pointer opacity-0 group-hover:opacity-100 bg-white/20 backdrop-blur-md border border-white/40 text-white px-6 py-2 rounded-full hover:bg-white hover:text-black transition-all"
            >
              Scopri di più
            </button>
          )}

          {/* Overlay Testo: appare quando clicchi il bottone del lato OPPOSTO */}
          <div
            className={`absolute inset-0 bg-black/80 flex flex-col justify-center p-12 transition-opacity duration-500 ${activeSide === "left" ? "opacity-100 visible" : "opacity-0 invisible"}`}
          >
            <h3 className="text-3xl font-bold text-white mb-4">
              {data.left.name}
            </h3>
            <p className="text-gray-300 text-lg leading-relaxed">
              {data.left.desc}
            </p>
            <button
              onClick={() => setActiveSide(null)}
              className="mt-8 text-sm text-white underline text-left cursor-pointer"
            >
              Chiudi
            </button>
          </div>
        </div>

        {/* LATO DESTRO (Ragazzo 25enne) */}
        <div className="relative flex-1 flex flex-col items-center justify-center transition-all duration-500 hover:bg-black/20">
          {!activeSide && (
            <button
              onClick={() => setActiveSide("left")}
              className="cursor-pointer opacity-0 group-hover:opacity-100 bg-white/20 backdrop-blur-md border border-white/40 text-white px-6 py-2 rounded-full hover:bg-white hover:text-black transition-all"
            >
              Scopri di più
            </button>
          )}

          {/* Overlay Testo: appare quando clicchi il bottone del lato OPPOSTO */}
          <div
            className={`absolute inset-0 bg-black/80 flex flex-col justify-center p-12 transition-opacity duration-500 ${activeSide === "right" ? "opacity-100 visible" : "opacity-0 invisible"}`}
          >
            <h3 className="text-3xl font-bold text-white mb-4">
              {data.right.name}
            </h3>
            <p className="text-gray-300 text-lg leading-relaxed">
              {data.right.desc}
            </p>
            <button
              onClick={() => setActiveSide(null)}
              className="mt-8 text-sm text-white underline text-left cursor-pointer"
            >
              Chiudi
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
