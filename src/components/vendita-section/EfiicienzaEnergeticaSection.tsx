import { ClasseEnergetica, Riscaldamento } from "@/generated/prisma/client";

const CLASSI_ENERGETICHE = [
  { label: "A4", color: "bg-[#00823e]" },
  { label: "A3", color: "bg-[#00a651]" },
  { label: "A2", color: "bg-[#53b348]" },
  { label: "A1", color: "bg-[#8dc63f]" },
  { label: "B", color: "bg-[#d7df23]" },
  { label: "C", color: "bg-[#fff200]" },
  { label: "D", color: "bg-[#fdb913]" },
  { label: "E", color: "bg-[#f7941d]" },
  { label: "F", color: "bg-[#f15a24]" },
  { label: "G", color: "bg-[#ee1c24]" },
];

interface Props {
  classe: ClasseEnergetica; // Il valore che arriva dal DB (es. "A4" o "G")
  annoCostruzione: number;
  riscaldamento: Riscaldamento;
}

export default function EfficienzaEnergeticaSection({
  classe,
  annoCostruzione,
  riscaldamento,
}: Props) {
  // Troviamo l'indice della classe attuale per evidenziarla
  const currentIndex = CLASSI_ENERGETICHE.findIndex((c) => c.label === classe);

  return (
    <section className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-6">
      <div className="flex items-center gap-2 text-green-700">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 3.5 1 8h-3c1.2 1.5 1.4 3.4 1.2 5.1A7 7 0 0 1 11 20Z" />
          <path d="M7 20v-2" />
          <path d="M15 20v-2" />
        </svg>
        <h2 className="text-xl font-bold text-slate-800">
          Efficienza energetica
        </h2>
      </div>

      {/* LA BARRA COLORATA */}
      <div className="relative pt-8 pb-2">
        <div className="flex w-full h-8 rounded-sm overflow-hidden opacity-30">
          {CLASSI_ENERGETICHE.map((item) => (
            <div
              key={item.label}
              className={`flex-1 ${item.color} border-r border-white last:border-0`}
            />
          ))}
        </div>

        {/* L'INDICATORE DELLA CLASSE ATTUALE */}
        {currentIndex !== -1 && (
          <div
            className="absolute top-0 transition-all duration-500 ease-out"
            style={{
              left: `${(currentIndex / CLASSI_ENERGETICHE.length) * 100}%`,
              width: `${100 / CLASSI_ENERGETICHE.length}%`,
            }}
          >
            <div
              className={`h-10 -mt-1 shadow-lg flex items-center justify-center text-white font-bold text-sm rounded-sm ${CLASSI_ENERGETICHE[currentIndex].color} ring-2 ring-white`}
            >
              {classe}
            </div>
          </div>
        )}
      </div>

      {/* DETTAGLI AGGIUNTIVI SOTTO LA BARRA */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 pt-4 border-t border-gray-50">
        <div className="flex justify-between md:justify-start md:gap-12 text-sm">
          <span className="text-gray-500">Anno di costruzione:</span>
          <span className="font-bold text-slate-800">{annoCostruzione}</span>
        </div>
        <div className="flex justify-between md:justify-start md:gap-12 text-sm">
          <span className="text-gray-500">Riscaldamento:</span>
          <span className="font-bold text-slate-800 uppercase">
            {riscaldamento.toLowerCase()}
          </span>
        </div>
        {/* Puoi aggiungere altri campi qui come 'Tipo impianto' se li hai nel DB */}
      </div>
    </section>
  );
}
