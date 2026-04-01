"use client";

import { CardImmobileType } from "@/types/card.types";

interface FormProps {
  onUpload: (immobile: CardImmobileType) => void;
}

export default function Form({ onUpload }: FormProps) {
  async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget as HTMLFormElement);

    // Il passagio da fare se uso Vercel Blob
    // const response = await uploadToVercelAction(formData)

    const files = formData.getAll("foto") as File[];
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

    onUpload(datiImmobile);

    (e.currentTarget as HTMLFormElement).reset();

    console.log("Dati pronti per essere inviati al DB: ", datiImmobile);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col max-w-lg gap-4 p-5 border-2 border-black rounded-xl shadow-md">
        {/* Nome Immobile */}
        <div className="flex flex-col gap-2">
          <label htmlFor="nome" className="ps-2 text-black">
            Nome Immobile
          </label>
          <input
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
        {/* Indirizzo */}
        <div className="flex flex-col gap-2">
          <label htmlFor="indirizzo" className="ps-2 text-black">
            Indirizzo
          </label>
          <input
            type="text"
            name="indirizzo"
            id="indirizzo"
            className="w-sm py-2 px-3 bg-white border-2 border-black rounded-xl placeholder:italic"
            placeholder="via Pompei 2 - Legnago, VR"
          />
        </div>
        {/* Metratura | Numero Bagni | Numero Locali */}
        <div className="flex flex-row gap-3">
          <div className="flex flex-col gap-2">
            <label htmlFor="metratura" className="ps-2 text-black">
              Metratura
            </label>
            <div className="flex">
              <input
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
            type="file"
            {...{ webkitdirectory: "", directory: "" }}
            multiple
            accept="image/*"
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
            name="descrizione"
            id="descrizione"
            className="w-sm min-h-32 py-2 px-3 bg-white border-2 border-black rounded-xl text-sm"
          />
        </div>
        {/* Submit */}
        <div className="w-full flex justify-center mt-2">
          <button
            type="submit"
            className="px-2 py-3 border-2 border-black cursor-pointer rounded-2xl font-semibold"
          >
            Carica
          </button>
        </div>
      </div>
    </form>
  );
}
