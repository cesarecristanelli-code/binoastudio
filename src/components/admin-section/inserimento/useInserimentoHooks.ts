import useGeoData from "./hooks/useGeoData";
import useGeoAdmin from "./hooks/useGeoAdmin";
import useMediaManager from "./hooks/useMediaManager";
import useGeolocation from "./hooks/useGeolocation";
import { useState } from "react";
import { useUploadThing } from "@/lib/uploadthing";
import { insertImmobile } from "@/actions/immobiliActions";
import { Regione, Provincia, Comune, Zona } from "@/generated/prisma/client";

export default function useInserimentoHooks() {
    const { startUpload } = useUploadThing("imageUploader");

    const [status, setStatus] = useState<{ success: boolean | null, message: string }>({
        success: null,
        message: ""
    })
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const geo = useGeoData();
    const admin = useGeoAdmin();
    const media = useMediaManager();
    const map = useGeolocation();

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        const formElement = e.currentTarget as HTMLFormElement;


        const formData = new FormData(e.currentTarget);

        formData.append("regioneId", geo.selectedComuneId);
        formData.append("provinciaId", geo.selectedProvinciaId);
        formData.append("comuneId", geo.selectedComuneId);
        formData.append("zonaId", geo.selectedZonaId);
        formData.append("lat", map.coords.lat.toString());
        formData.append("lng", map.coords.lng.toString());

        try {
            const uploadRes = await startUpload(media.files);
            console.log("UploadRes: ", uploadRes);

            if (!uploadRes) {
                console.log("Errore durante il caricamento delle immagini")
                setIsSubmitting(false);
                throw new Error("Errore durante il caricamento delle immagini");
            }

            const finalUrls: string[] = uploadRes.map((f) => f.ufsUrl);
            const fileKeys = uploadRes.map((f) => f.key);
            console.log("Final URLS: ", finalUrls);

            finalUrls.forEach((url) => formData.append("immagini", url));
            fileKeys.forEach((key) => formData.append("fileKeys", key));

            const response = await insertImmobile(formData);

            if (response.success) {
                setStatus({ success: true, message: "Immobile inserito con successo" })
                media.clearMedia();
                formElement.reset();
            } else {
                console.log("Errore durante il submit: ", response.message);
                throw new Error(response.message);
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Errore sconosciuto";
            setStatus({ success: false, message: errorMessage })
        } finally {
            setIsSubmitting(false);
        }
    }

    // Funzione "ponte" per aggiornare le liste quando aggiungi una nuova voce dalla modale
    const handleAdminSuccess = (newItem: Regione | Provincia | Comune | Zona, type: string) => {
        if (type === "regione") geo.setRegioni(prev => [...prev, newItem]);
        if (type === "provincia") geo.setProvince(prev => [...prev, newItem]);
        if (type === "comune") geo.setAllComuni(prev => [...prev, newItem]);
        if (type === "zona") geo.setAllZone(prev => [...prev, newItem]);
    };

    return {
        geo, admin, media, map,
        handleSubmit, handleAdminSuccess
    }
}