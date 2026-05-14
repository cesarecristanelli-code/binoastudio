import { Geo, Map } from "@/types/inserimentoHooks.types";
import dynamic from "next/dynamic";

const MapPicker = dynamic(
  () => import("@/components/admin-section/inserimento/sections/MapPicker"),
  {
    ssr: false,
    loading: () => (
      <div className="h-100 w-full bg-slate-100 rounded-xl animate-pulse flex items-center justify-center text-slate-400">
        Caricamento mappa in corso...
      </div>
    ),
  },
);

export default function MapSection({
  map,
  geo,
  onVerify,
}: {
  map: Map;
  geo: Geo;
  onVerify: () => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="indirizzo" className="ps-2 text-black required">
        Indirizzo
      </label>
      <div className="flex gap-2">
        <input
          required
          aria-required="true"
          type="text"
          name="indirizzo"
          id="indirizzo"
          value={map.address}
          onChange={(e) => map.setAddress(e.target.value)}
          disabled={geo.selectedComuneId === ""}
          className="grow py-2 px-3 bg-white border-2 border-black rounded-xl disabled:bg-gray-100 disabled:border-gray-300 disabled:text-gray-400"
          placeholder="Via Roma 10"
        />
        <button
          type="button"
          onClick={onVerify}
          disabled={map.isGeocoding || geo.selectedComuneId === ""}
          className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
        >
          {map.isGeocoding ? "..." : "Verifica"}
        </button>
      </div>

      {/* Mappa */}
      <div className="mt-4">
        <MapPicker
          lat={map.coords.lat}
          lng={map.coords.lng}
          onChange={map.handleMapChange}
        />
        <p className="text-[10px] text-gray-500 mt-1 italic">
          Coordinate attuali: {map.coords.lat.toFixed(5)},{" "}
          {map.coords.lng.toFixed(5)}
        </p>
      </div>
    </div>
  );
}
