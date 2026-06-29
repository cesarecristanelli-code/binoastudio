// import Image from "next/image";

// export default function FullBleedImage() {
//   return (
//     <div className="relative left-1/2 right-1/2 ml-[-50vw] mr-[-50vw] w-screen h-100 overflow-hidden">
//       <Image
//         src="/vetro.jpg"
//         alt="Paesaggio naturalistico"
//         fill
//         className="object-cover"
//       />
//       <div className="absolute inset-0 bg-linear-to-b from-[rgb(218,211,201)]/70 via-[#3C3833]/70 to-[#3C3833]/90" />
//     </div>
//   );
// }

import Image from "next/image";
import Link from "next/link";

export default function BinoazineBanner() {
  return (
    <section className="relative left-1/2 right-1/2 ml-[-50vw] mr-[-50vw] w-screen h-112.5 sm:h-125 overflow-hidden group">
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
          Novità
        </span>

        {/* Titolo Principale */}
        <h2 className="text-3xl md:text-7xl font-light text-white tracking-wider uppercase mb-3">
          BINÒA<span className="font-medium">ZINE</span>
        </h2>

        {/* Sottotitolo / Descrizione */}
        <p className="text-lg md:text-2xl text-gray-200 font-medium max-w-xl leading-relaxed mb-8 balance">
          È nato il nostro nuovo spazio editoriale dedicato ad architettura,
          mercato immobiliare e visioni di valore. Scopri le anteprime dei
          nostri numeri.
        </p>

        {/* Bottone di Call to Action (Link alla pagina dedicata) */}
        <Link
          href="/binoazine"
          className="group ml-4 text-base inline-flex items-center gap-2 font-bold uppercase tracking-widest px-6 py-2.5 rounded-full transition-all duration-300 cursor-pointer bg-white text-black hover:bg-gray-200"
        >
          Scopri la rivista
        </Link>
      </div>
    </section>
  );
}
