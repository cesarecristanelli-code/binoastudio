import { ComuneSubset, ProvinciaSubset, ZonaSubset } from "@/actions/geoActions";
import { Regione, Provincia, Comune, Zona, Prisma } from "@/generated/prisma/client";

export interface Geo {
    regioni: Regione[],
    setRegioni: (regioni: Regione[]) => void,
    selectedRegioneId: string,
    setSelectedRegioneId: (id: string) => void,

    province: ProvinciaSubset[],
    setProvince: (province: ProvinciaSubset[]) => void,
    selectedProvinciaId: string,
    setSelectedProvinciaId: (id: string) => void,

    allComuni: ComuneSubset[],
    setAllComuni: (comuni: ComuneSubset[]) => void,
    selectedComuneId: string,
    setSelectedComuneId: (id: string) => void,
    searchComune: string,
    setSearchComune: (search: string) => void,

    allZone: ZonaSubset[],
    setAllZone: (comuni: ZonaSubset[]) => void,
    selectedZonaId: string,
    setSelectedZonaId: (id: string) => void,
    searchZona: string,
    setSearchZona: (search: string) => void,
    checkedZona: boolean,
    setCheckedZona: (check: boolean) => void,

    handleRegioneChange: (regioneId: string) => void,
    handleProvinciaChange: (provinciaId: string) => void,
    handleComuneChange: (comuneId: string) => void,

    filteredComuni: ComuneSubset[],
    filteredZone: ZonaSubset[]
}

export interface Admin {
    modalConfig: {
        isOpen: boolean;
        type: "regione" | "provincia" | "comune" | "zona";
        parentId?: string;
    },
    setModalConfig: (modalConfig: {
        isOpen: boolean;
        type: "regione" | "provincia" | "comune" | "zona";
        parentId?: string;
    }) => void,
    newData: {
        nome: string;
        sigla: string;
        cap: string;
    },
    setNewData: (newData: {
        nome: string;
        sigla: string;
        cap: string;
    }) => void,

    openModal: (type: "regione" | "provincia" | "comune" | "zona", parentId?: string) => void,
    closeModal: () => void,

    handleSaveNewItem: (onSuccess: (
        data: Regione | Provincia | Comune | Zona,
        type: string
    ) => void) => void,
}

export interface Media {
    oldImages: string[],
    setOldImages: (img: string[]) => void,
    files: File[],
    setFiles: (files: File[]) => void,
    previews: string[],
    setPreviews: (prev: string[]) => void,

    handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void,

    removeFile: (index: number) => void,
    removeOldImage: (url: string) => void,
    clearMedia: () => void
}

export interface Map {
    coords: { lat: number, lng: number },
    setCoords: (coords: { lat: number, lng: number }) => void,
    isGeocoding: boolean,
    setIsGeocoding: (p: boolean) => void,
    address: string,
    setAddress: (add: string) => void,

    handleVerifyAddress: (indirizzo: string, selectedComuneId: string) => Promise<{ lat: number, lng: number } | void>,
    handleMapChange: (lat: number, lng: number) => void,
    hydrateMap: (add: string, lat: number, lng: number) => void,
}

// A. TIPO DB: Quello che arriva dalla query Prisma
export type ImmobileWithRelations = Prisma.ImmobileGetPayload<{
    include: { immagini: true; comune: true; zona: true };
}>;

type Prettify<T> = {
    [K in keyof T]: T[K];
} & {};

// B. TIPO FORM: Quello che serve allo stato dello useImmobileHooks
// Trasformiamo i campi problematici (Decimal -> number, Immagine -> string)
export type ImmobileFullForm = Prettify<Omit<
    ImmobileWithRelations,
    "createdAt" | "updatedAt" | "prezzo"
> & {
    prezzo: number; // Lo gestiamo come numero per l'input
}>;