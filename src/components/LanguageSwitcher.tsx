"use client";

import { Link, usePathname } from "@/i18n/navigation"; // Assicurati che il percorso di importazione sia corretto in base al tuo progetto
import { useLocale } from "next-intl";
import Image from "next/image";

export default function LanguageSwitcher() {
  const currentLocale = useLocale(); // Prende la lingua attiva ('it' o 'en')
  const pathname = usePathname(); // Prende il percorso attuale senza la lingua (es. '/vendita')

  return (
    <div className="flex items-center gap-3">
      {/* Bandiera Italiana */}
      <Link
        href={pathname}
        locale="it"
        className={`relative w-7 h-7 transition-all hover:scale-110 block ${
          currentLocale === "it"
            ? "ring-2 ring-black rounded-full p-0.5"
            : "opacity-40"
        }`}
        title="Italiano"
      >
        <Image
          src="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.6/flags/4x3/it.svg"
          alt="Italiano"
          width={28}
          height={28}
          className="rounded-full object-cover w-full h-full"
        />
      </Link>

      {/* Bandiera Inglese */}
      <Link
        href={pathname}
        locale="en"
        className={`relative w-7 h-7 transition-all hover:scale-110 block ${
          currentLocale === "en"
            ? "ring-2 ring-black rounded-full p-0.5"
            : "opacity-40"
        }`}
        title="English"
      >
        <Image
          src="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.6/flags/4x3/gb.svg"
          alt="English"
          width={28}
          height={28}
          className="rounded-full object-cover w-full h-full"
        />
      </Link>
    </div>
  );
}
