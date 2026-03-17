"use client";
import { ReactNode, useState } from "react";
/* import { CardType } from "../../types/card.types"; */
import Card from "../Card2";
import FounderCV from "./FounderCV";
import { AnimatePresence, motion } from "framer-motion";
import { CardStyle } from "../Card2";

interface CardType {
  id: string | number;
  title: string;
  imagePath: string;
  children?: string | ReactNode;
  footer?: string | ReactNode;
  style?: CardStyle;
}

export default function FoundersGrid() {
  const founders: CardType[] = [
    {
      id: 1,
      title: "Pietro",
      imagePath: "/simil-tyron.png",
    },
    {
      id: 2,
      title: "Andrea",
      imagePath: "/simil-andrea.png",
    },
    {
      id: 3,
      title: "Claudio",
      imagePath: "/simil-claudio.png",
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
              className="pt-10 grid md:grid-cols-3 gap-2 h-full min-h-75"
            >
              {founders.map((f) => (
                <Card
                  key={f.id}
                  title={f.title}
                  imagePath={f.imagePath}
                  style={{
                    cardClasses:
                      "border-2 border-[#2D2926] bg-[rgb(242,238,232)] transition-transform duration-400 hover:-translate-y-2 hover:scale-102",
                  }}
                  footer={
                    <div className="flex justify-center h-full w-full items-center">
                      <button
                        type="button"
                        className="rounded-3xl bg-transparent border-2 border-[#2D2926]  text-[#2D2926] px-4 py-2 hover:opacity-70 cursor-pointer"
                        onClick={() => setSelectedID(f.id as number)}
                      >
                        Vedi CV
                      </button>
                    </div>
                  }
                ></Card>
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
