"use client";

import { useState } from "react";
import { useUploadThing } from "@/lib/uploadthing";
import { createNewMagazineEmail } from "@/actions/magazine";

export function FormMagazine() {
  const [titolo, setTitolo] = useState("");
  const [numero, setNumero] = useState<number | "">("");

  // File selezionato localmente dall'utente (non ancora caricato)
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  // Hook UploadThing per eseguire l'upload al submit
  const { startUpload, isUploading } = useUploadThing("pdfUploader");

  // Salva il file localmente al cambio dell'input
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      setStatus({
        type: "error",
        message: "Il file selezionato deve essere un PDF.",
      });
      return;
    }

    setStatus(null);
    setSelectedFile(file); // Mantiene il file in memoria senza effettuare l'upload subito
  };

  // Rimuove il file selezionato
  const handleRemoveFile = () => {
    setSelectedFile(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!titolo.trim() || numero === "" || !selectedFile) {
      setStatus({
        type: "error",
        message: "Compila tutti i campi e seleziona un file PDF!",
      });
      return;
    }

    setIsSubmitting(true);
    setStatus(null);

    try {
      // 1. Effettua l'upload su UploadThing al momento del submit
      const uploadRes = await startUpload([selectedFile]);

      if (!uploadRes || uploadRes.length === 0) {
        throw new Error(
          "Errore durante il caricamento del file PDF su UploadThing.",
        );
      }

      // Estrae l'URL finale restituito da UploadThing
      const uploadedPdfUrl = uploadRes[0].ufsUrl || uploadRes[0].url;

      // 2. Salva nel DB e invia le email
      const res = await createNewMagazineEmail({
        titolo: titolo.trim(),
        numero: Number(numero),
        pdfUrl: uploadedPdfUrl,
      });

      if (res.success) {
        setStatus({
          type: "success",
          message: res.message || "Magazine pubblicato e newsletter inviata!",
        });

        // Reset del form
        setTitolo("");
        setNumero("");
        setSelectedFile(null);
      } else {
        setStatus({
          type: "error",
          message:
            res.message || "Si è verificato un errore durante il salvataggio.",
        });
      }
    } catch (error) {
      console.error(error);
      setStatus({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Errore durante la pubblicazione del magazine.",
      });
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setStatus(null), 2000);
    }
  };

  const isLoading = isSubmitting || isUploading;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Alert Stato */}
      {status && (
        <div
          className={`p-4 rounded-xl text-sm font-medium ${
            status.type === "success"
              ? "bg-emerald-50 text-emerald-900 border border-emerald-200"
              : "bg-red-50 text-red-900 border border-red-200"
          }`}
        >
          {status.message}
        </div>
      )}

      {/* Inputs Testuali */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#3C3833] mb-2">
            Numero Issue *
          </label>
          <input
            type="number"
            min="1"
            placeholder="Es. 1"
            value={numero}
            onChange={(e) =>
              setNumero(e.target.value === "" ? "" : Number(e.target.value))
            }
            disabled={isLoading}
            required
            className="w-full px-4 py-3 bg-[#F5F4F0] border border-[#EAE8E3] rounded-xl text-[#3C3833] focus:outline-none focus:ring-2 focus:ring-[#3C3833] disabled:opacity-50"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#3C3833] mb-2">
            Titolo del Numero *
          </label>
          <input
            type="text"
            placeholder="Es. Dialoghi d'Architettura"
            value={titolo}
            onChange={(e) => setTitolo(e.target.value)}
            disabled={isLoading}
            required
            className="w-full px-4 py-3 bg-[#F5F4F0] border border-[#EAE8E3] rounded-xl text-[#3C3833] focus:outline-none focus:ring-2 focus:ring-[#3C3833] disabled:opacity-50"
          />
        </div>
      </div>

      {/* Input File PDF */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-[#3C3833] mb-2">
          File PDF *
        </label>

        {selectedFile ? (
          <div className="flex items-center justify-between p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
            <span className="text-sm font-medium text-emerald-900 truncate">
              📄 {selectedFile.name}
            </span>
            <button
              type="button"
              onClick={handleRemoveFile}
              disabled={isLoading}
              className="text-xs font-semibold text-red-600 hover:underline disabled:opacity-50"
            >
              Rimuovi file
            </button>
          </div>
        ) : (
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            disabled={isLoading}
            className="w-full text-sm text-[#3C3833] file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:uppercase file:tracking-wider file:bg-[#3C3833] file:text-white hover:file:bg-black file:cursor-pointer bg-[#F5F4F0] p-2 rounded-xl border border-[#EAE8E3]"
          />
        )}
      </div>

      {/* Botton Invia */}
      <button
        type="submit"
        disabled={isLoading || !selectedFile || numero === "" || !titolo.trim()}
        className="w-full py-4 bg-[#3C3833] hover:bg-black text-white font-semibold uppercase tracking-wider rounded-xl transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <span>
            {isUploading
              ? "Caricamento PDF su UploadThing..."
              : "Pubblicazione e invio email..."}
          </span>
        ) : (
          <span>Pubblica e Invia Email</span>
        )}
      </button>
    </form>
  );
}
