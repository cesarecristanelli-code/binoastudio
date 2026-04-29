"use client";

import { useMemo, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";

const customIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function MapController({ center }: { center: [number, number] }) {
  const map = useMap();

  useEffect(() => {
    map.flyTo(center, 18);

    setTimeout(() => {
      map.invalidateSize();
    }, 100);
  }, [center, map]);

  return null;
}

interface MapPickerProps {
  lat: number;
  lng: number;
  onChange: (lat: number, lng: number) => void;
}

export default function MapPicker({ lat, lng, onChange }: MapPickerProps) {
  const position: [number, number] = [lat, lng];

  const eventHandlers = useMemo(
    () => ({
      dragend(e: L.LeafletEvent) {
        const marker = e.target as L.Marker;
        if (marker) {
          const { lat, lng } = marker.getLatLng();
          onChange(lat, lng);
        }
      },
    }),
    [onChange],
  );

  return (
    <div className="w-full h-100 rounded-xl overflow-hidden border-2 border-slate-200 shadow-inner relative z-0">
      <MapContainer
        center={position}
        zoom={18}
        scrollWheelZoom={false}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Gestisce il movimento della mappa se cambiano le coordinate */}
        <MapController center={position} />

        <Marker
          draggable={true}
          eventHandlers={eventHandlers}
          position={position}
          icon={customIcon}
        />
      </MapContainer>

      {/* Suggerimento visivo per l'Admin */}
      <div className="absolute bottom-4 left-4 z-1000 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 shadow-sm border border-slate-200 pointer-events-none">
        📍 Trascina il puntatore per correggere la posizione
      </div>
    </div>
  );
}
