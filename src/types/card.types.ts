import { ReactNode } from "react";

export interface CardImmobileProps {
  imagePath: string,
  prezzo: number,
  nomeImmobile: string,
  indirizzo: string,
  children: string | ReactNode,
}

export interface CardImFooterProps {
  metratura: number,
  numeroLocali: number,
  numeroBagni: number,
}

export interface CardImmobileType {
  id: string | number,
  prezzo: number,
  nomeImmobile: string,
  indirizzo: string,
  imagePaths: string[],
  metratura: number,
  numeroLocali: number,
  numeroBagni: number,
  descrizione?: string,
}