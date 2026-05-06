import { useState, useEffect, useCallback, useMemo } from "react";
import { Regione } from "@/generated/prisma/client";
import { ProvinciaSubset, ComuneSubset, ZonaSubset, getProvinceByRegione, getComuniByProvincia, getZoneByComune, getGeoHyerarchy } from "@/actions/geoActions";
import { getRegioni } from "@/actions/geoActions";


export default function useGeoData(formData?: { comuneId?: string, zonaId?: string | null }) {
    //Regione
    const [regioni, setRegioni] = useState<Regione[]>([]);
    const [selectedRegioneId, setSelectedRegioneId] = useState<string>("");
    //Provincia
    const [province, setProvince] = useState<ProvinciaSubset[]>([]);
    const [selectedProvinciaId, setSelectedProvinciaId] = useState<string>("");
    //Comune
    const [allComuni, setAllComuni] = useState<ComuneSubset[]>([]);
    const [searchComune, setSearchComune] = useState<string>("");
    const [selectedComuneId, setSelectedComuneId] = useState<string>("");
    //Zona
    const [allZone, setAllZone] = useState<ZonaSubset[]>([]);
    const [searchZona, setSearchZona] = useState<string>("");
    const [selectedZonaId, setSelectedZonaId] = useState<string>("");
    const [checkedZona, setCheckedZona] = useState<boolean>(false);

    const [isHydrated, setIsHydrated] = useState<boolean>(false);

    // Carica i giusti ID nel caso in cui ci sia formData
    useEffect(() => {
        if (!formData?.comuneId || isHydrated) return

        const comuneId = formData?.comuneId;
        const zonaId = formData?.zonaId;

        if (!comuneId) return;

        const hydrateGeo = async () => {
            try {
                const result = await getGeoHyerarchy(comuneId);

                if (result.success && result.data) {
                    const { regioneId, provinciaId, comuneId, comuneNome } = result.data;

                    setSelectedRegioneId(regioneId);
                    setSelectedProvinciaId(provinciaId);
                    setSelectedComuneId(comuneId);
                    setSearchComune(comuneNome);

                    const [provinceRes, comuniRes, zoneRes] = await Promise.all([
                        getProvinceByRegione(regioneId),
                        getComuniByProvincia(provinciaId),
                        zonaId ? getZoneByComune(comuneId) : Promise.resolve(null)
                    ]);

                    if (provinceRes.success) setProvince(provinceRes.data);
                    if (comuniRes.success) setAllComuni(comuniRes.data);

                    if (zoneRes && zoneRes.success) {
                        setAllZone(zoneRes.data)

                        const zonaAttuale = zoneRes.data.find((z) => z.id === zonaId);
                        if (zonaAttuale) {
                            setSelectedZonaId(zonaAttuale.id);
                            setSearchZona(zonaAttuale.nome)
                        }
                    }
                }
                setIsHydrated(true)
            } catch (error) {
                console.error("Errore durante l'idratazione geografica: ", error)
            }
        };

        hydrateGeo();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData?.comuneId, isHydrated])

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

    // Cambia Regione --> Carica Province
    // L'utente seleziona la regione:
    const handleRegioneChange = useCallback(async (regioneId: string) => {
        setSelectedRegioneId(regioneId) // Salvo l'id della regione selezionata

        // Azzero la lista delle province (e l'id salvato in selectedProvinciaId), comuni e zone
        setProvince([]);
        setSelectedProvinciaId("");
        setAllComuni([]);
        setSelectedComuneId("");
        setSearchComune("");
        setAllZone([]);
        setSelectedZonaId("");
        setSearchZona("");


        if (!regioneId) return;

        const res = await getProvinceByRegione(regioneId);
        if (res.success && res.data) {
            setProvince(res.data);
        } else {
            console.log(res.message);
        }
    }, [])

    // Cambia Provincia --> Carica Comuni
    // L'utente seleziona una provincia:
    const handleProvinciaChange = useCallback(async (provinciaId: string) => {
        setSelectedProvinciaId(provinciaId);
        setAllComuni([]);
        setSearchComune("");
        setSelectedComuneId("");
        setAllZone([]);
        setSelectedZonaId("");
        setSearchZona("");

        if (!provinciaId) return;

        const res = await getComuniByProvincia(provinciaId);
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

    // Cambia Comune --> Carica Zone
    // L'utente seleziona un comune:
    const handleComuneChange = useCallback(async (comuneId: string) => {
        setSelectedComuneId(comuneId);

        setAllZone([]);
        setSearchZona("");
        setSelectedZonaId("");

        if (!comuneId) return;

        const res = await getZoneByComune(comuneId);
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

    return {
        // VARIABILI e FUNZIONI di STATO
        regioni, setRegioni, selectedRegioneId, setSelectedRegioneId, //Regione
        province, setProvince, selectedProvinciaId, setSelectedProvinciaId, //Provincia
        allComuni, setAllComuni, selectedComuneId, setSelectedComuneId, searchComune, setSearchComune, //Comune
        allZone, setAllZone, selectedZonaId, setSelectedZonaId, searchZona, setSearchZona, checkedZona, setCheckedZona, //Zona

        // HANDLERS
        handleRegioneChange, handleProvinciaChange, handleComuneChange,

        // LISTE FILTRATE
        filteredComuni, filteredZone
    }
}