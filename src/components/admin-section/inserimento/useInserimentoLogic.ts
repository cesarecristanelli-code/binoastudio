import { useState, useEffect, useMemo, useCallback } from "react";
import {
    ComuneSubset,
    getComuneByProvincia,
    getProvinceByRegione,
    getRegioni,
    getZonaByComune,
    insertComune,
    insertProvincia,
    insertRegione,
    insertZona,
    ProvinciaSubset,
    ZonaSubset,
} from "@/actions/geoActions";
import { Regione, Provincia, Comune, Zona } from "@/generated/prisma/client";
import { Result } from "@/types/actions.types";



export function useInserimentoLogic() {
    // Stato per stampare i messaggi nel form
    const [status, setStatus] = useState<{
        success: boolean | null;
        message: string;
    }>({
        success: null,
        message: "",
    });
    // Stato per la gestione del caricamento del form
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // =================== GEODATI E MODALE ============================

    // STATI GEODATI
    const [regioni, setRegioni] = useState<Regione[]>([]);
    const [province, setProvince] = useState<ProvinciaSubset[]>([]);
    //comuni
    const [allComuni, setAllComuni] = useState<ComuneSubset[]>([]);
    const [searchComune, setSearchComune] = useState<string>("");
    const [selectedComuneId, setSelectedComuneId] = useState<string>("");
    //zone
    const [allZone, setAllZone] = useState<ZonaSubset[]>([]);
    const [searchZona, setSearchZona] = useState<string>("");
    const [selectedZonaId, setSelectedZonaId] = useState<string>("");
    const [checkedZona, setCheckedZona] = useState<boolean>(false);

    //STATI MODALE
    const [modalConfig, setModalConfig] = useState<{
        isOpen: boolean;
        type: "regione" | "provincia" | "comune" | "zona";
        parentId?: string;
    }>({
        isOpen: false,
        type: "regione",
        parentId: undefined,
    });
    const [newData, setNewData] = useState<{
        nome: string;
        sigla: string;
        cap: string;
    }>({
        nome: "",
        sigla: "",
        cap: "",
    });

    // AZIONI PER I GEODATI
    // Funzioni per il recupero di regioni e provincie
    useEffect(() => {
        const loadRegioni = async () => {
            const res = await getRegioni();
            if (res.success && res.data) {
                setRegioni(res.data);
            } else {
                console.log(res.message);
            }
        };

        loadRegioni();
    }, []);

    const handleRegioneChange = useCallback(async (regioneId: string) => {
        setProvince([]);
        setAllComuni([]);
        setModalConfig((prev) => ({ ...prev, parentId: regioneId }));

        if (!regioneId) return;

        const res = await getProvinceByRegione(regioneId);
        if (res.success && res.data) {
            setProvince(res.data);
        } else {
            console.log(res.message);
        }
    }, [])

    // Funzioni per il COMUNE
    const handleProvinciaChange = useCallback(async (provinciaId: string) => {
        setAllComuni([]);
        setSearchComune("");
        setSelectedComuneId("");
        setModalConfig((prev) => ({ ...prev, parentId: provinciaId }));

        if (!provinciaId) return;

        const res = await getComuneByProvincia(provinciaId);
        if (res.success && res.data) {
            setAllComuni(res.data);
        } else {
            console.log(res.message);
        }
    }, [])

    const filteredComuni = useMemo(() => {
        // Se non c'è testo o abbiamo già selezionato un comune, non mostriamo nulla
        if (searchComune.trim() === "" || selectedComuneId) return [];

        return allComuni.filter((c) =>
            c.nome.toLowerCase().includes(searchComune.toLowerCase()),
        );
    }, [searchComune, allComuni, selectedComuneId]);

    // Funzioni per la ZONA
    const handleComuneChange = useCallback(async (comuneId: string) => {
        setSelectedComuneId(comuneId);

        setAllZone([]);
        setSearchZona("");
        setSelectedZonaId("");
        setModalConfig((prev) => ({ ...prev, parentId: comuneId }));

        if (!comuneId) return;

        const res = await getZonaByComune(comuneId);
        if (res.success && res.data && res.data.length > 0) {
            setAllZone(res.data);
            setCheckedZona(true);
        }
    }, []);

    const filteredZone = useMemo(() => {
        // Se non c'è testo cercato O se abbiamo già cliccato su un suggerimento (bloccando l'ID)
        // svuotiamo la lista dei suggerimenti.
        if (searchZona.trim() === "" || selectedZonaId) return [];

        return allZone.filter((z) =>
            z.nome.toLowerCase().includes(searchZona.toLowerCase()),
        );
    }, [searchZona, allZone, selectedZonaId]);

    // AZIONI PER MODALE
    const handleSaveNewItem = async () => {
        const { nome, sigla, cap } = newData;
        if (!nome) return alert("Il nome è obbligatorio");

        let res:
            | Result<Regione>
            | Result<Provincia>
            | Result<Comune>
            | Result<Zona>;
        switch (modalConfig.type) {
            case "regione":
                res = await insertRegione(nome);
                if (res.success) {
                    const newRegione = res.data as Regione;
                    setRegioni((prev) => [...prev, newRegione]);
                }
                break;

            case "provincia":
                res = await insertProvincia(nome, sigla, modalConfig.parentId!);
                if (res.success) {
                    const newProvincia = res.data as Provincia;
                    setProvince((prev) => [
                        ...prev,
                        { id: newProvincia.id, nome: newProvincia.nome },
                    ]);
                }
                break;

            case "comune":
                res = await insertComune(nome, modalConfig.parentId!, cap);
                if (res.success) {
                    const newComune = res.data as Comune;
                    setAllComuni((prev) => [
                        ...prev,
                        { id: newComune.id, nome: newComune.nome },
                    ]);
                }
                break;

            case "zona":
                res = await insertZona(nome, modalConfig.parentId!, cap);
                if (res.success) {
                    const newZona = res.data as Zona;
                    setAllZone((prev) => [
                        ...prev,
                        { id: newZona.id, nome: newZona.nome },
                    ]);
                }
                break;
        }

        if (res?.success) {
            setModalConfig({ ...modalConfig, isOpen: false });
            setNewData({ nome: "", sigla: "", cap: "" });
        } else {
            alert(res?.message || "Errore durante l'inserimento");
        }
    };

    // =========================== FILE HANDLING =================================

    // Stati per la gestione delle immagini
    const [files, setFiles] = useState<File[]>([]);
    const [previews, setPreviews] = useState<string[]>([]);

    // Funzioni per la gestione delle immagini
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const selectedFiles = Array.from(e.target.files);
            setFiles((prev) => [...prev, ...selectedFiles]);

            const newPreviews = selectedFiles.map((file) =>
                URL.createObjectURL(file),
            );
            setPreviews((prev) => [...prev, ...newPreviews]);
        }
    };

    const removeImage = (index: number) => {
        URL.revokeObjectURL(previews[index]);

        setFiles((prev) => prev.filter((_, i) => i !== index));
        setPreviews((prev) => prev.filter((_, i) => i !== index));
    };


    return {
        status, isLoading, regioni, province, allComuni, selectedComuneId, searchComune, allZone, searchZona, selectedZonaId, checkedZona,
        modalConfig, newData, files, previews, setStatus, setIsLoading, setRegioni, setProvince, setAllComuni, setSearchComune, setSelectedComuneId,
        setAllZone, setSearchZona, setSelectedZonaId, setCheckedZona, setModalConfig, setNewData, setFiles, setPreviews, handleRegioneChange,
        handleProvinciaChange, filteredComuni, handleComuneChange, filteredZone, handleSaveNewItem, handleFileChange, removeImage
    }
}