import { CardProps } from "../types/card.types";
import Image from "next/image";

export default function Card({
  title,
  icon,
  imagePath,
  children,
  footer,
  styles = {},
}: CardProps) {
  const {
    iconColor = "text-blue-900",
    iconCenter = false,
    titleCenter = false,
    hasBorder = false,
    hasShadow = true,
    animate = true,
    circleImage = false,
  } = styles;

  return (
    <div
      className={`rounded-2xl flex flex-col gap-3 p-5 h-full ${hasShadow && "shadow-xl"} ${hasBorder && `border-t-3 ${iconColor}`} ${animate && "transition-all duration-300 hover:-translate-y-1.5"} w-full`}
    >
      {/* Icona */}
      {icon && (
        <div className={`${iconColor} size-15 mb-6 ${iconCenter && "mx-auto"}`}>
          {icon}
        </div>
      )}

      {/* Immagine */}
      {imagePath && (
        <div
          className={`relative mb-6 overflow-hidden ${circleImage ? "size-44 mx-auto rounded-full border-2 border-gray-100" : "w-full h-48 rounded-md"}`}
        >
          <Image src={imagePath} alt={title} fill className="object-cover" />
        </div>
      )}

      {/* Titolo */}
      <h3
        className={`text-xl font-semibold tracking-tight text-gray-900 mb-4 ${titleCenter && "text-center"}`}
      >
        {title}
      </h3>

      {/* Corpo (chldren) */}
      {children && (
        <div className="text-gray-600 leading-relaxed text-sm md:text-base grow">
          {children}
        </div>
      )}

      {/* Footer */}
      {footer && (
        <div className="mt-auto pt-6 border-t border-gray-100">{footer}</div>
      )}
    </div>
  );
}
