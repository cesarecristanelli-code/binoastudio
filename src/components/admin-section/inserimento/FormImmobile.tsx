"use client";

import Link from "next/link";
import Modale from "./sections/Modale";
import useInserimentoHooks from "./useInserimentoHooks";
import DatiBaseSection from "./sections/DatiBaseSection";
import GeoSection from "./sections/GeoSection";
import OpzioniComfortSection from "./sections/OpzioniComfortSection";
import StatoCertificazioniSection from "./sections/StatoCerificazioniSection";
import ImageSection from "./sections/ImageSection";
import MapSection from "./sections/MapSection";
import { ImmobileFullForm } from "@/types/inserimentoHooks.types";

export default function FormImmobile({
  initialData,
}: {
  initialData?: ImmobileFullForm;
}) {
  const isEditMode = !!initialData;

  const {
    geo,
    admin,
    media,
    map,
    status,
    isSubmitting,
    form,
    handleSubmit,
    handleAdminSuccess,
    updateField,
  } = useInserimentoHooks(initialData);

  const verifyAddress = async () => {
    const newAddress = await map.handleVerifyAddress(
      map.address,
      geo.selectedComuneId,
    );

    if (newAddress) {
      updateField("indirizzo", map.address);
      updateField("lat", newAddress.lat);
      updateField("lng", newAddress.lng);
    }
  };

  return (
    <>
      <Modale admin={admin} onSuccess={handleAdminSuccess} />
      <form onSubmit={handleSubmit} className="max-w-5xl mx-auto my-10 px-4">
        {/* HEADER */}
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-3xl font-black uppercase tracking-tighter">
              {isEditMode
                ? `Modifica: ${initialData.nome}`
                : "Nuovo Immobile"}{" "}
            </h1>
            <p className="text-gray-500">
              {isEditMode
                ? "Aggiorna i dettagli dell'annuncio"
                : "Riempi i campi per pubblicare l'annuncio"}
            </p>
          </div>
          <Link
            href="/vendita"
            className="text-sm font-bold underline hover:text-blue-600"
          >
            Torna al catalogo
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* COLONNA SINISTRA: Dati Principali (2/3 dello spazio) */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            <DatiBaseSection formData={form} updateField={updateField} />

            <GeoSection geo={geo} admin={admin} updateField={updateField} />
            {/* Nota: GeoSection dovrebbe contenere al suo interno la logica dell'indirizzo e la mappa */}
            <MapSection map={map} geo={geo} onVerify={verifyAddress} />

            <OpzioniComfortSection formData={form} updateField={updateField} />

            <StatoCertificazioniSection
              formData={form}
              updateField={updateField}
            />

            {/* DESCRIZIONE (Componente dedicato o Field Textarea) */}
            <div className="p-6 bg-white border-2 border-black rounded-2xl shadow-sm">
              <h2 className="text-xl font-bold border-b-2 border-black pb-2 mb-4">
                Descrizione Annuncio
              </h2>
              <textarea
                required
                name="descrizione"
                value={form?.descrizione ?? ""}
                onChange={(e) => updateField("descrizione", e.target.value)}
                rows={6}
                className="w-full p-4 border-2 border-black rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Racconta i punti di forza dell'immobile..."
              />
            </div>
          </div>

          {/* COLONNA DESTRA: Media & Azioni (1/3 dello spazio) */}
          <div className="flex flex-col gap-8">
            {/* SEZIONE IMMAGINI - Sempre visibile durante lo scroll */}
            <div className="sticky top-6 flex flex-col gap-6">
              <ImageSection media={media} />

              {/* BOX AZIONE (SUBMIT) */}
              <div className="p-6 bg-black text-white rounded-2xl shadow-xl">
                <p className="text-xs uppercase font-bold text-gray-400 mb-4 text-center">
                  Finalizza Inserimento
                </p>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-white text-black border-2 border-white rounded-xl font-black uppercase hover:bg-gray-200 transition-colors disabled:bg-gray-700"
                >
                  {isSubmitting ? "Caricamento..." : "Pubblica Ora"}
                </button>

                {status.message && (
                  <p
                    className={`mt-4 p-3 rounded-lg text-sm text-center font-bold ${
                      status.success
                        ? "bg-green-500 text-black"
                        : "bg-red-500 text-white"
                    }`}
                  >
                    {status.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
