"use client";
import CardImmobile from "./CardImmbolie";
import CardFooter from "./CradImmobileFooter";
import { useImmobiliProvider } from "@/context/ImmobiliContext";
// import Form from "./FormImmobile";

export default function CatalogoImmobili() {
  const { catalogoImmobili } = useImmobiliProvider();

  return (
    <>
      <div className="container flex justify-center items-center my-52">
        {/* <Form onUpdate={onUpdate} /> */}
      </div>
      <div className="w-full h-96 flex justify-center items-center my-20">
        {catalogoImmobili.map((i) => (
          <CardImmobile
            key={i.id}
            imagePaths={i.imagePaths}
            prezzo={i.prezzo}
            nomeImmobile={i.nomeImmobile}
            indirizzo={i.indirizzo}
          >
            <CardFooter
              metratura={i.metratura}
              numeroBagni={i.numeroBagni}
              numeroLocali={i.numeroLocali}
            />
          </CardImmobile>
        ))}
      </div>
    </>
  );
}
