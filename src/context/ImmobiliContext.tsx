"use client";

import { CardImmobileType } from "@/types/card.types";
import { createContext, useContext, useState } from "react";
import { ReactNode } from "react";

interface ImmobiliContextType {
  catalogoImmobili: CardImmobileType[];
  aggiornaCatalogo: (immobile: CardImmobileType) => void;
}

const ImmobiliContext = createContext<ImmobiliContextType | undefined>(
  undefined,
);

export default function ImmobiliProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [catalogoImmobili, setCatalogoImmobili] = useState<CardImmobileType[]>(
    () => {
      if (typeof window === "undefined") return [];

      try {
        const immobiliSalvati = localStorage.getItem("immobili_backup");
        return immobiliSalvati ? JSON.parse(immobiliSalvati) : [];
      } catch (e) {
        console.error(
          "Sei dentro al catch di useState... c'è stato un problema: ",
          e,
        );
        return [];
      }
    },
  );

  const aggiornaCatalogo = (immobile: CardImmobileType) => {
    const nuovoImmobile = { ...immobile, id: crypto.randomUUID() };
    setCatalogoImmobili((prev) => {
      const catalogoAggiornato = [...prev, nuovoImmobile];
      localStorage.setItem(
        "immobili_backup",
        JSON.stringify(catalogoAggiornato),
      );
      return catalogoAggiornato;
    });
  };

  return (
    <ImmobiliContext.Provider value={{ catalogoImmobili, aggiornaCatalogo }}>
      {children}
    </ImmobiliContext.Provider>
  );
}

export function useImmobiliProvider() {
  const context = useContext(ImmobiliContext);
  if (!context)
    throw new Error("useImmobiliProvider deve essere usato dentro il provider");
  return context;
}
