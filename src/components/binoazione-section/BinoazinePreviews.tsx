"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const magazineIssues = [
  {
    id: 1,
    src: "/magazine-cover-1.png",
    alt: "Binoazine Numero 1",
    label: "Issue 01 - The Genesis",
  },
  {
    id: 2,
    src: "/magazine-cover-2.png",
    alt: "Binoazine Numero 2",
    label: "Issue 02 - Urban Spaces",
  },
];

export default function BinoazinePreviews() {
  // Stato per tracciare quale rivista è stata cliccata ed è espansa
  const [activeId, setActiveId] = useState<number | null>(null);

  // Trova l'oggetto della rivista attualmente attiva
  const activeIssue = magazineIssues.find((issue) => issue.id === activeId);

  return (
    <section className="relative px-6 md:px-20 mb-32">
      <h2 className="text-center text-3xl md:text-4xl font-semibold uppercase tracking-wider mb-16 text-[#3C3833]">
        Sfoglia le anteprime
      </h2>

      {/* Griglia/Fila orizzontale delle anteprime normali */}
      <div className="flex gap-8 overflow-x-auto pb-10 snap-x hide-scrollbar max-w-7xl mx-auto">
        {magazineIssues.map((issue) => (
          <div
            key={issue.id}
            className="min-w-85 sm:min-w-120 md:min-w-145 snap-center shrink-0 relative group cursor-pointer"
            onClick={() => setActiveId(issue.id)}
          >
            {/* Il layoutId permette a Framer Motion di capire da dove far partire l'effetto lente */}
            <motion.div
              layoutId={`card-container-${issue.id}`}
              className="relative aspect-1200/720 w-full bg-gray-200 overflow-hidden shadow-md rounded-xl"
              onContextMenu={(e) => e.preventDefault()}
              transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
            >
              <Image
                src={issue.src}
                alt={issue.alt}
                fill
                sizes="(max-w-768px) 100vw, 580px"
                className="object-cover pointer-events-none select-none"
              />
            </motion.div>
            <p className="mt-4 text-sm font-medium uppercase tracking-wide text-center">
              {issue.label}
            </p>
          </div>
        ))}
      </div>

      {/* VISTA ESPANSA (Innescata con AnimatePresence per gestire lo smontaggio) */}
      <AnimatePresence>
        {activeIssue && (
          <div className="absolute inset-0 z-30 flex items-center justify-center px-4 md:px-10">
            {/* Sfondo oscurato che copre SOLO la sezione preview */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveId(null)}
              className="absolute inset-0 bg-[#F5F4F0]/95 backdrop-blur-xs cursor-zoom-out"
            />

            {/* Immagine Ingrandita con effetto lente (stesso layoutId di quella piccola) */}
            <motion.div
              layoutId={`card-container-${activeIssue.id}`}
              className="relative w-full max-w-6xl aspect-1200/720 bg-gray-200 shadow-2xl rounded-2xl overflow-hidden z-40"
              onContextMenu={(e) => e.preventDefault()}
              transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
            >
              <Image
                src={activeIssue.src}
                alt={activeIssue.alt}
                fill
                sizes="100vw"
                priority
                className="object-cover pointer-events-none select-none"
              />

              {/* Pulsante X di chiusura posizionato in alto a destra dell'immagine */}
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ delay: 0.2 }}
                onClick={(e) => {
                  e.stopPropagation(); // Evita che il click passi allo sfondo
                  setActiveId(null);
                }}
                className="absolute top-4 right-4 md:top-6 md:right-6 bg-[#3C3833]/80 hover:bg-[#3C3833] text-white p-3 rounded-full transition-colors duration-200 shadow-lg group/btn focus:outline-none"
                aria-label="Chiudi anteprima"
              >
                <svg
                  className="w-5 h-5 transition-transform duration-200 group-hover/btn:scale-110"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </motion.button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
