import { useCallback, useState } from "react";


export default function useMediaManager() {
    // Stato per i file reali da inviare a Uploadthing
    const [files, setFiles] = useState<File[]>([]);
    // Stato per le preview delle immagini
    const [previews, setPreviews] = useState<string[]>([]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            // Creo un'array dei file effettivi
            const selectedFiles = Array.from(e.target.files);

            // Aggiorno la lista dei file da inviare a Uploadthing
            setFiles((prev) => [...prev, ...selectedFiles]);

            // Creo un'array di URL temporanei dei file
            const newPreviews = selectedFiles.map((f) =>
                URL.createObjectURL(f)
            );

            // Aggiorno la lista delle previews
            setPreviews((prev) => [...prev, ...newPreviews]);
        }

        // Reset del contenuto del file input per permettere di aggiungere più volte lo stesso file se rimosso
        e.target.value = "";
    }

    const removeFile = useCallback((index: number) => {
        setPreviews((prev) => {
            const newPreviews = [...prev];
            URL.revokeObjectURL(newPreviews[index]);
            return newPreviews.filter((_, i) => i !== index)
        })
    }, [])

    const clearMedia = useCallback(() => {
        previews.forEach((p) => URL.revokeObjectURL(p));
        setPreviews([]);
        setFiles([]);
    }, [previews]);

    return {
        files, setFiles,
        previews, setPreviews,
        handleFileChange, removeFile, clearMedia
    }

}