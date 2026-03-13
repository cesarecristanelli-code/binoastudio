"use client";
import { useState } from "react";
import { CardType } from "../types/card.types";
import Card from "./Card";
import FounderCV from "./FounderCV";

export default function FoundesrGrid() {
  const founders: CardType[] = [
    {
      id: 1,
      title: "Andrea Cristanelli",
      imagePath: "/simil-andrea.png",
      styles: {
        hasShadow: false,
        titleCenter: true,
        circleImage: true,
      },
    },
    {
      id: 2,
      title: "Claudio er Fracca",
      imagePath: "/simil-claudio.png",
      styles: {
        hasShadow: false,
        titleCenter: true,
        circleImage: true,
      },
    },
    {
      id: 3,
      title: "Tyron de Deau",
      imagePath: "/simil-tyron.png",
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
      {!selectedFounder ? (
        <div className="pt-10 md:col-span-2 grid md:grid-cols-3 gap-10 h-full min-h-75">
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
        </div>
      ) : (
        <div className="md:col-span-2 m-2" >
          <FounderCV
            founder={selectedFounder}
            onClose={() => setSelectedID(null)}
          />
        </div>
      )}
    </>
  );
}
