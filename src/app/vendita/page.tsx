// export default function CatalogoImmobili() {
//   return (
//     <div className="w-full mt-52 flex items-center justify-center">
//       <p className="text-xl tracking-wide font-semibold">Coming Soon</p>
//     </div>
//   )
// }

import CardImmobile from "@/components/vendita-section/CardImmbolie";
import CardFooter from "@/components/vendita-section/CradImmobileFooter";
import { getAllImmobili } from "@/actions/immobiliActions";

export default async function CatalogoPage() {
  const immobili = await getAllImmobili();
  if (!immobili || immobili.length === 0)
    return (
      <div className="w-full h-96 flex justify-center items-center my-52">
        <h1 className="text-2xl font-medium opacity-70 tracking-wide italic">
          Nessun immobile trovato
        </h1>
      </div>
    );
  return (
    <div className="w-full h-96 flex justify-center items-center my-52">
      {immobili.map((i) => (
        <CardImmobile immobile={i}>
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
