"use client";

import { CardImmobileType } from "@/types/card.types";
import { useState } from "react";
import Link from "next/link";
import { useImmobiliProvider } from "@/context/ImmobiliContext";

export default function Form() {
  const { aggiornaCatalogo } = useImmobiliProvider();
  const [status, setStatus] = useState<{
    message: string;
    type: "success" | "error" | null;
  }>({
    message: "",
    type: null,
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();
    setIsLoading(true);
    setStatus({ message: "", type: null });

    const formData = new FormData(e.currentTarget as HTMLFormElement);

    // Il passagio da fare se uso Vercel Blob
    // const response = await uploadToVercelAction(formData)

    try {
      const nomeImmobile = formData.get("nome") as string;
      const prezzo = Number(formData.get("prezzo"));
      const indirizzo = formData.get("indirizzo") as string;
      const metratura = Number(formData.get("metratura"));
      const numeroBagni = Number(formData.get("numero-bagni"));
      const numeroLocali = Number(formData.get("numero-locali"));
      const descrizione = formData.get("descrizione") as string;
      const files = formData.getAll("foto") as File[];

      // Controlli
      if (!nomeImmobile) throw new Error("Nome dell'immoble non valido");
      if (prezzo <= 0) throw new Error("Il prezzo non è valido");
      if (!indirizzo) throw new Error("Indirizzo non valido");
      if (metratura <= 0) throw new Error("Metratura non valida");
      if (numeroBagni <= 0) throw new Error("Numero dei bagni non valido");
      if (numeroLocali <= 0) throw new Error("Numero dei locali non valido");
      if (!descrizione) throw new Error("Descrizione non valida");
      if (!files || files.length <= 0)
        throw new Error("Devi inserire almeno 1 immagine");
      // Fine controlli

      const fotoUrls = files.map((f) => URL.createObjectURL(f));

      const datiImmobile: CardImmobileType = {
        id: crypto.randomUUID(),
        nomeImmobile: formData.get("nome") as string,
        prezzo: Number(formData.get("prezzo")),
        indirizzo: formData.get("indirizzo") as string,
        metratura: Number(formData.get("metratura")),
        numeroBagni: Number(formData.get("numero-bagni")),
        numeroLocali: Number(formData.get("numero-locali")),
        descrizione: formData.get("descrizione") as string,
        imagePaths: fotoUrls,
      };

      setStatus({ message: "Immobile caricato con successo", type: "success" });
      aggiornaCatalogo(datiImmobile);
      console.log("Dati dell'immobile caricati: ", datiImmobile);
      (e.currentTarget as HTMLFormElement).reset();

      setTimeout(() => {
        setStatus({ message: "", type: null });
      }, 4000);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Errore durante il caricamento dell'immobile. Riprova";

      setStatus({
        message: errorMessage,
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="flex items-center justify-center py-80">
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
            <label htmlFor="foto" className="ps-2 text-balck">
              Foto Immobile
            </label>
            <input
              required
              type="file"
              // {...{ webkitdirectory: "", directory: "" }}
              multiple
              // accept="image/*"
              name="foto"
              id="foto"
              className="border-2 border-black rounded-xl file:border-e-2 file:border-e-black file:p-2 file:me-4 hover:file:cursor-pointer file:bg-gray-200"
            />
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
            {status.type && (
              <p
                className={`px-2 py-3 border-2 rounded-md text-center text-white ${status.type === "success" ? "border-green-700 bg-green-300" : "border-red-600 bg-red-400"} `}
              >
                {status.message}
              </p>
            )}
          </div>
        </div>
      </form>
    </section>
  );
}
