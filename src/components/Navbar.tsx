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
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const navLinks: NavlinkType[] = [
    { name: "Vendita", href: "/vendita" },
    { name: "Consulenza", href: "/#consulenza" },
    { name: "Progettazione", href: "/#progettazione" },
  ];

  const dropdownLinks: NavlinkType[] = [
    { name: "Trinòa", href: "/#trinoa" },
    { name: "Motto", href: "/#motto" },
    { name: "Vision", href: "/#vision" },
    { name: "Mission", href: "/#mission" },
  ];

  const pathname = usePathname();

  useEffect(() => {
    const handleScrolling = () => {
      // Se scorre più di 50px, setto lo steato isScrolled = true
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
  const linkHoverColor =
    isHomePage && !isScrolled ? "hover:text-blue-300" : "hover:text-blue-600";

  // Inverto il colore del logo se è sulla hero
  const logoPath = "/LogoTrinoaSVG.svg";
  const logoClasses = isHomePage && !isScrolled ? "brightness-0 invert" : "";

  // Ora il componente navbar
  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out px-6 py-3 ${navbarBg}`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo a sinistra */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src={logoPath}
            alt="Trinòa Logo"
            width={130}
            height={45}
            priority
            className={`object-contain ${logoClasses}`}
          />
        </Link>

        {/* Menu a destra (nascosto su Mobile) */}
        <div className="hidden md:flex items-center gap-9">
          {/* 'Chi siamo' dropdown */}
          <div
            className="relative group py-2"
            onMouseOver={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <button
              className={`flex items-center text-sm gap-1 font-medium tracking-wide transition-colors ${textColor} hover:opacity-70`}
            >
              Chi siamo
              <ChevronDownIcon
                className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen && "rotate-180"}`}
              />
            </button>
            <div
              className={`absolute left-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 transition-all duration-200 origin-top-left ${isDropdownOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}`}
            >
              {dropdownLinks.map((link) => (
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

          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium tracking-wide transition-colors ${textColor} ${linkHoverColor}`}
            >
              {link.name}
            </Link>
          ))}

          <Link href="#footer">
            <button
              className={`ml-4 text-xs font-semibold uppercase tracking-widest px-6 py-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                isHomePage && !isScrolled
                  ? "bg-white text-black hover:bg-gray-200" // Pulsante su trasparente
                  : "bg-black text-white hover:bg-gray-800" // Pulsante su bianco
              }`}
            >
              Contattaci
            </button>
          </Link>
        </div>

        {/* Mobile menu icon */}
        <div className="md:hidden">
          <button
            className={`md:hidden relative z-60 p-2 transition-colors ${textColor}`}
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
        className={`fixed inset-0 z-50 bg-white flex flex-col items-center justify-center gap-8 transition-transform duration-500 ease-in-out md:hidden ${
          isOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="flex flex-col items-center gap-4">
          <span className="text-sm uppercase tracking-widest text-gray-400 font-bold">Chi Siamo</span>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-4">
            {dropdownLinks.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)} className="text-xl font-medium text-black">
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="w-12 h-px bg-gray-200 my-4" />
        
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-2xl font-semibold text-black hover:text-blue-600 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            {link.name}
          </Link>
        ))}

        <Link
          href="/contattaci"
          onClick={() => setIsOpen(false)}
          className="mt-4 bg-black text-white px-10 py-4 rounded-full text-lg font-bold shadow-lg"
        >
          Contattaci
        </Link>
      </div>
    </nav>
  );
}
