"use client";
import { motion } from "framer-motion";


interface TitleProps {
  number: string,
  title: string,
  titleColor?: string,
}

export default function Title({number, title, titleColor}: TitleProps) {
  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.3, margin: "-50px" }}
      transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="relative mb-32 ps-10 lg:ps-64"
    >
      <span className={`absolute -top-10 left-10 lg:left-64 text-7xl md:text-9xl font-bold ${titleColor ? `text-[${titleColor}]/20` : "opacity-20"} select-none`}>
        {number}
      </span>
      <h2 className={`relative text-4xl md:text-6xl font-arvo font-normal ${titleColor && `text-[${titleColor}]`} tracking-[0.2em] uppercase`}>
        {title}
      </h2>
    </motion.div>
  );
}
