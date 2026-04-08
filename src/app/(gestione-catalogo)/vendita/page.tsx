import { prisma } from "@/lib/prisma";
import CardImmobile from "@/components/vendita-section/CardImmbolie";
import CardFooter from "@/components/vendita-section/CradImmobileFooter";
import deleteImmobile from "@/actions/deleteImmobili";

export default async function CatalogoImmobili() {
  const catalogoImmobili = await prisma.immobile.findMany({
    include: {
      immagini: true,
    },
    orderBy: {
      id: "desc",
    },
  });

  if (catalogoImmobili.length === 0) {
    return (
      <div className="flex justify-center py-20">
        <p className="text-xl">Non ci sono immobili nel catalogo.</p>
      </div>
    );
  }

  async function eliminaImmobile(id: string) {
    const response = await deleteImmobile(id);

    if (!response.success) alert(response.message);
  }

  return (
    <div className="w-full h-96 flex justify-center items-center my-52">
      {catalogoImmobili.map((i) => (
        <CardImmobile
          key={i.id}
          id={i.id}
          immagini={i.immagini}
          prezzo={i.prezzo}
          nomeImmobile={i.nome}
          indirizzo={i.indirizzo}
          elimina={eliminaImmobile}
        >
          <CardFooter
            metratura={i.metratura}
            numeroBagni={i.numeroBagni}
            numeroLocali={i.numeroLocali}
          />
        </CardImmobile>
      ))}
    </div>
  );
}
