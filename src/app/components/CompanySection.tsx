import Card from "./Card";
import Image from "next/image";
import FoundesrGrid from "./FoundersGrid";



export default function CompanySection() {
  return (
    <div className="max-w-7xl mx-auto space-y-40 bg-white pb-28">
      {/* Sezione CHI SIAMO */}
      <section
        className="grid grid-cols-1 md:grid-cols-2 gap-6 scroll-mt-32"
        id="1"
      >
        {/* Titolo e descrizione */}
        <Card title="Chi siamo" styles={{ hasShadow: false, animate: false }}>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Numquam
            dignissimos tempore ducimus possimus quae dolores dolorum quisquam
            hic ut nobis deserunt minus blanditiis fuga incidunt placeat, iste
            culpa? Error, illo? Qui animi officia sed enim minus, ut quam fugit
            perferendis quis pariatur! Suscipit quis, quidem soluta quibusdam
            iste architecto error!
          </p>
        </Card>

        <div className="relative overflow-hidden shadow-sm min-h-72 md:h-full mx-5 mt-2">
          <Image
            src="/Tre-architetti.png"
            alt="Studio con tre architetti"
            fill
            className="object-cover"
          />
        </div>
        <FoundesrGrid />
      </section>

      <section
        className="grid grid-cols-1 md:grid-cols-2 gap-6 scroll-mt-32"
        id="2"
      >
        <div className="relative overflow-hidden shadow-sm min-h-72 md:h-full mx-5 mt-2">
          <Image
            src="/Tre-architetti.png"
            alt="Studio con tre architetti"
            fill
            className="object-cover"
          />
        </div>

        <Card title="Vision" styles={{ hasShadow: false, animate: false }}>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo est
            suscipit cupiditate maiores ratione voluptatem sint deserunt maxime
            repellat, dolorem exercitationem enim sed optio eius autem, quaerat
            consectetur, voluptatibus asperiores hic nobis earum natus nisi! Hic
            quo sapiente aut autem, deleniti a, sed, officiis molestias incidunt
            dicta rem eveniet corrupti?
          </p>
        </Card>
      </section>

      <section
        className="grid grid-cols-1 md:grid-cols-2 gap-6 scroll-mt-32"
        id="3"
      >
        <Card title="Mission" styles={{ hasShadow: false, animate: false }}>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo est
            suscipit cupiditate maiores ratione voluptatem sint deserunt maxime
            repellat, dolorem exercitationem enim sed optio eius autem, quaerat
            consectetur, voluptatibus asperiores hic nobis earum natus nisi! Hic
            quo sapiente aut autem, deleniti a, sed, officiis molestias incidunt
            dicta rem eveniet corrupti?
          </p>
        </Card>

        <div className="relative overflow-hidden shadow-sm min-h-72 md:h-full mx-5 mt-2">
          <Image
            src="/Tre-architetti.png"
            alt="Studio con tre architetti"
            fill
            className="object-cover"
          />
        </div>
      </section>
    </div>
  );
}
