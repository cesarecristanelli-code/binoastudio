import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

export default function BinoazineBanner() {
  const t = useTranslations("Homepage.binoazineBanner");

  return (
    <section
      /* MODIFICA: Aggiunto scroll-mt dinamico per centrare verticalmente il banner nello schermo allo scorrimento dell'ancora #news */
      className="relative left-1/2 right-1/2 ml-[-50vw] mr-[-50vw] w-screen h-112.5 sm:h-125 overflow-hidden group scroll-mt-[calc((100vh-28rem)/2)] sm:scroll-mt-[calc((100vh-31.25rem)/2)]"
      id="news"
    >
      {/* Immagine di sfondo */}
      <Image
        src="/vetro.jpg" // Puoi sostituirla in futuro con un mockup della rivista
        alt="Binoazine - La rivista digitale di Binòa Studio"
        fill
        sizes="100vw"
        priority
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-101"
      />

      {/* Overlay Sfumato per garantire la leggibilità del testo */}
      <div className="absolute inset-0 bg-linear-to-b from-[rgb(218,211,201)]/60 via-[#3C3833]/70 to-[#3C3833]/90" />

      {/* Contenitore dei Testi (Centrato e responsivo) */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 md:px-8 max-w-3xl mx-auto z-10">
        {/* Occhiello / Tag Novità */}
        <span className="text-xs md:text-sm font-semibold tracking-widest text-[#3C3833] bg-[rgb(218,211,201)] px-3 py-1 rounded-full uppercase mb-4 shadow-xs">
          {t("news")}
        </span>

        {/* Titolo Principale */}
        <h2 className="text-3xl md:text-7xl font-light text-white tracking-wider uppercase mb-3">
          BINÒA<span className="font-medium italic">ZINE</span>
        </h2>

        {/* Sottotitolo / Descrizione */}
        <p className="text-lg md:text-2xl text-gray-200 font-medium max-w-xl leading-relaxed mb-8 balance">
          {t("description")}
        </p>

        {/* Bottone di Call to Action (Link alla pagina dedicata) */}
        <Link
          href="/binoazine"
          className="group ml-4 text-base inline-flex items-center gap-2 font-bold uppercase tracking-widest px-6 py-2.5 rounded-full transition-all duration-300 cursor-pointer bg-white text-black hover:bg-gray-200"
        >
          {t("link")}
        </Link>
      </div>
    </section>
  );
}
