export interface Result {
  success: boolean;
  message: string;
}

export interface Immobile {
  id: string;
  nome: string;
  prezzo: number;
  indirizzo: string;
  metratura: number;
  numeroBagni: number;
  numeroLocali: number;
  descrizione: string;
  slug: string;
  immagini: {
    id: string;
    url: string;
    isCover: boolean;
    createdAt: Date;
    updatedAt: Date;
  }[];
  createdAt: Date;
  updatedAt: Date;
}
