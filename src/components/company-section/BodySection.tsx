"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { SectionProps } from "@/types/bodysection.types";

export default function Section({
  title,
  subtitle,
  children,
  imagePath,
  reverse,
  idSection,
  style = {},
}: SectionProps) {
  const {
    bodyColor = "rgb(242,240,236)",
    titleColor = "#5C5854",
    textColor = "#332F2C",
  } = style;

  return (
    <section
      className={`flex flex-col ${reverse ? "md:flex-row-reverse xl:-me-17" : "md:flex-row xl:-ms-17"} items-center py-8 md:py-12 gap-0 md:gap- min-h-[60vh] scroll-mt-20 md:scroll-md-36`}
      id={idSection}
    >
      {/* Immagine */}
      <div
        className={`w-full md:w-1/2 aspect-4/3 md:h-100 md:z-20 relative overflow-hidden ${reverse ? "md:rounded-e-2xl md:rounded-s-lg" : "md:rounded-s-2xl md:rounded-e-lg"}`}
      >
        <Image
          src={imagePath}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>

      {/* Testo */}

      <motion.div
        initial={{ y: reverse ? -50 : 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.4, margin: "-50px" }}
        transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
        style={{ backgroundColor: bodyColor }}
        className={`
            opacity-0
            w-[90%] md:w-1/2 
            -mt-16 md:mt-0 
            mx-auto ${reverse ? "xl:ms-16" : "xl:me-16"}
            p-6 md:p-8 
            relative z-10 
            shadow-lg md:shadow-none
            rounded-xl ${reverse ? "md:rounded-s-xl md:rounded-e-lg md:-me-10" : "md:rounded-e-xl md:rounded-s-lg md:-ms-2"}
        `}
      >

        {subtitle && (
          <h3
            style={{ color: titleColor }}
            className="text-2xl mb-2 tracking-wide"
          >
            {subtitle}
          </h3>
        )}
        <h2
          style={{ color: titleColor }}
          className={`text-3xl md:text-4xl mb-4 tracking-wide`}
        >
          {title}
        </h2>
        
        <div className={`leading-relaxed max-w-md`} style={{ color: textColor }}>
          {children}
        </div>
      </motion.div>
    </section>
  );
}
