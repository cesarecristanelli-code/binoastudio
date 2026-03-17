import Image from "next/image";
import { ReactNode } from "react";

export interface CardStyle {
  cardClasses?: string;
  titleClasses?: string;
  childrenClasses?: string;
  footerClasses?: string;
}

interface CardProps {
  title: string;
  imagePath: string;
  children?: string | ReactNode;
  footer?: string | ReactNode;
  style?: CardStyle;
}

export default function Card({
  title,
  imagePath,
  children,
  footer,
  style = {},
}: CardProps): ReactNode {
  const {
    titleClasses = "text-[#5C5854]",
    childrenClasses = "text-[#332F2C]",
    footerClasses = "text-gray-500",
    cardClasses = "bg-[rgb(242,238,232)]",
  } = style;

  return (
    <div
      className={` my-10 flex flex-col md:flex-row gap-2 rounded-2xl max-w-lg p-3 overflow-hidden ${cardClasses}`}
    >
      {/* Immagine */}
      <div className="relative w-full md:w-1/3 min-h-50">
        <Image
          src={imagePath}
          alt={title}
          fill
          className="object-cover rounded-xl"
        />
      </div>

      {/* Corpo */}
      <div className="flex flex-col p-3 md:w-2/3">
        <h3 className={`font-arvo p-3 tracking-wider ${titleClasses}`}>
          {title}
        </h3>
        {children && (
          <p className={`mb-4 leading-relaxed ${childrenClasses}`}>
            {children}
          </p>
        )}

        {/* Footer */}
        {footer && (
          <div className={`mt-auto border-t pt-2 text-sm ${footerClasses}`}>
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
