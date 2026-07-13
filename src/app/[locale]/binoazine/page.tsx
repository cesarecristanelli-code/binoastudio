"use client";
import BinoazinePreviews from "@/components/binoazione-section/BinoazinePreviews";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function BinoazinePage() {
  const t = useTranslations("Binoazine");
  return (
    <main className="min-h-screen bg-[#F5F4F0] text-[#3C3833] pt-32 pb-20">
      {/* 1. SEZIONE TITOLO CENTRATO CON EFFETTO PROFONDITÀ */}
      <section className="relative px-6 md:px-20 mb-12 text-center overflow-hidden">
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="relative pt-20 max-w-4xl mx-auto"
        >
          {/* Testo di background centrato per la profondità */}
          <span className="absolute top-0 left-1/2 -translate-x-1/2 text-[10rem] md:text-[18rem] font-bold opacity-[0.06] select-none tracking-tighter leading-none w-full">
            ZINE
          </span>

          <h1 className="relative text-5xl md:text-7xl font-arvo font-normal tracking-[0.2em] uppercase pt-10">
            Binòazine
          </h1>
        </motion.div>
      </section>

      {/* 2. SEZIONE DESCRIZIONE CENTRATA E INGRANDITA */}
      <section className="px-6 md:px-20 mb-32 text-center ">
        <div className="max-w-4xl mx-auto">
          <p className="text-xl md:text-2xl leading-relaxed text-[#5A554E] mb-8">
            {t("mainContent")}
          </p>
          <p className="text-lg md:text-xl leading-relaxed text-[#5A554E]">
            {t("subContent")}
          </p>
        </div>
      </section>

      {/* 3. SEZIONE ANTEPRIMA RIVISTE (TITOLO CENTRATO H2) */}
      <BinoazinePreviews />

      {/* 4. SEZIONE NEWSLETTER ALLARGATA (SEMPRE IN COLONNA) */}
      <section className="px-6 md:px-20">
        <div className="bg-[#3C3833] text-[#F5F4F0] p-10 md:p-16 max-w-6xl mx-auto flex flex-col items-center text-center gap-12 rounded-3xl">
          {/* Testi del Form (Ingranditi) */}
          <div className="w-full max-w-3xl">
            <h3 className="text-3xl md:text-4xl font-medium uppercase tracking-widest mb-4">
              {t("binoazineForm.title")}
            </h3>
            <p className="text-base md:text-lg text-gray-300 leading-relaxed">
              {t("binoazineForm.content")}
            </p>
          </div>

          {/* Input e Bottone */}
          <div className="w-full max-w-2xl">
            <form
              className="flex flex-col gap-8 w-full"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="text"
                placeholder="Nome"
                className="bg-transparent border-b border-[#F5F4F0]/30 py-3 px-2 text-[#F5F4F0] placeholder-[#F5F4F0]/50 focus:outline-none focus:border-[#F5F4F0] transition-colors"
                required
              />
              <input
                type="email"
                placeholder="Indirizzo Email"
                className="bg-transparent border-b border-[#F5F4F0]/30 py-3 px-2 text-[#F5F4F0] placeholder-[#F5F4F0]/50 focus:outline-none focus:border-[#F5F4F0] transition-colors"
                required
              />

              {/* Bottone modificato: centrato, più grande, arrotondato e con icona animata */}
              <button
                type="submit"
                className="group mx-auto text-sm md:text-base inline-flex items-center gap-2 font-semibold uppercase tracking-widest px-10 py-4 rounded-full transition-all duration-300 cursor-pointer bg-white text-black hover:bg-gray-200 w-fit mt-4"
              >
                {t("binoazineForm.button")}
                <svg
                  className="w-4 h-4 transition-transform duration-300 ease-out group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
