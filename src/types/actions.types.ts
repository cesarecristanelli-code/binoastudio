import { Immobile, ImmagineImmobile, Comune, Provincia } from "@/generated/prisma/client"

export type Result<T> = { success: false, message: string } | { success: true, message: string, data: T }

export interface ImmobileExtended extends Immobile {
  immagini: ImmagineImmobile[];
}

export interface ComuneExtended extends Comune {
  provincia: Provincia;
}
