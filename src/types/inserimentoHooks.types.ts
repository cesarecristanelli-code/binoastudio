import { Regione, Provincia, Comune, Zona } from "@/generated/prisma/client";

export interface Geo {
    regioni: Regione[],
    setRegioni: (regioni: Regione[]) => void,
    selectedRegioneId: string,
    setSelectedRegioneId: (id: string) => void,

    province: Provincia[],
    setProvince: (province: Provincia[]) => void,
    selectedProvinciaId: string,
    setSelectedProvinciaId: (id: string) => void,

    allComuni: Comune[],
    setAllComuni: (comuni: Comune[]) => void,
    selectedComuneId: string,
    setSelectedComuneId: (id: string) => void,
    searchComune: string,
    setSearchComune: (search: string) => void,

    allZone: Zona[],
    setAllZone: (comuni: Zona[]) => void,
    selectedZonaId: string,
    setSelectedZonaId: (id: string) => void,
    searchZona: string,
    setSearchZona: (search: string) => void,
    checkedZona: boolean,
    setCheckedZona: (check: boolean) => void,

    handleRegioneChange: (regioneId: string) => void,
    handleProvinciaChange: (provinciaId: string) => void,
    handleComuneChange: (comuneId: string) => void,

    filteredComuni: Comune[],
    filteredZone: Zona[]
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
    files: File[],
    setFiles: (filse: File[]) => void,
    previews: string[],
    setPreviews: (prev: string[]) => void,

    handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void,

    removeFile: (index: number) => void,
    clearMedia: () => void
}

export interface Map {
    coords: { lat: number, lng: number },
    setCoords: (coords: { lat: number, lng: number }) => void,
    isGeocoding: boolean,
    setGeocoding: (p: boolean) => void,
    address: string,
    setAddress: (add: string) => void,

    handleVerifyAddress: (indirizzo: string, selectedComuneId: string) => { lat: number, lng: number } | void,
    handleMapChange: (lat: number, lng: number) => void
}