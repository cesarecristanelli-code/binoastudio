"use client";

import { useState } from "react";
import { insertImmobile } from "@/actions/immobiliActions";
import Link from "next/link";
import { useUploadThing } from "@/lib/uploadthing";

export default function FormInserimento() {
  const [status, setStatus] = useState<{
    success: boolean | null;
    message: string;
  }>({
    success: null,
    message: "",
  });
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { startUpload } = useUploadThing("imageUploader");

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
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();

    if (files.length === 0) {
      setStatus({ success: false, message: "Devi inserire almeno una foto" });
      return;
    }

    setIsLoading(true);
    setStatus({ success: null, message: "" });

    try {
      const uploadRes = await startUpload(files);

      if (!uploadRes) {
        setStatus({
          success: false,
          message: "Errore durante l'upload delle immagini",
        });
        setIsLoading(false);
        return;
      }

      const finalUrls: string[] = uploadRes.map((f) => f.ufsUrl);

      const formData = new FormData(e.currentTarget as HTMLFormElement);
      finalUrls.forEach((url) => formData.append("foto", url));

      const response = await insertImmobile(formData);

      setStatus(response);

      if (response.success) {
        setFiles([]);
        setPreviews([]);
        (e.currentTarget as HTMLFormElement).reset();

        setTimeout(() => setStatus({ success: null, message: "" }), 5000);
      }
    } catch (error) {
      const errorMessage: string =
        error instanceof Error ? error.message : "Si è verificato un problema";

      setStatus({ success: false, message: errorMessage });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col max-w-3xl gap-4 p-5 border-2 border-black rounded-xl shadow-md">
        <div className="flex justify-center">
          <h2 className="text-center text-xl font-bold grow">
            Inserisci i dati dell&apos;Immobile
          </h2>
          <Link
            href="/vendita"
            className="underline hover:text-blue-500 cursor-pointer"
          >
            Vai al catalgo
          </Link>
        </div>

        <div className="flex gap-5">
          {/* Nome Immobile */}
          <div className="flex flex-col gap-2">
            <label htmlFor="nome" className="ps-2 text-black">
              Nome Immobile
            </label>
            <input
              required
              type="text"
              name="nome"
              id="nome"
              className="w-sm py-2 px-3 bg-white border-2 border-black rounded-xl"
            />
          </div>
          {/* Prezzo */}
          <div className="flex flex-col gap-2">
            <label htmlFor="prezzo" className="ps-2 text-black">
              Prezzo
            </label>
            <div className="flex flex-row">
              <input
                required
                type="number"
                name="prezzo"
                id="prezzo"
                className="w-52 py-2 px-3 bg-white border-2 border-black rounded-s-xl"
              />
              <span className="w-10 text-center py-2 px-3 bg-gray-200 border-2 border-black border-s-transparent rounded-e-xl">
                €
              </span>
            </div>
          </div>
        </div>

        {/* Indirizzo */}
        <div className="flex flex-col gap-2">
          <label htmlFor="indirizzo" className="ps-2 text-black">
            Indirizzo
          </label>
          <input
            required
            type="text"
            name="indirizzo"
            id="indirizzo"
            className="w-sm py-2 px-3 bg-white border-2 border-black rounded-xl placeholder:italic"
            placeholder="via Pompei 2 - Legnago, VR"
          />
        </div>
        {/* Metratura | Numero Bagni | Numero Locali */}
        <div className="flex flex-row justify-around">
          <div className="flex flex-col gap-2">
            <label htmlFor="metratura" className="ps-2 text-black">
              Metratura
            </label>
            <div className="flex">
              <input
                required
                type="number"
                name="metratura"
                id="metratura"
                className="w-20 py-2 px-3 bg-white border-2 border-black rounded-s-xl"
              />
              <span className="w-10 text-center py-2 px-3 bg-gray-200 border-2 border-black border-s-transparent rounded-e-xl">
                m&sup2;
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="numero-bagni" className="ps-2 text-black">
              Numero Bagni
            </label>

            <input
              required
              type="number"
              name="numero-bagni"
              id="numero-bagni"
              className="w-30 py-2 px-3 bg-white border-2 border-black rounded-xl"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="numero-locali" className="ps-2 text-black">
              Numero Locali
            </label>

            <input
              required
              type="number"
              name="numero-locali"
              id="numero-locali"
              className="w-30 py-2 px-3 bg-white border-2 border-black rounded-xl"
            />
          </div>
        </div>
        {/* Foto Immobile */}
        <div className="flex flex-col gap-2">
          <label className="ps-2 text-black font-bold">Foto Immobile</label>

          <div className="border-2 border-dashed border-gray-400 p-6 rounded-xl text-center">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer text-blue-600 underline"
            >
              Clicca qui per selezionare le foto
            </label>
            <p className="text-xs text-gray-500 mt-1">
              Verranno caricate solo al momento del salvataggio
            </p>
          </div>
          {/* Anteprima Locale */}
          <div className="flex flex-wrap gap-2 mt-2">
            {previews.map((url, index) => (
              <div key={index} className="relative group">
                <img
                  src={url}
                  alt="preview"
                  className="w-24 h-24 object-cover rounded-lg border"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs shadow-lg"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
        {/* Descrizione */}
        <div className="flex flex-col gap-2">
          <label htmlFor="descrizione" className="ps-2 text-black">
            Descrizione
          </label>
          <textarea
            required
            name="descrizione"
            id="descrizione"
            className="w-2xl min-h-32 py-2 px-3 bg-white border-2 border-black rounded-xl text-sm"
          />
        </div>
        {/* Submit */}
        <div className="w-full flex flex-col gap-3 justify-center mt-2">
          <button
            type="submit"
            disabled={isLoading}
            className={`px-2 py-3 border-2 border-black ${isLoading ? "" : "cursor-pointer"} rounded-2xl font-semibold `}
          >
            {isLoading ? "Caricamento..." : "Carica Immobile"}
          </button>
          {status.success && (
            <p
              className={`px-2 py-3 border-2 rounded-md text-center text-white ${status.success === true ? "border-green-700 bg-green-300" : "border-red-600 bg-red-400"} `}
            >
              {status.message}
            </p>
          )}
        </div>
      </div>
    </form>
  );
}
