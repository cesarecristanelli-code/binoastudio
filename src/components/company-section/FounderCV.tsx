import { FounderCVProps } from "../../types/cv.types";


/* Appena hai i CV:
    - decidi in che formato trasformarli (json o markdown)
    - fai una cartella 'data' in cui metti i CV
    - aggiungi a CardType il campo 'bio' con valore il path per il CV
    - rendi questo componente client-side
    - usare useEffect(fetch(), [founder.bio]) -> così da caricare il cv nel momemnto in cui FounderCV viene renderizzato
    - decidi come formattare il CV
*/



export default function FounderCV({ founder, onClose }: FounderCVProps) {
  return (
    <div className="w-full p-8 border border-gray-100 bg-gray-50/50 rounded-xl">
      {/* Header con titolo e bottone per tornare */}
      <div className="flex justify-between mb-6">
        <h3 className="font-semibold text-2xl md:text-4xl text-gray-900">
          {founder.name}
        </h3>

        <button
          className="text-gray-700 transition-colors hover:text-black hover:cursor-pointer"
          onClick={onClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      {/* Testo CV */}
      <div className="leading-relaxed text-gray-700 pe-5">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo officiis
        qui minus vitae mollitia voluptatem commodi, nulla tempora, impedit non
        neque delectus, facere atque voluptates illo eos ab esse voluptate
        perferendis unde maxime adipisci voluptas modi doloribus. Molestias,
        commodi, in nisi hic eaque omnis consectetur necessitatibus maiores
        similique sed distinctio illo natus perspiciatis illum minima alias
        dolorem neque iusto doloremque? Reprehenderit tempora laborum inventore
        iusto animi vitae et quasi architecto accusamus aliquam. Cupiditate
        harum voluptatibus magni quam animi. Harum atque adipisci minima
        doloribus autem beatae perspiciatis soluta voluptate? Repudiandae
        excepturi corrupti velit, molestias provident nemo. Doloremque sint
        veritatis pariatur, eum ipsam possimus aut accusamus vitae similique sed
        odit ipsum delectus saepe quo ea iure, eveniet hic debitis alias aliquam
        blanditiis. Voluptatum ipsam repellendus labore voluptatem voluptas
        incidunt esse ipsum modi ea qui aperiam facilis maiores, non nihil sunt
        ducimus aut architecto optio doloremque soluta minima iste. A in
        architecto commodi repellendus, ducimus exercitationem magnam
        voluptatibus neque maxime vitae voluptates velit fugit adipisci autem
        voluptatum tempora maiores. Ipsam repellendus nobis provident quasi
        obcaecati neque placeat eos nam, quibusdam autem modi. Voluptatum labore
        nisi in dignissimos veniam totam voluptatem incidunt modi, fugit
        necessitatibus soluta ea dolorem reiciendis quae vitae perspiciatis est
        culpa, et provident ab eveniet nam. Voluptas quae officiis eos
        praesentium quos dolor debitis deleniti nulla assumenda odit! Ut aliquam
        modi, blanditiis inventore ab id officiis voluptatibus corrupti iure
        quisquam ullam provident dolorum animi eius nulla optio impedit laborum
        facilis eveniet vitae saepe minima adipisci unde. Odio ad, esse incidunt
        nemo dignissimos sint animi a tempore molestiae, suscipit atque est,
        consectetur similique cupiditate blanditiis culpa inventore!
        Perspiciatis totam reprehenderit ipsa fuga molestias facere quis?
        Repudiandae mollitia aperiam, numquam quas eos saepe sunt tempora atque,
        qui similique, quidem pariatur? Animi quos neque voluptate quod iusto,
        minima ex saepe quis aliquam debitis non!
      </div>
    </div>
  );
}
