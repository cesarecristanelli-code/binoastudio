"use client";

import { motion } from "framer-motion";

export default function HeroTitle({ title }: { title: string }) {
  return (
    <motion.h1
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 2,
        delay: 0.2,
        ease: "easeOut",
      }}
      className="text-4xl md:text-6xl tracking-[0.2em] text-center uppercase font-arvo drop-shadow-md drop-shadow-gray-600/80 will-change-transform"
    >
      {title}
    </motion.h1>
  );
}
