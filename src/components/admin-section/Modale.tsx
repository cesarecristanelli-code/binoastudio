interface ModaleProps {
  config: {
    isOpen: boolean;
    type: "regione" | "provincia" | "comune" | "zona";
    parentId?: string;
  };
  data: {
    nome: string;
    sigla: string;
    cap: string;
  };
  setConfig: (config: ModaleProps["config"]) => void;
  setData: (data: ModaleProps["data"]) => void;
  handleSave: () => void;
}

export default function Modale({
  config,
  data,
  setConfig,
  setData,
  handleSave,
}: ModaleProps) {
  if (!config.isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-200 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={() => setConfig({ ...config, isOpen: false })}
    >
      <div
        className="bg-white border-4 border-black p-6 rounded-2xl w-full max-w-md shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-xl font-bold mb-4 uppercase">
          Aggiungi {config.type}
        </h3>

        <div className="flex flex-col gap-4">
          {/* Campo Nome (Sempre presente) */}
          <input
            className="p-2 border-2 border-black rounded-lg"
            placeholder="Nome..."
            value={data.nome}
            onChange={(e) => setData({ ...data, nome: e.target.value })}
          />

          {/* Campo Sigla (Solo per Provincia) */}
          {config.type === "provincia" && (
            <input
              className="p-2 border-2 border-black rounded-lg"
              placeholder="Sigla (es. VR)"
              maxLength={2}
              value={data.sigla}
              onChange={(e) =>
                setData({ ...data, sigla: e.target.value.toUpperCase() })
              }
            />
          )}

          {/* Campo CAP (Per Comune o Zona) */}
          {(config.type === "comune" || config.type === "zona") && (
            <input
              className="p-2 border-2 border-black rounded-lg"
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
              onClick={handleSave}
              className="grow py-2 bg-green-400 border-2 border-black font-bold rounded-lg hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
            >
              SALVA
            </button>
            <button
              onClick={() => setConfig({ ...config, isOpen: false })}
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
