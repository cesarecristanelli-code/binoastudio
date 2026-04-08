"use client";

import { useState } from "react";
import Link from "next/link";

import generateImmobile from "@/actions/immobili";

export default function Form() {
  const [status, setStatus] = useState<{
    success: boolean | null;
    message: string;
  }>({
    success: null,
    message: "",
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();
    setIsLoading(true);
    setStatus({ success: null, message: "" });

    const formData = new FormData(e.currentTarget as HTMLFormElement);

    // Il passagio da fare se uso Vercel Blob
    // const response = await uploadToVercelAction(formData)

    try {
      const response = await generateImmobile(formData);

      if (response.success) {
        setStatus(response);
        (e.currentTarget as HTMLFormElement).reset();

        setTimeout(() => setStatus({ success: null, message: "" }));
      } else {
        throw new Error(response.message || "Errore durante il salvataggio");
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
    </section>
  );
}
