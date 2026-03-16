"use client";
import { ReactNode } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface SectionProps {
  title: string;
  children: string | ReactNode;
  imageURL: string;
  reverse: boolean;
}

export default function Section({
  title,
  children,
  imageURL,
  reverse,
}: SectionProps) {
  return (
    <section
      className={`flex flex-col ${reverse ? "md:flex-row-reverse xl:-me-17" : "md:flex-row xl:-ms-17"} items-center py-8 md:py-12 gap-0 md:gap-8 min-h-[60vh]`}
    >
      {/* Immagine */}
      <div className="w-full md:w-1/2 aspect-4/3 md:h-100 relative overflow-hidden rounded-[36px]">
        <Image
          src={imageURL}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>

      {/* Testo */}
      
        <motion.div
          initial={{ y: reverse ? -50 : 50, opacity: 0 }}
          whileInView={{y: 0, opacity: 1}}
          viewport={{once: true, amount: 0.4, margin: "-50px"}}
          transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
          className={`
            opacity-0
            w-[90%] md:w-1/2 
            -mt-16 md:mt-0 
            mx-auto md:mx-0
          bg-white md:bg-transparent 
            p-6 md:p-8 
            relative z-10 
            shadow-lg md:shadow-none
            rounded-xl md:rounded-none
        `}
        >
          <h3 className="text-3xl md:text-4xl mb-4 uppercase tracking-wider text-[#5C5854]">
            {title}
          </h3>
          <p className="text-[#332F2C] leading-relaxed max-w-md">{children}</p>
        </motion.div>
      
    </section>
  );
}
