"use client";

import { useCallback, useState } from "react";
import { insertImmobile } from "@/actions/immobiliActions";
import Link from "next/link";
import { useUploadThing } from "@/lib/uploadthing";
import dynamic from "next/dynamic";
import Modale from "./Modale";
import { useInserimentoLogic } from "./useInserimentoLogic";
import ImageSection from "./ImageSection";
import GeoSection from "./GeoSection";
import { getProvinciaByComune } from "@/actions/geoActions";

const MapPicker = dynamic(
  () => import("@/components/admin-section/inserimento/MapPicker"),
  {
    ssr: false,
    loading: () => (
      <div className="h-100 w-full bg-slate-100 rounded-xl animate-pulse flex items-center justify-center text-slate-400">
        Caricamento mappa in corso...
      </div>
    ),
  },
);

export default function FormInserimento() {
  const logic = useInserimentoLogic();
  const { startUpload } = useUploadThing("imageUploader");

  // =============================== GEOLOCATION ======================================

  //Stati per la gestione della mappa
  const [coords, setCoords] = useState<{ lat: number; lng: number }>({
    lat: 45.438,
    lng: 10.993,
  });
  const [isGeocoding, setIsGeocoding] = useState<boolean>(false);

  // Funzioni per la gestione della mapppa e dell'indirizzo
  const handleVerifyAddress = async () => {
    const form = document.querySelector("form") as HTMLFormElement;
    const formData = new FormData(form);

    const indirizzo = formData.get("indirizzo") as string;

    if (!indirizzo || indirizzo.length < 3) return;

    setIsGeocoding(true);

    try {
      const comuneConProvincia = await getProvinciaByComune(
        logic.selectedComuneId,
      );
      if (!comuneConProvincia.success) {
        alert("Errore nella ricerca della provincia");
        return;
      }

      const query = `${indirizzo}, ${comuneConProvincia.data.cap}, ${comuneConProvincia.data.nome}, ${comuneConProvincia.data.provincia.sigla}`;
      const res = await fetch(`/api/geocoding?q=${encodeURIComponent(query)}`);
      const result = await res.json();

      if (result.success) {
        setCoords({
          lat: result.data.lat,
          lng: result.data.lng,
        });
      } else {
        alert(
          "Indirizzo non trovato. Verifica che sia corretto e completo (es: Via Roma 1, Verona)",
        );
      }
    } finally {
      setIsGeocoding(false);
    }
  };

  const handleMapChange = useCallback((lat: number, lng: number) => {
    setCoords({ lat, lng });
  }, []);

  // ========================================= SUBMIT HANDLING ==================================================
  async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();
    const formElement = e.currentTarget as HTMLFormElement;

    const { files, setStatus, setIsLoading, setFiles, setPreviews } = logic;

    if (files.length === 0) {
      setStatus({ success: false, message: "Devi inserire almeno una foto" });
      return;
    }

    setIsLoading(true);
    setStatus({ success: null, message: "" });

    try {
      const uploadRes = await startUpload(files);
      console.log("UploadRes: ", uploadRes);

      if (!uploadRes) {
        setStatus({
          success: false,
          message: "Errore durante l'upload delle immagini",
        });
        setIsLoading(false);
        return;
      }

      const finalUrls: string[] = uploadRes.map((f) => f.ufsUrl);
      console.log("Final URLS: ", finalUrls);

      const formData = new FormData(formElement);
      finalUrls.forEach((url) => formData.append("foto", url));

      console.log("Form: ", Object.fromEntries(formData.entries()));

      const response = await insertImmobile(formData);

      console.log("Risposta dal DB: ", response);

      setStatus(response);

      if (response.success) {
        setFiles([]);
        setPreviews([]);
        formElement.reset();

        setTimeout(() => setStatus({ success: null, message: "" }), 10000);
      }
    } catch (error) {
      const errorMessage: string =
        error instanceof Error ? error.message : "Si è verificato un problema";

      setStatus({ success: false, message: errorMessage });
    } finally {
      setIsLoading(false);
    }
  }

  //per submit
  const { status, isLoading } = logic;

  // per modale
  const {
    modalConfig,
    newData,
    allComuni,
    setModalConfig,
    setNewData,
    handleSaveNewItem,
  } = logic;

  // per immagini
  const { previews, handleFileChange, removeImage } = logic;

  return (
    <>
      <Modale
        config={modalConfig}
        data={newData}
        setConfig={setModalConfig}
        setData={setNewData}
        handleSave={handleSaveNewItem}
      />
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col max-w-md md:max-w-3xl gap-6 p-5 border-2 border-black rounded-xl shadow-md">
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

          <div className="flex flex-col md:flex-row gap-5">
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

          <GeoSection logic={logic} />

          {/* INDIRIZZO */}
          <input type="hidden" name="lat" value={coords.lat} />
          <input type="hidden" name="lng" value={coords.lng} />
          <div className="flex flex-col gap-2">
            <label htmlFor="indirizzo" className="ps-2 text-black">
              Indirizzo
            </label>
            <div className="flex gap-2">
              <input
                required
                type="text"
                name="indirizzo"
                id="indirizzo"
                disabled={allComuni.length === 0}
                className="grow py-2 px-3 bg-white border-2 border-black rounded-xl disabled:bg-gray-100 disabled:border-gray-300 disabled:text-gray-400"
                placeholder="Via Roma 10"
              />
              <button
                type="button"
                onClick={handleVerifyAddress}
                disabled={isGeocoding || allComuni.length === 0}
                className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
              >
                {isGeocoding ? "..." : "Verifica"}
              </button>
            </div>
          </div>

          {/* Mappa */}
          <div className="mt-4">
            <MapPicker
              lat={coords.lat}
              lng={coords.lng}
              onChange={handleMapChange}
            />
            <p className="text-[10px] text-gray-500 mt-1 italic">
              Coordinate attuali: {coords.lat.toFixed(5)},{" "}
              {coords.lng.toFixed(5)}
            </p>
          </div>
          {/* Metratura | Numero Bagni | Numero Locali */}
          <div className="flex flex-col md:flex-row justify-around">
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
              <label htmlFor="numeroBagni" className="ps-2 text-black">
                Numero Bagni
              </label>

              <input
                required
                type="number"
                name="numeroBagni"
                id="numeroBagni"
                className="w-30 py-2 px-3 bg-white border-2 border-black rounded-xl"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="numeroLocali" className="ps-2 text-black">
                Numero Locali
              </label>

              <input
                required
                type="number"
                name="numeroLocali"
                id="numeroLocali"
                className="w-30 py-2 px-3 bg-white border-2 border-black rounded-xl"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="numeroBalconi" className="ps-2 text-black">
                Numero Balconi
              </label>

              <input
                type="number"
                name="numeroBalconi"
                id="numeroBalconi"
                className="w-30 py-2 px-3 bg-white border-2 border-black rounded-xl"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="numeroTerrazzi" className="ps-2 text-black">
                Numero Terrazzi
              </label>

              <input
                type="number"
                name="numeroTerrazzi"
                id="numeroTerrazzi"
                className="w-30 py-2 px-3 bg-white border-2 border-black rounded-xl"
              />
            </div>
          </div>
          {/* Piano, Piani Condominio, Box Auto */}
          <div className="flex flex-col md:flex-row justify-around">
            <div className="flex flex-col gap-2">
              <label htmlFor="piano" className="ps-2 text-black">
                Piano
              </label>
              <input
                type="text"
                name="piano"
                id="piano"
                className="w-30 py-2 px-3 bg-white border-2 border-black rounded-xl"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="totalePiani" className="ps-2 text-black">
                Piani Condominio
              </label>

              <input
                type="number"
                name="totalePiani"
                id="totalePiani"
                className="w-30 py-2 px-3 bg-white border-2 border-black rounded-xl"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="boxAuto" className="ps-2 text-black">
                Box Auto
              </label>

              <input
                required
                type="number"
                name="boxAuto"
                id="boxAuto"
                className="w-30 py-2 px-3 bg-white border-2 border-black rounded-xl"
              />
            </div>
          </div>
          {/* Ascensore, Giardino, Arredo */}
          <div className="flex flex-col md:flex-row justify-around">
            <div>
              <input type="checkbox" name="ascensore" id="ascensore" />
              <label htmlFor="ascensore" className="ps-2 text-black">
                Ascensore
              </label>
            </div>

            <div>
              <input
                type="checkbox"
                name="giardino"
                id="giardino"
                className="w-5"
              />
              <label htmlFor="giardino" className=" text-black">
                Giardino
              </label>
            </div>
            <div>
              <input
                type="checkbox"
                name="arredo"
                id="arredo"
                className="w-5"
              />
              <label htmlFor="arredo" className=" text-black">
                Arredo
              </label>
            </div>
          </div>
          {/* Stato, Classe Energetica, Spese condominiali */}
          <div className="flex flex-col md:flex-row justify-around">
            <div className="flex flex-col gap-2">
              <label htmlFor="stato" className="ps-2 text-black">
                Stato
              </label>

              <select
                required
                name="stato"
                id="stato"
                className="w-40 py-2 px-3 bg-white border-2 border-black rounded-xl"
              >
                <option className="uppercase" value="BUONO">
                  buono
                </option>
                <option className="uppercase" value="NUOVO">
                  nuovo
                </option>
                <option className="uppercase" value="RISTRUTTURATO">
                  ristrutturato
                </option>
                <option className="uppercase" value="DA_RISTRUTTURARE">
                  da ristrutturare
                </option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="classeEnergia" className="ps-2 text-black">
                Classe Energetica
              </label>

              <select
                required
                name="classeEnergia"
                id="classeEnergia"
                className="w-30 py-2 px-3 bg-white border-2 border-black rounded-xl"
              >
                <option className="uppercase" value="A4">
                  A4
                </option>
                <option className="uppercase" value="A3">
                  A3
                </option>
                <option className="uppercase" value="A2">
                  A2
                </option>
                <option className="uppercase" value="A1">
                  A1
                </option>
                <option className="uppercase" value="B">
                  B
                </option>
                <option className="uppercase" value="C">
                  C
                </option>
                <option className="uppercase" value="D">
                  D
                </option>
                <option className="uppercase" value="E">
                  E
                </option>
                <option className="uppercase" value="F">
                  F
                </option>
                <option className="uppercase" value="G">
                  G
                </option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="speseCondominiali" className="ps-2 text-black">
                Spese Condominiali
              </label>

              <input
                type="number"
                name="speseCondominiali"
                id="speseCondominiali"
                className="w-30 py-2 px-3 bg-white border-2 border-black rounded-xl"
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-5 md:gap-20 justify-center">
            <div className="flex flex-col gap-2">
              <label htmlFor="contratto" className="ps-2 text-black">
                Tipologia di contratto
              </label>

              <select
                required
                name="contratto"
                id="contratto"
                className="w-52 py-2 px-3 bg-white border-2 border-black rounded-xl"
              >
                <option value="VEDNITA" className="uppercase">
                  vendita
                </option>
                <option value="AFFITTO" className="uppercase">
                  affitto
                </option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="tipo" className="ps-2 text-black">
                Tipo di immobile
              </label>

              <select
                required
                name="tipo"
                id="tipo"
                className="w-52 py-2 px-3 bg-white border-2 border-black rounded-xl"
              >
                <option value="APPARTAMENTO" className="uppercase">
                  appartamento
                </option>
                <option value="VILLA" className="uppercase">
                  villa
                </option>
                <option value="LOFT" className="uppercase">
                  loft
                </option>
                <option value="UFFICIO" className="uppercase">
                  ufficio
                </option>
                <option value="COMMERCIALE" className="uppercase">
                  commerciale
                </option>
              </select>
            </div>
          </div>
          {/* Immagini Immobile */}
          <div className="w-full flex flex-col">
            <ImageSection
              previews={previews}
              onChange={handleFileChange}
              onRemove={removeImage}
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
              className="w-sm md:w-2xl min-h-32 py-2 px-3 bg-white border-2 border-black rounded-xl text-sm"
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
    </>
  );
}
