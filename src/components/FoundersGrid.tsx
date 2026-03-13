"use client";
import { useState } from "react";
import { CardType } from "../types/card.types";
import Card from "./Card";
import FounderCV from "./FounderCV";
import { AnimatePresence, motion } from "framer-motion";

export default function FoundesrGrid() {
  const founders: CardType[] = [
    {
      id: 1,
      title: "Pietro",
      imagePath: "/simil-tyron.png",
      styles: {
        hasShadow: false,
        titleCenter: true,
        circleImage: true,
      },
    },
    {
      id: 2,
      title: "Andrea",
      imagePath: "/simil-andrea.png",
      styles: {
        hasShadow: false,
        titleCenter: true,
        circleImage: true,
      },
    },
    {
      id: 3,
      title: "Claudio",
      imagePath: "/simil-claudio.png",
      styles: {
        hasShadow: false,
        titleCenter: true,
        circleImage: true,
      },
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
              className="pt-10 md:col-span-2 grid md:grid-cols-3 gap-10 h-full min-h-75"
            >
              {founders.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setSelectedID(f.id as number)}
                >
                  <Card
                    key={f.id}
                    title={f.title}
                    imagePath={f.imagePath}
                    styles={f.styles}
                  />
                </button>
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
