// src/app/admin/magazine/page.tsx
import Link from "next/link";
import { FormMagazine } from "@/components/admin-section/magazine/FormMagazine";

export default function AdminMagazinePage() {
  return (
    <main className="min-h-screen bg-[#F5F4F0] flex items-center justify-center p-6 md:p-12">
      <div className="w-full max-w-2xl bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-[#EAE8E3]">
        {/* Pulsante per tornare alla Dashboard Admin */}
        <Link
          href="/admin-login/landingpage"
          className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-[#8C857B] hover:text-[#3C3833] transition-colors mb-8"
        >
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Torna alla Dashboard
        </Link>

        {/* Header della pagina */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl md:text-3xl font-semibold uppercase tracking-wider text-[#3C3833] mb-2">
            Nuovo Numero Binòazine
          </h1>
          <p className="text-xs text-[#8C857B] max-w-md mx-auto leading-relaxed">
            Compila i campi e carica il file PDF. La pubblicazione notificherà
            automaticamente tutti gli iscritti alla newsletter.
          </p>
        </div>

        {/* Form Magazine */}
        <FormMagazine />
      </div>
    </main>
  );
}
