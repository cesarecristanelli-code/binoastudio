"use client";

import dynamic from "next/dynamic";

// Qui l'import dinamico è permesso perché siamo in un Client Component
const MapComponent = dynamic(() => import("./ImmobileMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-100 bg-slate-100 animate-pulse rounded-2xl flex items-center justify-center text-slate-400">
      Caricamento mappa in corso...
    </div>
  ),
});

export default function MapWrapper({ lat, lng }: { lat: number; lng: number }) {
  return <MapComponent lat={lat} lng={lng} />;
}
