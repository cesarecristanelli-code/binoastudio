import { Media } from "@/types/inserimentoHooks.types";
import Image from "next/image";

export default function ImageSection({ media }: { media: Media }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="ps-2 text-black font-bold">Foto Immobile</label>

      <div className="border-2 border-dashed border-gray-400 p-6 rounded-xl text-center">
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={media.handleFileChange}
          className="hidden"
          id="file-upload"
        />
        <label
          htmlFor="file-upload"
          className="cursor-pointer text-blue-600 underline"
        >
          Clicca qui per selezionare le foto{" "}
          <span className="text-red-500">*</span>
        </label>
        <p className="text-xs text-gray-500 mt-1">
          Verranno caricate solo al momento del salvataggio
        </p>
      </div>
      {/* Anteprima Locale */}
      <div className="flex flex-wrap gap-3 mt-2">
        {/* --- 1. IMMAGINI GIÀ ESISTENTI (OLD) --- */}
        {media.oldImages &&
          media.oldImages.map((url, index) => (
            <div key={`old-${index}`} className="relative group">
              <Image
                src={url}
                width={100}
                height={100}
                alt="Immagine salvata"
                className="w-24 h-24 object-cover rounded-lg border-2 border-blue-500 shadow-sm"
              />
              {/* Badge opzionale per chiarezza */}
              <span className="absolute bottom-0 left-0 right-0 bg-blue-500 text-[8px] text-white text-center rounded-b-md py-0.5 uppercase font-bold">
                Salvata
              </span>
              <button
                type="button"
                onClick={() => media.removeOldImage(url)}
                className="absolute -top-2 -right-2 bg-gray-800 hover:bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs shadow-lg transition-colors"
                title="Rimuovi immagine esistente"
              >
                ✕
              </button>
            </div>
          ))}

        {/* --- 2. ANTEPRIMA NUOVE FOTO (FILES) --- */}
        {media.previews.map((url, index) => (
          <div key={`new-${index}`} className="relative group">
            <Image
              src={url}
              width={100}
              height={100}
              alt="Nuova preview"
              className="w-24 h-24 object-cover rounded-lg border-2 border-green-500 shadow-sm"
            />
            <span className="absolute bottom-0 left-0 right-0 bg-green-500 text-[8px] text-white text-center rounded-b-md py-0.5 uppercase font-bold">
              Nuova{" "}
            </span>
            <button
              type="button"
              onClick={() => media.removeFile(index)}
              className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-700 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs shadow-lg transition-colors"
              title="Rimuovi nuova foto"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
