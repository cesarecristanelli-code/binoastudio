import { Comune, Provincia, Regione, Zona } from "@/generated/prisma/client";
import { Admin } from "@/types/inserimentoHooks.types";

export default function Modale({
  admin,
  onSuccess,
}: {
  admin: Admin;
  onSuccess: (
    newItem: Regione | Provincia | Comune | Zona,
    type: string,
  ) => void;
}) {
  const {
    modalConfig: config,
    newData: data,
    setNewData: setData,
    closeModal,
    handleSaveNewItem,
  } = admin;

  if (!config.isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-200 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={closeModal}
    >
      <div
        className="bg-white border-4 border-black p-6 rounded-2xl w-full max-w-md shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-xl font-bold mb-4 uppercase">
          Aggiungi {config.type}
        </h3>

        <div className="flex flex-col gap-4">
          {/* Nome */}
          <input
            className="p-2 border-2 border-black rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Nome..."
            value={data.nome}
            onChange={(e) => setData({ ...data, nome: e.target.value })}
          />

          {/* Sigla (Solo Provincia) */}
          {config.type === "provincia" && (
            <input
              className="p-2 border-2 border-black rounded-lg outline-none"
              placeholder="Sigla (es. VR)"
              maxLength={2}
              value={data.sigla}
              onChange={(e) =>
                setData({ ...data, sigla: e.target.value.toUpperCase() })
              }
            />
          )}

          {/* CAP (Comune o Zona) */}
          {(config.type === "comune" || config.type === "zona") && (
            <input
              className="p-2 border-2 border-black rounded-lg outline-none"
              placeholder="CAP (facoltativo)"
              maxLength={5}
              value={data.cap}
              onChange={(e) =>
                setData({
                  ...data,
                  cap: e.target.value.replace(/\D/g, ""),
                })
              }
            />
          )}

          <div className="flex gap-2 mt-2">
            <button
              type="button"
              onClick={() => handleSaveNewItem(onSuccess)}
              className="grow py-2 bg-green-400 border-2 border-black font-bold rounded-lg hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
            >
              SALVA
            </button>
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 bg-gray-200 border-2 border-black font-bold rounded-lg"
            >
              ANNULLA
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
