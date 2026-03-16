"use client";
import { motion } from "framer-motion";

export default function Title() {
  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.3, margin: "-50px" }}
      transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="relative mb-32 ps-10 lg:ps-64"
    >
      <span className="absolute -top-10 left-10 lg:left-64 text-7xl md:text-9xl font-bold text-[#2D2926]/20 select-none">
        01
      </span>
      <h2 className="relative text-4xl md:text-6xl font-arvo font-normal text-[#2D2926] tracking-[0.2em] uppercase">
        Chi siamo
      </h2>
    </motion.div>
  );
}
