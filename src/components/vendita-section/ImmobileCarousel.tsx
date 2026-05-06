"use client";

import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

interface Props {
  immagini: { url: string; isCover: boolean }[];
}

export default function ImmobileCarousel({ immagini }: Props) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Carosello Principale
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel({ loop: true });
  // Carosello Miniature
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  });

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaMainApi || !emblaThumbsApi) return;
      emblaMainApi.scrollTo(index);
    },
    [emblaMainApi, emblaThumbsApi],
  );

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return;
    setSelectedIndex(emblaMainApi.selectedScrollSnap());
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaMainApi) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    onSelect();
    emblaMainApi.on("select", onSelect);
    emblaMainApi.on("reInit", onSelect);
  }, [emblaMainApi, onSelect]);

  return (
    <div className="w-full space-y-4">
      {/* CAROSELLO PRINCIPALE */}
      <div className="relative group">
        <div
          className="overflow-hidden rounded-2xl bg-gray-100 shadow-lg"
          ref={emblaMainRef}
        >
          <div className="flex">
            {immagini.map((img, index) => (
              <div className="relative flex-[0_0_100%] aspect-16/8" key={index}>
                <Image
                  src={img.url}
                  alt={`Immagine ${index + 1}`}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Frecce di navigazione */}
        <button
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition-all opacity-0 group-hover:opacity-100"
          onClick={() => emblaMainApi?.scrollPrev()}
        >
          <ChevronLeft className="size-6 text-slate-800" />
        </button>
        <button
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition-all opacity-0 group-hover:opacity-100"
          onClick={() => emblaMainApi?.scrollNext()}
        >
          <ChevronRight className="size-6 text-slate-800" />
        </button>

        {/* Counter in basso a destra */}
        <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-xs backdrop-blur-sm">
          {selectedIndex + 1} / {immagini.length}
        </div>
      </div>

      {/* BARRA DELLE MINIATURE */}
      <div className="overflow-hidden" ref={emblaThumbsRef}>
        <div className="flex gap-3">
          {immagini.map((img, index) => (
            <button
              key={index}
              onClick={() => onThumbClick(index)}
              className={`relative flex-[0_0_120px] md:flex-[0_0_160px] aspect-video rounded-lg overflow-hidden border-2 transition-all ${
                index === selectedIndex
                  ? "border-green-600 ring-2 ring-green-100"
                  : "border-transparent opacity-60 hover:opacity-100"
              }`}
            >
              <Image
                src={img.url}
                alt={`Miniatura ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
