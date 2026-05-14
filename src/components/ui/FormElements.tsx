interface EnumSelectProps<T extends Record<string, string>> {
  label: string;
  name: string;
  enumObject: T;
  value?: string | number | null;
  onChange?: (value: string) => void;
  required?: boolean;
  placeholder?: string;
  className?: string;
  // Opzionale: un oggetto per mappare gli enum a nomi più belli
  customLabels?: Partial<Record<keyof T, string>>;
}

interface FieldProps {
  label: string;
  children: React.ReactNode;
  suffix?: string;
  className?: string;
  required?: boolean;
}

// Helper per gli input standard
export const Field = ({
  label,
  children,
  suffix,
  className = "",
  required = false,
}: FieldProps) => (
  <div className={`flex flex-col gap-1.5 ${className}`}>
    <label
      className={`ps-2 text-sm font-semibold text-gray-700 uppercase ${required && "required"}`}
    >
      {label}
    </label>
    <div className="flex">
      <div className="relative grow">{children}</div>
      {suffix && (
        <span className="flex items-center justify-center px-3 bg-gray-100 border-2 border-black border-s-0 rounded-e-xl font-bold text-gray-600">
          {suffix}
        </span>
      )}
    </div>
  </div>
);

export function EnumSelect<T extends Record<string, string>>({
  label,
  name,
  enumObject,
  value,
  onChange,
  required = false,
  placeholder = "Seleziona...",
  className = "w-full",
  customLabels,
}: EnumSelectProps<T>) {
  // Trasformiamo l'oggetto Enum in un array di stringhe
  const options = Object.values(enumObject);

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label
        htmlFor={name}
        className={`ps-2 text-sm font-semibold text-gray-700 uppercase ${required && "required"} `}
      >
        {label}
      </label>
      <select
        id={name}
        name={name}
        required={required}
        aria-required={required}
        value={value || ""}
        onChange={(e) => onChange?.(e.target.value)}
        className="py-2 px-3 bg-white border-2 border-black rounded-xl focus:ring-2 focus:ring-blue-500 outline-none uppercase"
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((value) => (
          <option key={value} value={value}>
            {/* Se esiste una label personalizzata la usiamo, altrimenti formattiamo il valore */}
            {customLabels?.[value as keyof T] ||
              value.charAt(0) + value.slice(1).toLowerCase().replace(/_/g, " ")}
          </option>
        ))}
      </select>
    </div>
  );
}
