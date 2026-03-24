import { ReactNode } from "react";

export interface FounderCardProps {
  name: string;
  role: string;
  imagePath: string;
  onClick: () => void;
}

export interface FounderCardType {
  id: string | number;
  name: string;
  imagePath: string;
  role: string;
}

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