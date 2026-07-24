// src/app/admin/page.tsx
import Link from "next/link";

export default function AdminDashboardPage() {
  return (
    <main className="min-h-screen bg-[#F5F4F0] text-[#3C3833] py-20 px-6 md:px-20">
      <div className="max-w-4xl mx-auto">
        {/* Header Dashboard */}
        <div className="mb-12 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8C857B] mb-2">
            Area Riservata
          </p>
          <h1 className="text-3xl md:text-4xl font-semibold uppercase tracking-wider">
            Pannello di Controllo
          </h1>
        </div>

        {/* Griglia Selezione Azioni */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card Gestione Immobili */}
          <Link
            href="/admin-login/form-inserimento-immobili"
            className="group relative bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-[#EAE8E3] flex flex-col justify-between h-64"
          >
            <div>
              <div className="w-12 h-12 bg-[#F5F4F0] rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#3C3833] group-hover:text-white transition-colors duration-300">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.75}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-semibold uppercase tracking-wide mb-2">
                Gestione Immobili
              </h2>
              <p className="text-sm text-[#5A554E] leading-relaxed">
                Inserisci nuovi immobili sul sito o modifica il catalogo
                esistente.
              </p>
            </div>

            <div className="flex items-center text-xs font-semibold uppercase tracking-wider group-hover:translate-x-1 transition-transform duration-200">
              Vai al form
              <svg
                className="w-4 h-4 ml-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </div>
          </Link>

          {/* Card Gestione Binòazine */}
          <Link
            href="/admin-login/form-inserimento-magazine"
            className="group relative bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-[#EAE8E3] flex flex-col justify-between h-64"
          >
            <div>
              <div className="w-12 h-12 bg-[#F5F4F0] rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#3C3833] group-hover:text-white transition-colors duration-300">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.75}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-semibold uppercase tracking-wide mb-2">
                Gestione Binòazine
              </h2>
              <p className="text-sm text-[#5A554E] leading-relaxed">
                Carica un nuovo numero del magazine in PDF e invia la newsletter
                agli iscritti.
              </p>
            </div>

            <div className="flex items-center text-xs font-semibold uppercase tracking-wider group-hover:translate-x-1 transition-transform duration-200">
              Vai al form
              <svg
                className="w-4 h-4 ml-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
}
