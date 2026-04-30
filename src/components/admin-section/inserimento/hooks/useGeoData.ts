import { useState, useEffect, useCallback, useMemo } from "react";
import { Regione } from "@/generated/prisma/client";
import { ProvinciaSubset, ComuneSubset, ZonaSubset, getProvinceByRegione, getComuneByProvincia, getZonaByComune } from "@/actions/geoActions";
import { getRegioni } from "@/actions/geoActions";


export default function useGeoData() {
    //Regione
    const [regioni, setRegioni] = useState<Regione[]>([]);
    const [selectedRegioneId, setSelectedRegioneId] = useState<string>("");
    //Provincia
    const [province, setProvince] = useState<ProvinciaSubset[]>([]);
    const [selectedProvinciaId, setSelecteProvinciaId] = useState<string>("");
    //Comune
    const [allComuni, setAllComuni] = useState<ComuneSubset[]>([]);
    const [searchComune, setSearchComune] = useState<string>("");
    const [selectedComuneId, setSelectedComuneId] = useState<string>("");
    //Zona
    const [allZone, setAllZone] = useState<ZonaSubset[]>([]);
    const [searchZona, setSearchZona] = useState<string>("");
    const [selectedZonaId, setSelectedZonaId] = useState<string>("");
    const [checkedZona, setCheckedZona] = useState<boolean>(false);

    // AZIONI PER I GEODATI
    // Al primo rendering carico tutte le regioni dal DB dentro a "regioni"
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

    // L'utente seleziona la regione:
    const handleRegioneChange = useCallback(async (regioneId: string) => {
        setSelectedRegioneId(regioneId) // Salvo l'id della regione selezionata

        // Azzero la lista delle province (e l'id salvato in selectedProvinciaId), comuni e zone
        setProvince([]);
        setSelecteProvinciaId("")
        setAllComuni([]);
        setSelectedComuneId("")


        if (!regioneId) return;

        const res = await getProvinceByRegione(regioneId);
        if (res.success && res.data) {
            setProvince(res.data);
        } else {
            console.log(res.message);
        }
    }, [])

    // L'utente seleziona una provincia:
    const handleProvinciaChange = useCallback(async (provinciaId: string) => {
        setSelecteProvinciaId(provinciaId);
        setAllComuni([]);
        setSearchComune("");
        setSelectedComuneId("");
        // setModalConfig((prev) => ({ ...prev, parentId: provinciaId }));

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
        // setModalConfig((prev) => ({ ...prev, parentId: comuneId }));

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
}