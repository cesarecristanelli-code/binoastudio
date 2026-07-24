"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Magazine } from "@/generated/prisma/client";
import dynamic from "next/dynamic";

const PdfViewer = dynamic(() => import("./PdfViewer"), {
  ssr: false,
  loading: () => (
    <div className="text-sm font-medium text-[#5A554E] animate-pulse py-12 text-center">
      Loading preview...
    </div>
  ),
});

export default function BinoazinePreviews({
  magazines,
}: {
  magazines: Magazine[];
}) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);

  const activeIssue = magazines.find((issue) => issue.id === activeId);
  const t = useTranslations("Binoazine");

  const handleOpen = (id: string) => {
    setActiveId(id);
    setPageNumber(1);
    setNumPages(null);
  };

  const handleClose = () => {
    setActiveId(null);
    setPageNumber(1);
  };

  const nextPage = () => {
    if (numPages && pageNumber < numPages) {
      setPageNumber((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (pageNumber > 1) {
      setPageNumber((prev) => prev - 1);
    }
  };

  if (!magazines || magazines.length === 0) {
    return null;
  }

  return (
    <section className="relative px-6 md:px-20 mb-32">
      <h2 className="text-center text-3xl md:text-4xl font-semibold uppercase tracking-wider mb-16 text-[#3C3833]">
        {t("previwsTitle")}
      </h2>

      {/* Griglia anteprime (centrata se pochi elementi) */}
      <div
        className={`flex gap-8 overflow-x-auto pb-10 snap-x hide-scrollbar max-w-7xl mx-auto ${
          magazines.length <= 2 ? "justify-center" : "justify-start"
        }`}
      >
        {magazines.map((issue) => (
          <div
            key={issue.id}
            className="min-w-85 sm:min-w-120 md:min-w-145 snap-center shrink-0 relative group cursor-pointer"
            onClick={() => handleOpen(issue.id)}
          >
            <motion.div
              layoutId={`card-container-${issue.id}`}
              className="relative aspect-1200/720 w-full bg-gray-200 overflow-hidden shadow-md rounded-xl flex items-center justify-center"
              onContextMenu={(e) => e.preventDefault()}
              transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
            >
              {issue.coverUrl ? (
                <Image
                  src={issue.coverUrl}
                  alt={issue.titolo}
                  fill
                  sizes="(max-width: 768px) 100vw, 580px"
                  className="object-cover pointer-events-none select-none"
                />
              ) : (
                <PdfViewer file={issue.pdfUrl} pageNumber={1} width={500} />
              )}

              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
            </motion.div>

            <p className="mt-4 text-sm font-medium uppercase tracking-wide text-center">
              Binòa<span className="italic">zine</span> #
              {issue.numero < 10 ? `0${issue.numero}` : issue.numero} -{" "}
              {issue.titolo}
            </p>
          </div>
        ))}
      </div>

      {/* MODALE ESPANSO CON CAROSELLO VELOCE */}
      <AnimatePresence>
        {activeIssue && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              className="absolute inset-0 bg-black/60 backdrop-blur-xs cursor-pointer"
            />

            <motion.div
              layoutId={`card-container-${activeIssue.id}`}
              className="relative w-full max-w-2xl md:max-w-3xl bg-[#F5F4F0] shadow-2xl rounded-2xl overflow-hidden z-10 flex flex-col items-center p-6 md:p-8"
              transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Bottone Chiudi */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 bg-[#3C3833]/80 hover:bg-[#3C3833] text-[#F5F4F0] p-2.5 rounded-full transition-colors z-20 focus:outline-none"
                aria-label="Chiudi anteprima"
              >
                <svg
                  className="w-5 h-5"
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
              </button>

              {/* Area Viewer PDF */}
              <div className="relative w-full flex items-center justify-center min-h-95 max-h-[60vh] overflow-hidden my-2">
                {/* Freccia Sinistra */}
                {pageNumber > 1 && (
                  <button
                    onClick={prevPage}
                    className="absolute left-2 z-20 bg-[#3C3833]/80 hover:bg-[#3C3833] text-[#F5F4F0] p-3 rounded-full shadow-lg transition-transform hover:scale-105"
                    aria-label="Pagina precedente"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>
                )}

                {/* Il documento rimane aperto, cambia solo la pagina istantaneamente */}
                <PdfViewer
                  file={activeIssue.pdfUrl}
                  pageNumber={pageNumber}
                  height={500}
                  onLoadSuccess={({ numPages }) => setNumPages(numPages)}
                />

                {/* Freccia Destra */}
                {numPages && pageNumber < numPages && (
                  <button
                    onClick={nextPage}
                    className="absolute right-2 z-20 bg-[#3C3833]/80 hover:bg-[#3C3833] text-[#F5F4F0] p-3 rounded-full shadow-lg transition-transform hover:scale-105"
                    aria-label="Pagina successiva"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                )}
              </div>

              {/* Indicatore Pagina */}
              {numPages && (
                <div className="mt-4 text-xs font-semibold uppercase tracking-widest text-[#3C3833]/80 bg-[#3C3833]/10 px-4 py-1.5 rounded-full">
                  P. {pageNumber} / {numPages}
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
