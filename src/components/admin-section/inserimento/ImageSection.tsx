import Image from "next/image";

interface ImageProps {
  previews: string[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove: (index: number) => void;
}

export default function ImageSection({
  previews,
  onChange,
  onRemove,
}: ImageProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="ps-2 text-black font-bold">Foto Immobile</label>

      <div className="border-2 border-dashed border-gray-400 p-6 rounded-xl text-center">
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={onChange}
          className="hidden"
          id="file-upload"
        />
        <label
          htmlFor="file-upload"
          className="cursor-pointer text-blue-600 underline"
        >
          Clicca qui per selezionare le foto
        </label>
        <p className="text-xs text-gray-500 mt-1">
          Verranno caricate solo al momento del salvataggio
        </p>
      </div>
      {/* Anteprima Locale */}
      <div className="flex flex-wrap gap-2 mt-2">
        {previews.map((url, index) => (
          <div key={index} className="relative group">
            <Image
              src={url}
              width={50}
              height={50}
              alt="preview"
              className="w-24 h-24 object-cover rounded-lg border"
            />
            <button
              type="button"
              onClick={() => onRemove(index)}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs shadow-lg"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
