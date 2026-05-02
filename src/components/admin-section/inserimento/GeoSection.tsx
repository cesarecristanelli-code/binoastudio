import { Admin, Geo } from "@/types/inserimentoHooks.types";

const GeoField = ({
  label,
  children,
  onAdd,
  disabledAdd,
}: {
  label: string;
  children: React.ReactNode;
  onAdd: () => void;
  disabledAdd: boolean;
}) => (
  <div className="flex flex-col gap-2">
    <label className="ps-2 text-black font-medium">{label}</label>
    <div className="flex gap-2">
      <div className="relative grow">{children}</div>
      <button
        type="button"
        disabled={disabledAdd}
        onClick={onAdd}
        className="w-10 h-10 border-2 border-black rounded-xl hover:bg-gray-300 transition-colors cursor-pointer disabled:opacity-50"
      >
        +
      </button>
    </div>
  </div>
);

export default function GeoSection({ geo, admin }: { geo: Geo; admin: Admin }) {
  return (
    <div className="grid grid-cols-1 gap-4">
      {/* Regione */}
      <GeoField
        label="Regione"
        onAdd={() => admin.openModal("regione")}
        disabledAdd={false}
      >
        <select
          name="regioneId"
          onChange={(e) => geo.handleRegioneChange(e.target.value)}
          className="w-72 py-2 px-3 bg-white border-2 border-black rounded-xl"
        >
          <option value="">Seleziona Regione</option>
          {geo.regioni.map((r) => (
            <option key={r.id} value={r.id}>
              {r.nome}
            </option>
          ))}
        </select>
      </GeoField>

      {/* Provincia */}
      <GeoField
        label="Provincia"
        onAdd={() => admin.openModal("provincia", geo.selectedRegioneId)}
        disabledAdd={geo.selectedProvinciaId === ""}
      >
        <select
          name="provinciaId"
          disabled={geo.selectedRegioneId === ""}
          onChange={(e) => geo.handleProvinciaChange(e.target.value)}
          className="w-72 py-2 px-3 bg-white border-2 border-black rounded-xl disabled:bg-gray-100 disabled:border-gray-300 disabled:text-gray-400"
        >
          <option value="">Seleziona Provincia</option>
          {geo.province.map((p) => (
            <option key={p.id} value={p.id}>
              {p.nome}
            </option>
          ))}
        </select>
      </GeoField>

      {/* Comune */}
      <GeoField
        label="Comune"
        onAdd={() => admin.openModal("comune", geo.selectedProvinciaId)}
        disabledAdd={geo.selectedProvinciaId === ""}
      >
        <input
          type="text"
          value={geo.searchComune}
          onChange={(e) => {
            geo.setSearchComune(e.target.value);
            geo.setSelectedComuneId(""); // Se ricomincia a scrivere, resetta la selezione
          }}
          placeholder={
            geo.allComuni.length > 0
              ? "Inizia a scrivere il comune..."
              : "Seleziona prima una provincia"
          }
          disabled={geo.selectedProvinciaId === ""}
          className="w-full py-2 px-3 bg-white border-2 border-black rounded-xl disabled:bg-gray-100 disabled:border-gray-300 disabled:text-gray-400"
        />

        {/* Menu a discesa dei risultati */}
        {geo.filteredComuni.length > 0 && !geo.selectedComuneId && (
          <ul className="absolute z-1001 w-full bg-white border-2 border-black rounded-xl mt-1 max-h-60 overflow-y-auto shadow-xl">
            {geo.filteredComuni.map((c) => (
              <li
                key={c.id}
                onClick={() => {
                  geo.setSearchComune(c.nome);
                  geo.setSelectedComuneId(c.id);
                  geo.handleComuneChange(c.id); // Funzione per caricare le zone
                  console.log(c.nome);
                }}
                className="px-4 py-2 hover:bg-blue-100 cursor-pointer border-b last:border-none border-gray-100"
              >
                {c.nome}
              </li>
            ))}
          </ul>
        )}
      </GeoField>

      {/* Zona */}
      <GeoField
        label="Zona"
        onAdd={() => admin.openModal("zona", geo.selectedComuneId)}
        disabledAdd={geo.selectedComuneId === ""}
      >
        <div className="flex gap-2">
          <div className="relative grow">
            {/* Se il comune ha zone, mostriamo l'input di ricerca */}
            {geo.allZone.length > 0 ? (
              <>
                <input
                  type="text"
                  className="w-full py-2 px-3 border-2 border-black rounded-xl outline-none"
                  placeholder="Inizia a scrivere la zona..."
                  value={geo.searchZona}
                  onChange={(e) => {
                    geo.setSearchZona(e.target.value);
                    geo.setSelectedZonaId(""); // Se l'utente ricomincia a scrivere, resettiamo l'ID
                  }}
                />

                {/* Menu Suggerimenti */}
                {geo.filteredZone.length > 0 && (
                  <ul className="absolute z-100 w-full bg-white border-2 border-black rounded-xl mt-1 max-h-48 overflow-y-auto shadow-2xl">
                    {geo.filteredZone.map((z) => (
                      <li
                        key={z.id}
                        className="px-4 py-2 hover:bg-blue-50 cursor-pointer border-b last:border-none"
                        onClick={() => {
                          geo.setSearchZona(z.nome);
                          geo.setSelectedZonaId(z.id);
                        }}
                      >
                        {z.nome}
                      </li>
                    ))}
                  </ul>
                )}
              </>
            ) : (
              /* Se il comune NON ha zone (o non è selezionato), mostriamo un input disabilitato parlante */
              <input
                type="text"
                disabled
                className="w-full py-2 px-3 border-2 border-gray-200 bg-gray-50 rounded-xl italic text-gray-400 cursor-not-allowed"
                value={
                  !geo.selectedComuneId
                    ? "Seleziona prima un comune"
                    : geo.checkedZona
                      ? "Caricamento zone in corso..."
                      : "Nessuna zona censita per questo comune"
                }
              />
            )}
          </div>
        </div>
      </GeoField>
    </div>
  );
}
