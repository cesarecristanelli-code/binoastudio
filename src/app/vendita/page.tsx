import CardImmobile from "@/components/vendita-section/CardImmbolie";
import CardFooter from "@/components/vendita-section/CradImmobileFooter";

export default function LoadingVendita() {
  return (
    <div className="w-full h-96 flex justify-center items-center my-52">
      <CardImmobile
        imagePath="/studio-immobiliare.png"
        prezzo={300}
        nomeImmobile="Casetta bella e carina"
        indirizzo="via pompei 2 - verona"
      >
        <CardFooter metratura={1} numeroBagni={1} numeroLocali={1} />
      </CardImmobile>
    </div>
  );
}
