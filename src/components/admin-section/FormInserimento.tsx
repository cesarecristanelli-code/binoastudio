"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { insertImmobile } from "@/actions/immobiliActions";
import Link from "next/link";
import { useUploadThing } from "@/lib/uploadthing";
import Image from "next/image";
import dynamic from "next/dynamic";
import {
  ComuneSubset,
  getComuneByProvincia,
  getProvinceByRegione,
  getRegioni,
  getZonaByComune,
  insertComune,
  insertProvincia,
  insertRegione,
  insertZona,
  ProvinciaSubset,
  ZonaSubset,
} from "@/actions/geoActions";
import { Result } from "@/types/actions.types";
import { Regione, Provincia, Comune, Zona } from "@/generated/prisma/client";
import Modale from "./Modale";

const MapPicker = dynamic(
  () => import("@/components/admin-section/MapPicker"),
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
  const [status, setStatus] = useState<{
    success: boolean | null;
    message: string;
  }>({
    success: null,
    message: "",
  });
  // Stato per la gestione del caricamento del form
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { startUpload } = useUploadThing("imageUploader");

  // =============================== GEO DATA ======================================

  //regioni e province
  const [regioni, setRegioni] = useState<Regione[]>([]);
  const [province, setProvince] = useState<ProvinciaSubset[]>([]);
  //comuni
  const [allComuni, setAllComuni] = useState<ComuneSubset[]>([]);
  const [searchComune, setSearchComune] = useState<string>("");
  const [selectedComuneId, setSelectedComuneId] = useState<string>("");
  //zone
  const [allZone, setAllZone] = useState<ZonaSubset[]>([]);
  const [searchZona, setSearchZona] = useState<string>("");
  const [selectedZonaId, setSelectedZonaId] = useState<string>("");
  const [checkedZona, setCheckedZona] = useState<boolean>(false);

  //STATI MODALE
  const [modalConfig, setModalConfig] = useState<{
    isOpen: boolean;
    type: "regione" | "provincia" | "comune" | "zona";
    parentId?: string;
  }>({
    isOpen: false,
    type: "regione",
    parentId: undefined,
  });
  const [newData, setNewData] = useState<{
    nome: string;
    sigla: string;
    cap: string;
  }>({
    nome: "",
    sigla: "",
    cap: "",
  });

  // Funzioni per il recuper di regioni e provincie
  useEffect(() => {
    const loadRegioni = async () => {
      const res = await getRegioni();
      if (res.success && res.data) {
        setRegioni(res.data);
      } else {
        console.log(res.message);
      }
    };

    loadRegioni();
  }, []);

  const handleRegioneChange = async (regioneId: string) => {
    setProvince([]);
    setAllComuni([]);
    setModalConfig((prev) => ({ ...prev, parentId: regioneId }));

    if (!regioneId) return;

    const res = await getProvinceByRegione(regioneId);
    if (res.success && res.data) {
      setProvince(res.data);
    } else {
      console.log(res.message);
    }
  };

  useEffect(
    () =>
      console.log(
        "Stato di modalConfig.parentId aggiornato: ",
        modalConfig.parentId,
      ),
    [modalConfig.parentId],
  );

  // Funzioni per il COMUNE
  const handleProvinciaChange = async (provinciaId: string) => {
    setAllComuni([]);
    setSearchComune("");
    setSelectedComuneId("");
    setModalConfig((prev) => ({ ...prev, parentId: provinciaId }));

    if (!provinciaId) return;

    const res = await getComuneByProvincia(provinciaId);
    if (res.success && res.data) {
      setAllComuni(res.data);
    } else {
      console.log(res.message);
    }
  };

  const filteredComuni = useMemo(() => {
    // Se non c'è testo o abbiamo già selezionato un comune, non mostriamo nulla
    if (searchComune.trim() === "" || selectedComuneId) return [];

    return allComuni.filter((c) =>
      c.nome.toLowerCase().includes(searchComune.toLowerCase()),
    );
  }, [searchComune, allComuni, selectedComuneId]);

  // Funzioni per la ZONA
  const handleComuneChange = useCallback(async (comuneId: string) => {
    setSelectedComuneId(comuneId);

    setAllZone([]);
    setSearchZona("");
    setSelectedZonaId("");
    setModalConfig((prev) => ({ ...prev, parentId: comuneId }));

    if (!comuneId) return;

    const res = await getZonaByComune(comuneId);
    if (res.success && res.data && res.data.length > 0) {
      setAllZone(res.data);
      setCheckedZona(true);
    }
  }, []);

  const filteredZone = useMemo(() => {
    // Se non c'è testo cercato O se abbiamo già cliccato su un suggerimento (bloccando l'ID)
    // svuotiamo la lista dei suggerimenti.
    if (searchZona.trim() === "" || selectedZonaId) return [];

    return allZone.filter((z) =>
      z.nome.toLowerCase().includes(searchZona.toLowerCase()),
    );
  }, [searchZona, allZone, selectedZonaId]);

  // ============================== MODALE =========================================

  const handleSaveNewItem = async () => {
    const { nome, sigla, cap } = newData;
    if (!nome) return alert("Il nome è obbligatorio");

    let res:
      | Result<Regione>
      | Result<Provincia>
      | Result<Comune>
      | Result<Zona>;
    switch (modalConfig.type) {
      case "regione":
        res = await insertRegione(nome);
        if (res.success) {
          const newRegione = res.data as Regione;
          setRegioni((prev) => [...prev, newRegione]);
        }
        break;

      case "provincia":
        res = await insertProvincia(nome, sigla, modalConfig.parentId!);
        if (res.success) {
          const newProvincia = res.data as Provincia;
          setProvince((prev) => [
            ...prev,
            { id: newProvincia.id, nome: newProvincia.nome },
          ]);
        }
        break;

      case "comune":
        res = await insertComune(nome, modalConfig.parentId!, cap);
        if (res.success) {
          const newComune = res.data as Comune;
          setAllComuni((prev) => [
            ...prev,
            { id: newComune.id, nome: newComune.nome },
          ]);
        }
        break;

      case "zona":
        res = await insertZona(nome, modalConfig.parentId!, cap);
        if (res.success) {
          const newZona = res.data as Zona;
          setAllZone((prev) => [
            ...prev,
            { id: newZona.id, nome: newZona.nome },
          ]);
        }
        break;
    }

    if (res?.success) {
      setModalConfig({ ...modalConfig, isOpen: false });
      setNewData({ nome: "", sigla: "", cap: "" });
    } else {
      alert(res?.message || "Errore durante l'inserimento");
    }
  };

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
    const comune = "Verona";

    if (!indirizzo || indirizzo.length < 3) return;

    setIsGeocoding(true);

    try {
      const query = `${indirizzo}, ${comune}, VR`;
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

  // ================================== FILE HANDLING =============================================

  // Stati per la gestione delle immagini
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  // Funzioni per la gestione delle immagini
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

  // ========================================= SUBMIT HANDLING ==================================================
  async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();

    const formElement = e.currentTarget as HTMLFormElement;

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
        <div className="flex flex-col max-w-3xl gap-6 p-5 border-2 border-black rounded-xl shadow-md">
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

          {/* Regione */}
          <div className="flex flex-col gap-2">
            <label htmlFor="regioneId" className="ps-2 text-black">
              Regione
            </label>
            <div className="flex gap-2">
              <select
                name="regioneId"
                onChange={(e) => handleRegioneChange(e.target.value)}
                className="w-72 py-2 px-3 bg-white border-2 border-black rounded-xl"
              >
                <option value="">Seleziona Regione</option>
                {regioni.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.nome}
                  </option>
                ))}
              </select>

              {/* Bottone + */}
              <button
                type="button"
                onClick={() =>
                  setModalConfig((prev) => ({
                    ...prev,
                    isOpen: true,
                    type: "regione",
                  }))
                }
                className="w-10 h-10 border-2 border-black rounded-xl hover:bg-gray-300 transition-colors cursor-pointer"
              >
                +
              </button>
            </div>
          </div>

          {/* Provincia */}
          <div className="flex flex-col gap-2">
            <label htmlFor="provinciaId" className="ps-2 text-black">
              Provincia
            </label>
            <div className="flex gap-2">
              <select
                name="provinciaId"
                disabled={province.length === 0}
                onChange={(e) => handleProvinciaChange(e.target.value)}
                className="w-72 py-2 px-3 bg-white border-2 border-black rounded-xl disabled:bg-gray-100 disabled:border-gray-300 disabled:text-gray-400"
              >
                <option value="">Seleziona Provincia</option>
                {province.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.nome}
                  </option>
                ))}
              </select>

              {/* Bottone + */}
              <button
                type="button"
                disabled={modalConfig.parentId === undefined}
                onClick={() =>
                  setModalConfig((prev) => ({
                    ...prev,
                    isOpen: true,
                    type: "provincia",
                  }))
                }
                className="w-10 h-10 border-2 border-black rounded-xl hover:bg-gray-300 transition-colors cursor-pointer"
              >
                +
              </button>
            </div>
          </div>

          {/* Comune */}
          <div className="flex flex-col gap-2 relative">
            <label className="ps-2 text-black">Comune</label>

            <div className="flex gap-2">
              <div className="relative grow">
                <input
                  type="text"
                  value={searchComune}
                  onChange={(e) => {
                    setSearchComune(e.target.value);
                    setSelectedComuneId(""); // Se ricomincia a scrivere, resetta la selezione
                  }}
                  placeholder={
                    allComuni.length > 0
                      ? "Inizia a scrivere il comune..."
                      : "Seleziona prima una provincia"
                  }
                  disabled={allComuni.length === 0}
                  className="w-full py-2 px-3 bg-white border-2 border-black rounded-xl disabled:bg-gray-100 disabled:border-gray-300 disabled:text-gray-400"
                />

                {/* Menu a discesa dei risultati */}
                {filteredComuni.length > 0 && !selectedComuneId && (
                  <ul className="absolute z-1001 w-full bg-white border-2 border-black rounded-xl mt-1 max-h-60 overflow-y-auto shadow-xl">
                    {filteredComuni.map((c) => (
                      <li
                        key={c.id}
                        onClick={() => {
                          setSearchComune(c.nome);
                          setSelectedComuneId(c.id);
                          handleComuneChange(c.id); // Funzione per caricare le zone
                          console.log(c.nome);
                        }}
                        className="px-4 py-2 hover:bg-blue-100 cursor-pointer border-b last:border-none border-gray-100"
                      >
                        {c.nome}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Bottone "+" per aggiungere comune */}
              <button
                type="button"
                disabled={modalConfig.parentId === undefined}
                onClick={() =>
                  setModalConfig((prev) => ({
                    ...prev,
                    isOpen: true,
                    type: "comune",
                  }))
                }
                className="w-10 h-10 border-2 border-black rounded-xl hover:bg-gray-300 transition-colors cursor-pointer"
              >
                +
              </button>
            </div>

            {/* Campo nascosto per inviare l'ID al server tramite FormData */}
            <input type="hidden" name="comuneId" value={selectedComuneId} />
          </div>

          {/* Zona */}
          <div className="flex flex-col gap-2 relative">
            <label className="ps-2 text-black">Zona / Quartiere</label>

            <div className="flex gap-2">
              <div className="relative grow">
                {/* Se il comune ha zone, mostriamo l'input di ricerca */}
                {allZone.length > 0 ? (
                  <>
                    <input
                      type="text"
                      className="w-full py-2 px-3 border-2 border-black rounded-xl outline-none"
                      placeholder="Inizia a scrivere la zona..."
                      value={searchZona}
                      onChange={(e) => {
                        setSearchZona(e.target.value);
                        setSelectedZonaId(""); // Se l'utente ricomincia a scrivere, resettiamo l'ID
                      }}
                    />

                    {/* Menu Suggerimenti */}
                    {filteredZone.length > 0 && (
                      <ul className="absolute z-100 w-full bg-white border-2 border-black rounded-xl mt-1 max-h-48 overflow-y-auto shadow-2xl">
                        {filteredZone.map((z) => (
                          <li
                            key={z.id}
                            className="px-4 py-2 hover:bg-blue-50 cursor-pointer border-b last:border-none"
                            onClick={() => {
                              setSearchZona(z.nome);
                              setSelectedZonaId(z.id);
                            }}
                          >
                            {z.nome}
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
                  /* Se il comune NON ha zone (o non è selezionato), mostriamo un input disabilitato parlante */
                  <input
                    type="text"
                    disabled
                    className="w-full py-2 px-3 border-2 border-gray-200 bg-gray-50 rounded-xl italic text-gray-400 cursor-not-allowed"
                    value={
                      !selectedComuneId
                        ? "Seleziona prima un comune"
                        : checkedZona
                          ? "Caricamento zone in corso..."
                          : "Nessuna zona censita per questo comune"
                    }
                  />
                )}
              </div>

              {/* Bottone per aggiungere una zona mancante */}
              <button
                type="button"
                disabled={modalConfig.parentId === undefined}
                onClick={() =>
                  setModalConfig((prev) => ({
                    ...prev,
                    isOpen: true,
                    type: "zona",
                  }))
                }
                className="w-10 h-10 border-2 border-black rounded-xl hover:bg-gray-300 transition-colors cursor-pointer"
              >
                +
              </button>
            </div>

            {/* L'ID che verrà inviato effettivamente al server */}
            <input type="hidden" name="zonaId" value={selectedZonaId} />
          </div>

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
          <div className="flex flex-row justify-around">
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
          <div className="flex flex-row justify-around">
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
          <div className="flex flex-row justify-around">
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
          {/* Immagini Immobile */}
          <div className="flex flex-col gap-2">
            <label className="ps-2 text-black font-bold">Foto Immobile</label>

            <div className="border-2 border-dashed border-gray-400 p-6 rounded-xl text-center">
              <input
                type="file"
                name="immagini"
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
                  <Image
                    src={url}
                    width={50}
                    height={50}
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
    </>
  );
}
