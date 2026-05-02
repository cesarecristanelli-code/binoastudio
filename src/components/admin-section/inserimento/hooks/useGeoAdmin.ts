import { insertComune, insertProvincia, insertRegione, insertZona } from "@/actions/geoActions";
import { Provincia, Regione, Comune, Zona } from "@/generated/prisma/client";
import { Result } from "@/types/actions.types";
import { useState } from "react";


export default function useGeoAdmin() {
    // Stato che controlla se la modale è aperta, cosa sto inserendo e chi è il padre
    const [modalConfig, setModalConfig] = useState<{
        isOpen: boolean;
        type: "regione" | "provincia" | "comune" | "zona";
        parentId?: string;
    }>({
        isOpen: false,
        type: "regione",
        parentId: undefined,
    });

    // Stato per i campi di input della modale: salva temporaneamente i dati da mandare al DB (sigla --> solo per Provincia, CAP --> per Comune e Zona)
    const [newData, setNewData] = useState<{
        nome: string;
        sigla: string;
        cap: string;
    }>({
        nome: "",
        sigla: "",
        cap: "",
    });

    // AZIONI UI

    const openModal = (type: "regione" | "provincia" | "comune" | "zona", parentId?: string) => {
        setModalConfig({ isOpen: true, type, parentId });
    }

    const closeModal = () => {
        setModalConfig((prev) => ({ ...prev, isOpen: false }));
        setNewData({ nome: "", sigla: "", cap: "" });
    }

    // HANDLER per il DB
    const handleSaveNewItem = async (onSuccess: (data: Regione | Provincia | Comune | Zona, type: string) => void) => {
        const { nome, sigla, cap } = newData;
        if (!nome) return alert("Il nome è obbligatorio");

        let res: Result<Regione | Provincia | Comune | Zona> | undefined;

        switch (modalConfig.type) {
            case "regione":
                res = await insertRegione(nome);
                break;

            case "provincia":
                res = await insertProvincia(nome, sigla, modalConfig.parentId!);
                break;

            case "comune":
                res = await insertComune(nome, modalConfig.parentId!, cap);
                break;

            case "zona":
                res = await insertZona(nome, modalConfig.parentId!, cap);
                break;
        }

        if (res.success) {
            onSuccess(res.data, modalConfig.type);
            closeModal();
        } else {
            alert(res?.message || "Errore durante l'inserimento");
        }
    }

    return {
        modalConfig, setModalConfig,
        newData, setNewData,
        openModal, closeModal,
        handleSaveNewItem
    }
}