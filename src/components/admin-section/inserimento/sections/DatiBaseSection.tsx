import { TipoImmobile, Contratto } from "@/generated/prisma/enums";
import { Field, EnumSelect } from "@/components/ui/FormElements";
import { FormSectionProps } from "@/types/formsection.types";

export default function DatiBaseSection({
  formData,
  updateField,
}: FormSectionProps) {
  return (
    <div className="flex flex-col gap-6 p-6 bg-white border-2 border-black rounded-2xl shadow-sm">
      <h2 className="text-xl font-bold border-b-2 border-black pb-2">
        Dati Base Immobile
      </h2>

      {/* RIGA 1: Nome (occupa più spazio) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Field label="Nome Immobile" className="md:col-span-2" required>
          <input
            required
            aria-required="true"
            name="nome"
            type="text"
            value={formData?.nome || ""}
            onChange={(e) => updateField("nome", e.target.value)}
            placeholder="Es: Bilocale vista mare"
            className="w-full py-2 px-3 border-2 border-black rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
          />
        </Field>

        <EnumSelect
          label="Tipo Immobile"
          name="tipo"
          value={formData?.tipo}
          onChange={(val) => updateField("tipo", val as TipoImmobile)}
          enumObject={TipoImmobile}
          required
        />
      </div>

      {/* RIGA 2: Economia e Contratto */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Field label="Prezzo" suffix="€" required>
          <input
            required
            aria-required="true"
            name="prezzo"
            type="number"
            value={formData?.prezzo ?? ""}
            onChange={(e) =>
              updateField(
                "prezzo",
                e.target.value === "" ? 0 : Number(e.target.value),
              )
            }
            className="w-full py-2 px-3 border-2 border-black rounded-s-xl outline-none"
          />
        </Field>

        <Field label="Spese Condominiali" suffix="€">
          <input
            name="speseCondominiali"
            type="number"
            value={formData?.speseCondominiali || ""}
            onChange={(e) =>
              updateField(
                "speseCondominiali",
                e.target.value === "" ? 0 : Number(e.target.value),
              )
            }
            placeholder="0"
            className="w-full py-2 px-3 border-2 border-black rounded-s-xl outline-none"
          />
        </Field>

        <EnumSelect
          label="Contratto"
          name="contratto"
          value={formData?.contratto || ""}
          onChange={(val) => updateField("contratto", val as Contratto)}
          enumObject={Contratto}
          required
          aria-required="true"
        />
      </div>

      {/* RIGA 3: Caratteristiche Fisiche */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Field label="Metratura" suffix="m²" required>
          <input
            required
            aria-required="true"
            name="metratura"
            value={formData?.metratura || ""}
            onChange={(e) =>
              updateField(
                "metratura",
                e.target.value === "" ? 0 : Number(e.target.value),
              )
            }
            type="number"
            className="w-full py-2 px-3 border-2 border-black rounded-s-xl outline-none"
          />
        </Field>

        <Field label="Anno Costruzione" required>
          <input
            required
            aria-required="true"
            name="annoCostruzione"
            type="number"
            value={formData?.annoCostruzione || ""}
            onChange={(e) =>
              updateField(
                "annoCostruzione",
                e.target.value === "" ? 0 : Number(e.target.value),
              )
            }
            placeholder="YYYY"
            className="w-full py-2 px-3 border-2 border-black rounded-xl outline-none"
          />
        </Field>

        <Field label="Locali" required>
          <input
            required
            aria-required="true"
            name="numeroLocali"
            type="number"
            value={formData?.numeroLocali || ""}
            onChange={(e) =>
              updateField(
                "numeroLocali",
                e.target.value === "" ? 0 : Number(e.target.value),
              )
            }
            className="w-full py-2 px-3 border-2 border-black rounded-xl outline-none"
          />
        </Field>

        <Field label="Bagni" required>
          <input
            required
            aria-required="true"
            name="numeroBagni"
            type="number"
            value={formData?.numeroBagni || ""}
            onChange={(e) =>
              updateField(
                "numeroBagni",
                e.target.value === "" ? 0 : Number(e.target.value),
              )
            }
            className="w-full py-2 px-3 border-2 border-black rounded-xl outline-none"
          />
        </Field>
      </div>

      {/* RIGA 4: Piano e Posizione */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Field label="Piano">
          <input
            name="piano"
            type="text"
            value={formData?.piano || ""}
            onChange={(e) => updateField("piano", e.target.value)}
            placeholder="Es: 1, 2, T, S1"
            className="w-full py-2 px-3 border-2 border-black rounded-xl outline-none"
          />
        </Field>

        <Field label="Totale Piani">
          <input
            name="totalePiani"
            type="number"
            value={formData?.totalePiani || ""}
            onChange={(e) =>
              updateField(
                "totalePiani",
                e.target.value === "" ? 0 : Number(e.target.value),
              )
            }
            className="w-full py-2 px-3 border-2 border-black rounded-xl outline-none"
          />
        </Field>
      </div>
    </div>
  );
}
