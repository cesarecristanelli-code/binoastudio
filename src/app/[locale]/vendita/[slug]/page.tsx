import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import DettagliImmobile from "@/components/vendita-section/DettagliImmobile";
import EfficienzaEnergeticaSection from "@/components/vendita-section/EfiicienzaEnergeticaSection";
import MapWrapper from "@/components/vendita-section/MapWrapper";

import ImmobileHeader from "@/components/vendita-section/ImmobileHeader";
import ImmobileCarousel from "@/components/vendita-section/ImmobileCarousel";

async function getImmobile(slug: string) {
  const immobile = await prisma.immobile.findUnique({
    where: {
      slug: slug,
    },
    include: {
      comune: true,
      zona: true,
      immagini: true,
    },
  });

  if (immobile) {
    return immobile;
  } else {
    return null;
  }
}

export default async function ImmobilePage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  const immobileDb = await getImmobile(slug);

  if (!immobileDb) {
    notFound();
  }

  const immobile = { ...immobileDb, prezzo: Number(immobileDb.prezzo) };

  return (
    <main className="max-w-6xl mx-auto p-6 md:p-12 space-y-12 mb-96 mt-52">
      {/* HEADER TITOLO E PREZZO */}
      <ImmobileHeader
        prezzo={Number(immobile.prezzo)}
        nome={immobile.nome}
        metratura={immobile.metratura}
        numeroBagni={immobile.numeroBagni}
        numeroLocali={immobile.numeroLocali}
        comune={immobile.comune.nome}
        zona={immobile.zona?.nome}
      />

      {/* GALLERY A TUTTA LARGHEZZA */}
      <ImmobileCarousel immagini={immobile.immagini} />

      {/* GRIGLIA CARATTERISTICHE (Divisa in categorie) */}
      <DettagliImmobile immobile={immobile} />

      {/* DESCRIZIONE */}
      <section className="max-w-4xl">
        <h2 className="text-2xl font-bold mb-4">
          Descrizione dell&apos;immobile
        </h2>
        <p className="text-gray-700 leading-relaxed whitespace-pre-line text-lg">
          {immobile.descrizione}
        </p>
      </section>

      <EfficienzaEnergeticaSection
        classe={immobile.classeEnergetica}
        annoCostruzione={immobile.annoCostruzione}
        riscaldamento={immobile.riscaldamento}
      />

      <section className="space-y-4">
        <div className="flex items-center gap-2 text-slate-800">
          <h2 className="text-2xl font-bold">Posizione</h2>
        </div>
        <p className="text-slate-600 italic">
          {immobile.indirizzo}, {immobile.comune.nome}
        </p>

        <MapWrapper lat={immobile.lat} lng={immobile.lng} />

        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
          <p className="text-sm text-blue-800">
            <strong>Nota:</strong> La posizione indicata sulla mappa è
            approssimativa per proteggere la privacy della proprietà, ma
            identifica correttamente la zona dell&apos;immobile.
          </p>
        </div>
      </section>
    </main>
  );
}
