"use client";

import { useState } from "react";
import { Immobile } from "@/generated/prisma/client"; // Assicurati di avere i tipi generati

interface Props {
  immobile: Omit<Immobile, "prezzo"> & { prezzo: number }; // O il tipo specifico del tuo modello
}

export default function DettagliImmobile({ immobile }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Helper per i booleani
  const formatBool = (val: boolean) => (val ? "Sì" : "No");

  return (
    <section className="space-y-8 w-full">
      <h2 className="text-2xl font-bold border-b pb-2 text-slate-800">
        Dettagli dell&apos;immobile
      </h2>

      {/* Griglia principale: 2 colonne su desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-2 transition-all duration-500 ease-in-out overflow-hidden">
        {/* SEMPRE VISIBILI: Caratteristiche principali */}
        <DetailRow
          label="Prezzo"
          value={`€ ${Number(immobile.prezzo).toLocaleString()}`}
        />
        <DetailRow label="Superficie" value={`${immobile.metratura} m²`} />
        <DetailRow label="Locali" value={immobile.numeroLocali} />
        <DetailRow label="Bagni" value={immobile.numeroBagni} />
        <DetailRow label="Piano" value={immobile.piano || "Terra"} />
        <DetailRow label="Stato" value={immobile.stato} />

        {/* VISIBILI SOLO SE ESPANSO */}
        {isExpanded && (
          <>
            <DetailRow label="Totale piani" value={immobile.totalePiani || 1} />
            <DetailRow label="Tipologia" value={immobile.tipo} />
            <DetailRow
              label="Anno di costruzione"
              value={immobile.annoCostruzione}
            />
            <DetailRow label="Riscaldamento" value={immobile.riscaldamento} />
            <DetailRow
              label="Climatizzazione"
              value={immobile.raffrescamento}
            />
            <DetailRow
              label="Classe Energetica"
              value={immobile.classeEnergetica}
            />
            <DetailRow
              label="Ascensore"
              value={formatBool(immobile.ascensore)}
            />
            <DetailRow label="Giardino" value={formatBool(immobile.giardino)} />
            <DetailRow label="Arredato" value={formatBool(immobile.arredo)} />
            <DetailRow
              label="Box Auto"
              value={immobile.boxAuto > 0 ? immobile.boxAuto : "No"}
            />
            <DetailRow
              label="Posti Auto"
              value={immobile.postiAuto > 0 ? immobile.postiAuto : "No"}
            />
            <DetailRow label="Terrazzi" value={immobile.numeroTerrazzi} />
            <DetailRow label="Balconi" value={immobile.numeroBalconi} />
            <DetailRow label="Occupazione" value={immobile.statoOccupazione} />
            <DetailRow
              label="Classe Catastale"
              value={immobile.classeCatastale || "N/D"}
            />
            <DetailRow
              label="Spese Condominiali"
              value={
                immobile.speseCondominiali
                  ? `€ ${immobile.speseCondominiali}`
                  : "0"
              }
            />
          </>
        )}
      </div>

      {/* TASTO MOSTRA TUTTO */}
      <div className="flex justify-center mt-6">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="px-6 py-2 border-2 border-green-600 text-green-600 font-bold rounded-full hover:bg-green-600 hover:text-white transition-all duration-300 flex items-center gap-2"
        >
          {isExpanded ? "MOSTRA MENO" : "MOSTRA TUTTI I DETTAGLI"}
          <span
            className={`transform transition-transform ${isExpanded ? "rotate-180" : ""}`}
          >
            ↓
          </span>
        </button>
      </div>
    </section>
  );
}

function DetailRow({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex justify-between items-center py-3 border-b border-gray-100">
      <span className="text-gray-500 font-medium">{label}</span>
      <span className="font-semibold text-slate-900 uppercase text-sm">
        {value}
      </span>
    </div>
  );
}
