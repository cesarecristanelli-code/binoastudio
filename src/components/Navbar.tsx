"use client";

import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface NavlinkType {
  name: string;
  href: string;
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isChiSiamoOpen, setIsChiSiamoOpen] = useState<boolean>(false);
  const [isCosaFacciamoOpen, setIsCosaFacciamoOpen] = useState<boolean>(false);
  const [isMobileChiSiamoOpen, setIsMobileChiSiamoOpen] =
    useState<boolean>(false);
  const [isMobileCosaFacciamoOpen, setIsMobileCosaFacciamoOpen] =
    useState<boolean>(false);

  const cosaFacciamoLinks: NavlinkType[] = [
    { name: "Compravendita Immobiliare", href: "/#compravendita-immobiliare" },
    { name: "Gestione Progetti", href: "/#gestione-progetti" },
    { name: "Progettazione", href: "/#progettazione" },
  ];

  const chiSiamoLinks: NavlinkType[] = [
    { name: "Binòa", href: "/#binoa" },
    { name: "Motto", href: "/#motto" },
    { name: "Vision", href: "/#vision" },
    { name: "Mission", href: "/#mission" },
  ];

  const pathname = usePathname();

  useEffect(() => {
    const handleScrolling = () => {
      // Se scorre più di 50px, setto lo stato isScrolled = true
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Aggiungo l'event listener alla finestra
    window.addEventListener("scroll", handleScrolling);

    // il return deve purlire --> rimuovere l'event listener (altrimenti resta in background mentre ne viene caricato un'altro in un'altra pagina)
    return () => {
      window.removeEventListener("scroll", handleScrolling);
    };

    // Dependence = [] si attiva al rendering della Navabar
  }, []);

  // 2. Setto il bg dinamico in base a che sia in cima alla pagina o si stia scrollando
  // - Se si è nella HomePage: logica scrilling (trasparente -> solida)
  // - Se non si è nella HomePage: navbar semre solida
  const isHomePage = pathname === "/";
  const navbarBg = isHomePage
    ? isScrolled
      ? "bg-[rgb(250,248,245)] shadow-md border-b border-gray-100" //se si è nella Home e si ha scrollato più di 50px
      : "bg-transparent" // se si è nella Home e NON si ha scrollato più di 50px
    : "bg-[rgb(250,248,245)] shadow-md border-b border-gray-100"; //se non si è nella Home
  const isTransparent = isHomePage && !isScrolled && !isOpen;
  const textColor = isTransparent ? "text-white" : "text-black";

  // Inverto il colore del logo se è sulla hero
  const logoPath = "/BinoaLogo.svg";
  const logoClasses = isHomePage && !isScrolled ? "brightness-0 invert" : "";

  // Ora il componente navbar
  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out px-5 py-2 ${navbarBg}`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo a sinistra */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src={logoPath}
            alt="Binoa Logo"
            width={90}
            height={60}
            priority
            className={`object-contain ${logoClasses}`}
          />
        </Link>

        {/* Menu a destra (nascosto su Mobile) */}
        <div className="hidden md:flex items-center gap-9 ">
          {/* 'Chi siamo' dropdown */}
          <div
            className="relative group py-2"
            onMouseOver={() => setIsChiSiamoOpen(true)}
            onMouseLeave={() => setIsChiSiamoOpen(false)}
            onFocus={() => setIsChiSiamoOpen(true)}
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget))
                setIsChiSiamoOpen(false);
            }}
          >
            <button
              aria-expanded={isChiSiamoOpen}
              aria-haspopup={true}
              className={`flex items-center gap-1 font-medium tracking-wide transition-colors ${textColor} hover:opacity-70 p-1`}
            >
              Chi siamo
              <ChevronDownIcon
                className={`w-4 h-4 transition-transform duration-200 ${isChiSiamoOpen && "rotate-180"}`}
              />
            </button>
            <div
              className={`absolute left-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 transition-all duration-200 origin-top-left ${isChiSiamoOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 invisible"}`}
            >
              {chiSiamoLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block px-5 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* 'Cosa Facciamo' dropdown menu */}
          <div
            className="relative group py-2"
            onMouseOver={() => setIsCosaFacciamoOpen(true)}
            onMouseLeave={() => setIsCosaFacciamoOpen(false)}
            onFocus={() => setIsCosaFacciamoOpen(true)}
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget))
                setIsCosaFacciamoOpen(false);
            }}
          >
            <button
              aria-expanded={isCosaFacciamoOpen}
              aria-haspopup={true}
              className={`flex items-center gap-1 font-medium tracking-wide transition-colors ${textColor} hover:opacity-70`}
            >
              Cosa Facciamo
              <ChevronDownIcon
                className={`w-4 h-4 transition-transform duration-200 ${isCosaFacciamoOpen && "rotate-180"}`}
              />
            </button>
            <div
              className={`absolute left-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 transition-all duration-200 origin-top-left ${isCosaFacciamoOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 invisible"}`}
            >
              {cosaFacciamoLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block px-5 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          <Link href="/vendita">
            <button
              className={`ml-4 text-xs font-semibold uppercase tracking-widest px-6 py-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                isHomePage && !isScrolled
                  ? "bg-white text-black hover:bg-gray-200" // Pulsante su trasparente
                  : "bg-[#3C3833] text-white hover:bg-[#3C3833]/80" // Pulsante su bianco
              }`}
            >
              Compravendita Immobiliare
            </button>
          </Link>

          <Link href="#footer">
            <span
              className={`font-medium tracking-wide transition-colors ${textColor} hover:opacity-70`}
            >
              Contatti
            </span>
          </Link>

          <Link href="/login" className={`${isHomePage && !isScrolled ? "text-white" : "text-black"} text-sm`}>Login</Link>
        </div>

        {/* Mobile menu icon */}
        <div className="md:hidden">
          <button
            className={`md:hidden relative z-70 p-2 transition-colors ${textColor}`}
            aria-label="toggle-menu"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-60 bg-[rgb(250,248,245)] flex flex-col px-8 pt-24 transition-transform duration-500 ease-in-out md:hidden ${
          isOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="flex flex-col gap-6 overflow-y-auto mt-5">
          {/* Sezione: Chi Siamo (Accordion) */}
          <div className="flex flex-col">
            <button
              onClick={() => setIsMobileChiSiamoOpen(!isMobileChiSiamoOpen)}
              className="flex items-center justify-between text-2xl font-semibold text-black"
            >
              Chi Siamo
              <ChevronDownIcon
                className={`w-6 h-6 transition-transform ${isMobileChiSiamoOpen ? "rotate-180" : ""}`}
              />
            </button>
            <div
              className={`flex flex-col gap-4 pl-4 overflow-hidden transition-all duration-300 ${isMobileChiSiamoOpen ? "max-h-60 mt-4 opacity-100" : "max-h-0 opacity-0"}`}
            >
              {chiSiamoLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-lg text-gray-600"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Sezione: Cosa Facciamo (Accordion) */}
          <div className="flex flex-col">
            <button
              onClick={() =>
                setIsMobileCosaFacciamoOpen(!isMobileCosaFacciamoOpen)
              }
              className="flex items-center justify-between text-2xl font-semibold text-black"
            >
              Cosa Facciamo
              <ChevronDownIcon
                className={`w-6 h-6 transition-transform ${isMobileCosaFacciamoOpen ? "rotate-180" : ""}`}
              />
            </button>
            <div
              className={`flex flex-col gap-4 pl-4 overflow-hidden transition-all duration-300 ${isMobileCosaFacciamoOpen ? "max-h-60 mt-4 opacity-100" : "max-h-0 opacity-0"}`}
            >
              {cosaFacciamoLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-lg text-gray-600"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Link Semplice: Vendita */}
          <Link
            href="/#compravendita-immobiliare"
            onClick={() => setIsOpen(false)}
            className="text-2xl font-semibold text-black"
          >
            Compravendita Immobiliare
          </Link>

          <div className="h-px bg-gray-200 my-4" />

          {/* Bottone CTA Finale */}
          <Link
            href="#footer"
            onClick={() => setIsOpen(false)}
            className="bg-[#3C3833] text-white text-center py-4 rounded-full text-lg font-bold shadow-lg"
          >
            Contatti
          </Link>
        </div>
      </div>
    </nav>
  );
}
