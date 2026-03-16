import Image from "next/image";
import { ReactNode } from "react";

interface CardStyle {
  cardBackground?: string;
  titleClasses?: string;
  childrenClasses?: string;
  footerClasses?: string;
}

interface CardProps {
  title: string;
  imageURL: string;
  children: string | ReactNode;
  footer?: string | ReactNode;
  style?: CardStyle;
}

export default function Card({
  title,
  imageURL,
  children,
  footer,
  style = {},
}: CardProps) {
  const {
    titleClasses = "text-[#5C5854]",
    childrenClasses = "text-[#332F2C]",
    footerClasses = "text-gray-500",
    cardBackground = "rgb(242, 238, 232)",
  } = style;

  <div
    className={`mx-auto my-20 felx flex-col md:flex-row gap-2 rounded-2xl max-w-md border-2 p-3 overflow-hidden ${cardBackground}`}
  >
    <div className="relative w-full md:w-1/3 min-h-50">
      <Image
        src={imageURL}
        alt={title}
        fill
        className="object-cover rounded-xl"
      />
    </div>
    <div className="flex felx-col p-3 md:w-2/3">
      <h3 className={`font-arvo p-3 tracking-wider ${titleClasses}`}>
        {title}
      </h3>
      <p className={`mb-4 leading-relaxed ${childrenClasses}`}>{children}</p>
      {footer && (
        <div className={`mt-auto border-t pt-2 text-sm ${footerClasses}`}>
          {footer}
        </div>
      )}
    </div>
  </div>;
}
