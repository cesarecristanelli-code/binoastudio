"use client";

import { motion } from "framer-motion";

export default function BinoazineHeader({
  mainContent,
}: {
  mainContent: string;
}) {
  return (
    <>
      {/* 1. SEZIONE TITOLO CENTRATO CON EFFETTO PROFONDITÀ */}
      <section className="relative px-6 md:px-20 mb-12 text-center overflow-hidden">
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="relative pt-20 max-w-4xl mx-auto"
        >
          <span className="absolute top-0 left-1/2 -translate-x-1/2 text-[10rem] md:text-[18rem] font-bold opacity-[0.06] select-none tracking-tighter leading-none w-full">
            ZINE
          </span>

          <h1 className="relative text-5xl md:text-7xl font-arvo font-normal tracking-[0.2em] uppercase pt-10">
            Binòa<span className="italic">zine</span>
          </h1>
        </motion.div>
      </section>

      {/* 2. SEZIONE DESCRIZIONE CENTRATA E INGRANDITA */}
      <section className="px-6 md:px-20 mb-32 text-center">
        <div className="max-w-4xl mx-auto">
          <p className="text-xl md:text-2xl leading-relaxed text-[#5A554E] mb-8">
            {mainContent}
          </p>
        </div>
      </section>
    </>
  );
}
