import {
  StatoImmobile,
  StatoOccupazione,
  ClasseEnergetica,
  ClasseCatastale,
} from "@/generated/prisma/enums";
import { EnumSelect } from "@/components/ui/FormElements";
import { FormSectionProps } from "@/types/formsection.types";

export default function StatoCertificazioniSection({
  formData,
  updateField,
}: FormSectionProps) {
  return (
    <div className="flex flex-col gap-6 p-6 bg-white border-2 border-black rounded-2xl shadow-sm">
      <h2 className="text-xl font-bold border-b-2 border-black pb-2">
        Stato & Certificazioni
      </h2>

      {/* RIGA 1: Stato dell'immobile e Occupazione */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <EnumSelect
          label="Stato Immobile"
          name="stato"
          value={formData?.stato}
          onChange={(val) => updateField("stato", val as StatoImmobile)}
          enumObject={StatoImmobile}
          placeholder="Es: Nuovo, Da ristrutturare..."
          required
        />

        <EnumSelect
          label="Stato Occupazione"
          name="statoOccupazione"
          value={formData?.statoOccupazione}
          onChange={(val) =>
            updateField("statoOccupazione", val as StatoOccupazione)
          }
          enumObject={StatoOccupazione}
          placeholder="Es: Libero, Affittato..."
          required
        />
      </div>

      {/* RIGA 2: Classificazioni Energetiche e Catastali */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <EnumSelect
          label="Classe Energetica"
          name="classeEnergetica"
          value={formData?.classeEnergetica}
          onChange={(val) =>
            updateField("classeEnergetica", val as ClasseEnergetica)
          }
          enumObject={ClasseEnergetica}
          placeholder="Seleziona classe..."
          required
        />

        <EnumSelect
          label="Classe Catastale"
          name="classeCatastale"
          value={formData?.classeCatastale}
          onChange={(val) =>
            updateField("classeCatastale", val as ClasseCatastale)
          }
          enumObject={ClasseCatastale}
          placeholder="Es: A/1, A/2..."
        />
      </div>
    </div>
  );
}
