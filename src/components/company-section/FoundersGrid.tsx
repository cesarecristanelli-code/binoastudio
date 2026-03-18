"use client";
import { useState } from "react";

import FounderCV from "./FounderCV";
import FounderCard from "./FounderCard";
import { FounderCardType } from "@/types/card.types";

import { AnimatePresence, motion } from "framer-motion";

export default function FoundersGrid() {
  const founders: FounderCardType[] = [
    {
      id: 1,
      name: "Pietro",
      imagePath: "/simil-tyron.png",
      role: "Fondatore",
    },
    {
      id: 2,
      name: "Andrea",
      imagePath: "/simil-andrea.png",
      role: "Fondatore",
    },
    {
      id: 3,
      name: "Claudio",
      imagePath: "/simil-claudio.png",
      role: "Fondatore",
    },
  ];

  const [selectedID, setSelectedID] = useState<number | null>(null);
  const selectedFounder = founders.find((f) => f.id === selectedID);

  return (
    <>
      <div className="relative overflow-hidden col-span-2">
        <AnimatePresence mode="wait">
          {!selectedFounder ? (
            <motion.div
              key="grid"
              layout
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 100, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="py-10 grid md:grid-cols-3 gap-5 h-full min-h-75 px-5"
            >
              {founders.map((f) => (
                <FounderCard
                  key={f.id}
                  name={f.name}
                  role={f.role}
                  imagePath={f.imagePath}
                  onClick={() => setSelectedID(f.id as number)}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="cv"
              layout
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="md:col-span-2 m-2"
            >
              <FounderCV
                founder={selectedFounder}
                onClose={() => setSelectedID(null)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
