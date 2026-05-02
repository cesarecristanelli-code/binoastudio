import { getProvinciaByComune } from "@/actions/geoActions";
import { useState, useCallback } from "react";


export default function useGeolocation() {
    //Stati per la gestione della mappa
    const [coords, setCoords] = useState<{ lat: number; lng: number }>({
        lat: 45.438,
        lng: 10.993,
    });
    const [isGeocoding, setIsGeocoding] = useState<boolean>(false);
    const [address, setAddress] = useState<string>("");

    // Funzioni per la gestione della mappa e dell'indirizzo
    const handleVerifyAddress = async (indirizzo: string, selectedComuneId: string) => {

        if (!indirizzo || indirizzo.length < 3) {
            alert("Inserisci un indirizzo valido");
            return;
        }
        if (!selectedComuneId) {
            alert("Seleziona prima un comune");
            return;
        }

        setIsGeocoding(true);

        try {
            const comuneConProvincia = await getProvinciaByComune(
                selectedComuneId,
            );
            if (!comuneConProvincia.success) {
                alert("Errore nella ricerca della provincia");
                return;
            }

            const { cap, nome, provincia } = comuneConProvincia.data

            const query = `${indirizzo}, ${cap}, ${nome}, ${provincia.sigla}`;
            const res = await fetch(`/api/geocoding?q=${encodeURIComponent(query)}`);
            const result = await res.json();

            if (result.success) {
                setCoords({
                    lat: result.data.lat,
                    lng: result.data.lng,
                });
                return { lat: result.data.lat, lng: result.data.lng };
            } else {
                alert(
                    "Indirizzo non trovato. Verifica che sia corretto e completo (es: Via Roma 1)",
                );
            }
        } catch (error) {
            console.log("Geocoding error: ", error);
            alert("Errore durante la geolocalizzazione");
        } finally {
            setIsGeocoding(false);
        }
    };

    const handleMapChange = useCallback((lat: number, lng: number) => {
        setCoords({ lat, lng });
    }, []);

    return {
        coords, setCoords,
        isGeocoding, setIsGeocoding,
        address, setAddress,
        handleVerifyAddress, handleMapChange
    }
}