import { useInserimentoHooks } from "./useInserimentoHooks";

export default function GeoSection({
  logic,
}: {
  logic: ReturnType<typeof useInserimentoHooks>;
}) {
  return (
    <>
      {/* Regione */}
      <div className="flex flex-col gap-2">
        <label htmlFor="regioneId" className="ps-2 text-black">
          Regione
        </label>
        <div className="flex gap-2">
          <select
            name="regioneId"
            onChange={(e) => logic.handleRegioneChange(e.target.value)}
            className="w-72 py-2 px-3 bg-white border-2 border-black rounded-xl"
          >
            <option value="">Seleziona Regione</option>
            {logic.regioni.map((r) => (
              <option key={r.id} value={r.id}>
                {r.nome}
              </option>
            ))}
          </select>

          {/* Bottone + */}
          <button
            type="button"
            onClick={() =>
              logic.setModalConfig((prev) => ({
                ...prev,
                isOpen: true,
                type: "regione",
              }))
            }
            className="w-10 h-10 border-2 border-black rounded-xl hover:bg-gray-300 transition-colors cursor-pointer"
          >
            +
          </button>
        </div>
      </div>

      {/* Provincia */}
      <div className="flex flex-col gap-2">
        <label htmlFor="provinciaId" className="ps-2 text-black">
          Provincia
        </label>
        <div className="flex gap-2">
          <select
            name="provinciaId"
            disabled={logic.province.length === 0}
            onChange={(e) => logic.handleProvinciaChange(e.target.value)}
            className="w-72 py-2 px-3 bg-white border-2 border-black rounded-xl disabled:bg-gray-100 disabled:border-gray-300 disabled:text-gray-400"
          >
            <option value="">Seleziona Provincia</option>
            {logic.province.map((p) => (
              <option key={p.id} value={p.id}>
                {p.nome}
              </option>
            ))}
          </select>

          {/* Bottone + */}
          <button
            type="button"
            disabled={logic.modalConfig.parentId === undefined}
            onClick={() =>
              logic.setModalConfig((prev) => ({
                ...prev,
                isOpen: true,
                type: "provincia",
              }))
            }
            className="w-10 h-10 border-2 border-black rounded-xl hover:bg-gray-300 transition-colors cursor-pointer"
          >
            +
          </button>
        </div>
      </div>

      {/* Comune */}
      <div className="flex flex-col gap-2 relative">
        <label className="ps-2 text-black">Comune</label>

        <div className="flex gap-2">
          <div className="relative grow">
            <input
              type="text"
              value={logic.searchComune}
              onChange={(e) => {
                logic.setSearchComune(e.target.value);
                logic.setSelectedComuneId(""); // Se ricomincia a scrivere, resetta la selezione
              }}
              placeholder={
                logic.allComuni.length > 0
                  ? "Inizia a scrivere il comune..."
                  : "Seleziona prima una provincia"
              }
              disabled={logic.allComuni.length === 0}
              className="w-full py-2 px-3 bg-white border-2 border-black rounded-xl disabled:bg-gray-100 disabled:border-gray-300 disabled:text-gray-400"
            />

            {/* Menu a discesa dei risultati */}
            {logic.filteredComuni.length > 0 && !logic.selectedComuneId && (
              <ul className="absolute z-1001 w-full bg-white border-2 border-black rounded-xl mt-1 max-h-60 overflow-y-auto shadow-xl">
                {logic.filteredComuni.map((c) => (
                  <li
                    key={c.id}
                    onClick={() => {
                      logic.setSearchComune(c.nome);
                      logic.setSelectedComuneId(c.id);
                      logic.handleComuneChange(c.id); // Funzione per caricare le zone
                      console.log(c.nome);
                    }}
                    className="px-4 py-2 hover:bg-blue-100 cursor-pointer border-b last:border-none border-gray-100"
                  >
                    {c.nome}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Bottone "+" per aggiungere comune */}
          <button
            type="button"
            disabled={logic.modalConfig.parentId === undefined}
            onClick={() =>
              logic.setModalConfig((prev) => ({
                ...prev,
                isOpen: true,
                type: "comune",
              }))
            }
            className="w-10 h-10 border-2 border-black rounded-xl hover:bg-gray-300 transition-colors cursor-pointer"
          >
            +
          </button>
        </div>

        {/* Campo nascosto per inviare l'ID al server tramite FormData */}
        <input type="hidden" name="comuneId" value={logic.selectedComuneId} />
      </div>

      {/* Zona */}
      <div className="flex flex-col gap-2 relative">
        <label className="ps-2 text-black">Zona / Quartiere</label>

        <div className="flex gap-2">
          <div className="relative grow">
            {/* Se il comune ha zone, mostriamo l'input di ricerca */}
            {logic.allZone.length > 0 ? (
              <>
                <input
                  type="text"
                  className="w-full py-2 px-3 border-2 border-black rounded-xl outline-none"
                  placeholder="Inizia a scrivere la zona..."
                  value={logic.searchZona}
                  onChange={(e) => {
                    logic.setSearchZona(e.target.value);
                    logic.setSelectedZonaId(""); // Se l'utente ricomincia a scrivere, resettiamo l'ID
                  }}
                />

                {/* Menu Suggerimenti */}
                {logic.filteredZone.length > 0 && (
                  <ul className="absolute z-100 w-full bg-white border-2 border-black rounded-xl mt-1 max-h-48 overflow-y-auto shadow-2xl">
                    {logic.filteredZone.map((z) => (
                      <li
                        key={z.id}
                        className="px-4 py-2 hover:bg-blue-50 cursor-pointer border-b last:border-none"
                        onClick={() => {
                          logic.setSearchZona(z.nome);
                          logic.setSelectedZonaId(z.id);
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
                  !logic.selectedComuneId
                    ? "Seleziona prima un comune"
                    : logic.checkedZona
                      ? "Caricamento zone in corso..."
                      : "Nessuna zona censita per questo comune"
                }
              />
            )}
          </div>

          {/* Bottone per aggiungere una zona mancante */}
          <button
            type="button"
            disabled={logic.modalConfig.parentId === undefined}
            onClick={() =>
              logic.setModalConfig((prev) => ({
                ...prev,
                isOpen: true,
                type: "zona",
              }))
            }
            className="w-10 h-10 border-2 border-black rounded-xl hover:bg-gray-300 transition-colors cursor-pointer"
          >
            +
          </button>
        </div>

        {/* L'ID che verrà inviato effettivamente al server */}
        <input type="hidden" name="zonaId" value={logic.selectedZonaId} />
      </div>
    </>
  );
}
