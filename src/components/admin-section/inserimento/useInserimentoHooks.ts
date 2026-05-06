import useGeoData from "./hooks/useGeoData";
import useGeoAdmin from "./hooks/useGeoAdmin";
import useMediaManager from "./hooks/useMediaManager";
import useGeolocation from "./hooks/useGeolocation";
import { useEffect, useState } from "react";
import { useUploadThing } from "@/lib/uploadthing";
import { deleteImmobile, insertImmobile, updateImmobile } from "@/actions/immobiliActions";
import { Regione, Provincia, Comune, Zona } from "@/generated/prisma/client";
import { ImmobileFullForm } from "@/types/inserimentoHooks.types";
import { useRouter } from "next/navigation";

export default function useInserimentoHooks(initialData?: ImmobileFullForm) {
    const { startUpload } = useUploadThing("imageUploader");
    const router = useRouter();

    const [status, setStatus] = useState<{ success: boolean | null, message: string }>({
        success: null,
        message: ""
    })
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);


    const [form, setForm] = useState<Partial<ImmobileFullForm>>(
        initialData ?? {}
    )

    useEffect(() => {
        if (initialData) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setForm(initialData);
        }
    }, [initialData])

    const updateField = <K extends keyof ImmobileFullForm>(
        name: K,
        value: ImmobileFullForm[K]
    ) => {
        setForm((prev) => ({ ...prev, [name]: value }))
    }

    const geo = useGeoData({
        comuneId: form.comuneId,
        zonaId: form.zonaId
    });
    const admin = useGeoAdmin();
    const media = useMediaManager();
    const map = useGeolocation({
        lat: form.lat,
        lng: form.lng,
        address: form.indirizzo
    });

    useEffect(() => {
        if (initialData?.immagini) {
            const urls = initialData.immagini.map(img => img.url);
            media.setOldImages(urls)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initialData])



    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        const formElement = e.currentTarget as HTMLFormElement;
        const formData = new FormData(e.currentTarget);
        const isUpdate = !!initialData?.id;

        formData.append("regioneId", geo.selectedRegioneId);
        formData.append("provinciaId", geo.selectedProvinciaId);
        formData.append("comuneId", geo.selectedComuneId);
        formData.append("zonaId", geo.selectedZonaId);
        formData.append("lat", map.coords.lat.toString());
        formData.append("lng", map.coords.lng.toString());

        try {

            if (isUpdate) {
                media.oldImages.forEach((url) => formData.append("oldImmagini", url))
            }

            if (media.files.length > 0) {
                const uploadRes = await startUpload(media.files);
                console.log("UploadRes: ", uploadRes);

                if (!uploadRes) {
                    console.log("Errore durante il caricamento delle immagini")
                    throw new Error("Errore durante il caricamento delle immagini");
                }

                const finalUrls: string[] = uploadRes.map((f) => f.ufsUrl);
                const fileKeys = uploadRes.map((f) => f.key);
                console.log("Final URLS: ", finalUrls);

                finalUrls.forEach((url) => formData.append("immagini", url));
                fileKeys.forEach((key) => formData.append("fileKeys", key));
            }

            const response = isUpdate
                ? await updateImmobile(initialData!.id, formData)
                : await insertImmobile(formData)

            if (response.success) {
                const msg = isUpdate ? "Immobile aggiornato!" : "Immobile inserito!";
                setStatus({ success: true, message: `${msg} \n Reindirizzamento...` })
                media.clearMedia();

                if (!isUpdate) {
                    formElement.reset();
                    setForm({});
                }

                setTimeout(() => {
                    router.push("/vendita");
                    router.refresh();
                }, 2000)
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

    const [isDeleting, setIsDeleting] = useState<boolean>(false);
    // Funzione per cancellare l'immobile
    const handleDelete = async (id: string) => {
        if (!confirm("Sei sicuro di voler eliminare questo immobile? L'azione è irreversibile.")) return

        setIsDeleting(true);
        const res = await deleteImmobile(id);

        if (res.success) {
            alert(res.message);
        } else {
            alert("Errore: " + res.message)
        }

        setIsDeleting(false)
    };

    return {
        geo, admin, media, map,
        status, setStatus,
        isSubmitting, setIsSubmitting,
        isDeleting, setIsDeleting,
        form, setForm,
        updateField, handleSubmit, handleAdminSuccess, handleDelete
    }
}