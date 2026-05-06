import { Riscaldamento, Raffrescamento } from "@/generated/prisma/enums";
import { Field, EnumSelect } from "@/components/ui/FormElements";
import { FormSectionProps } from "@/types/formsection.types";

export default function OpzioniComfortSection({
  formData,
  updateField,
}: FormSectionProps) {
  return (
    <div className="flex flex-col gap-6 p-6 bg-white border-2 border-black rounded-2xl shadow-sm">
      <h2 className="text-xl font-bold border-b-2 border-black pb-2">
        Comfort & Pertinenze
      </h2>

      {/* RIGA 1: Checkbox (Boolean) */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 bg-slate-50 p-4 rounded-xl border border-gray-200">
        <label className="flex items-center gap-2 cursor-pointer group">
          <input
            type="checkbox"
            name="ascensore"
            checked={formData?.ascensore || false}
            onChange={(e) => updateField("ascensore", e.target.checked)}
            className="w-5 h-5 accent-black"
          />
          <span className="text-sm font-medium group-hover:underline">
            Ascensore
          </span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer group">
          <input
            type="checkbox"
            name="giardino"
            checked={formData?.giardino || false}
            onChange={(e) => updateField("giardino", e.target.checked)}
            className="w-5 h-5 accent-black"
          />
          <span className="text-sm font-medium group-hover:underline">
            Giardino
          </span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer group">
          <input
            type="checkbox"
            name="arredo"
            checked={formData?.arredo || false}
            onChange={(e) => updateField("arredo", e.target.checked)}
            className="w-5 h-5 accent-black"
          />
          <span className="text-sm font-medium group-hover:underline">
            Arredo
          </span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer group">
          <input
            type="checkbox"
            name="accessoDisabili"
            checked={formData?.accessoDisabili || false}
            onChange={(e) => updateField("accessoDisabili", e.target.checked)}
            className="w-5 h-5 accent-black"
          />
          <span className="text-sm font-medium group-hover:underline">
            Accesso Disabili
          </span>
        </label>
      </div>

      {/* RIGA 2: Numerici (Balconi, Terrazzi, Posti Auto) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Field label="N. Balconi">
          <input
            name="numeroBalconi"
            type="number"
            value={formData?.numeroBalconi || ""}
            onChange={(e) =>
              updateField(
                "numeroBalconi",
                e.target.value === "" ? 0 : Number(e.target.value),
              )
            }
            className="w-full py-2 px-3 border-2 border-black rounded-xl outline-none"
          />
        </Field>

        <Field label="N. Terrazzi">
          <input
            name="numeroTerrazzi"
            type="number"
            value={formData?.numeroTerrazzi || ""}
            onChange={(e) =>
              updateField(
                "numeroTerrazzi",
                e.target.value === "" ? 0 : Number(e.target.value),
              )
            }
            className="w-full py-2 px-3 border-2 border-black rounded-xl outline-none"
          />
        </Field>

        <Field label="Box Auto">
          <input
            name="boxAuto"
            type="number"
            value={formData?.boxAuto || ""}
            onChange={(e) =>
              updateField(
                "boxAuto",
                e.target.value === "" ? 0 : Number(e.target.value),
              )
            }
            className="w-full py-2 px-3 border-2 border-black rounded-xl outline-none"
          />
        </Field>

        <Field label="Posti Auto">
          <input
            name="postiAuto"
            type="number"
            value={formData?.postiAuto || ""}
            onChange={(e) =>
              updateField(
                "postiAuto",
                e.target.value === "" ? 0 : Number(e.target.value),
              )
            }
            className="w-full py-2 px-3 border-2 border-black rounded-xl outline-none"
          />
        </Field>
      </div>

      {/* RIGA 3: Riscaldamento e Raffrescamento (Enum) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <EnumSelect
          label="Riscaldamento"
          name="riscaldamento"
          value={formData?.riscaldamento}
          onChange={(val) => updateField("riscaldamento", val as Riscaldamento)}
          enumObject={Riscaldamento}
          placeholder="Tipo di riscaldamento..."
        />

        <EnumSelect
          label="Raffrescamento"
          name="raffrescamento"
          value={formData?.raffrescamento}
          onChange={(val) =>
            updateField("raffrescamento", val as Raffrescamento)
          }
          enumObject={Raffrescamento}
          placeholder="Tipo di raffrescamento..."
        />
      </div>
    </div>
  );
}
