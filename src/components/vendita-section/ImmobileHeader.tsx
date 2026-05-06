import { LayoutTemplate, Bath, MapPin } from "lucide-react";
import { ArrowsPointingOutIcon } from "@heroicons/react/24/outline";

interface ImmobileHeaderProps {
  prezzo: number;
  nome: string;
  metratura: number;
  numeroBagni: number;
  numeroLocali: number;
  comune: string;
  zona?: string | null;
}

export default function ImmobileHeader({
  prezzo,
  nome,
  metratura,
  numeroBagni,
  numeroLocali,
  comune,
  zona,
}: ImmobileHeaderProps) {
  return (
    <div className="w-full flex flex-col md:flex-row items-stretch border-b pb-6 mb-6">
      {/* COLONNA SINISTRA: Titolo e Località */}
      <div className="flex-1 flex flex-col justify-center pl-0 md:pl-8">
        <h1 className="text-3xl font-bold text-slate-800 leading-tight mb-2">
          {nome}
        </h1>
        <div className="flex items-center gap-2 text-slate-500">
          <MapPin className="size-4 text-red-800" />
          <span className="text-lg">
            {comune} {zona ? `- ${zona}` : ""}
          </span>
        </div>
      </div>

      {/* BORDO VERTICALE (solo su desktop) */}
      <div className="hidden md:block w-px bg-slate-200 self-stretch mx-2" />

      {/* COLONNA DESTRA: Prezzo e Icone Rapide */}
      <div className="flex-1 flex flex-col justify-center pr-0 md:pr-8 mb-4 md:mb-0">
        <div className="text-4xl font-bold text-slate-800 mb-3">
          {new Intl.NumberFormat("it-IT", {
            style: "currency",
            currency: "EUR",
            maximumFractionDigits: 0,
          }).format(prezzo)}
        </div>

        <div className="flex flex-row items-center gap-4 text-slate-500">
          <div className="flex items-center gap-1.5">
            <LayoutTemplate className="size-5 text-green-800" />
            <span className="text-sm font-medium">
              {numeroLocali} {numeroLocali === 1 ? "locale" : "locali"}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <ArrowsPointingOutIcon className="size-5 text-yellow-600" />
            <span className="text-sm font-medium">{metratura} Mq</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Bath className="size-5 text-blue-800" />
            <span className="text-sm font-medium">
              {numeroBagni} {numeroBagni === 1 ? "bagno" : "bagni"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
