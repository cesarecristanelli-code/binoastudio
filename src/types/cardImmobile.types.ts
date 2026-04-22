import { ReactNode } from "react";

interface ImmagineImmobileType {
  id: string;
  path: string;
  isCover: boolean;
  immobileId: string;
}

export interface CardImmobileProps {
  id: string;
  immagini: ImmagineImmobileType[];
  prezzo: number;
  nomeImmobile: string;
  indirizzo: string;
  children: string | ReactNode;
  elimina: (id: string) => void;
}

export interface CardImFooterProps {
  metratura: number;
  numeroLocali: number;
  numeroBagni: number;
}

export interface CardImmobileType {
  id: string;
  prezzo: number;
  nomeImmobile: string;
  indirizzo: string;
  immagini: ImmagineImmobileType[];
  metratura: number;
  numeroLocali: number;
  numeroBagni: number;
  descrizione?: string;
}
