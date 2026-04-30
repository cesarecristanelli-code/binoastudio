import Link from "next/link";
import Image from "next/image";
import { getSession } from "@/actions/auth";
import DeleteButton from "./DeleteButton";
import { ImmobileExtended } from "@/types/actions.types";

export default async function CardImmobile({
  immobile,
  children,
}: {
  immobile: ImmobileExtended;
  children: React.ReactNode;
}) {
  const isLogged = await getSession();

  const formatter = new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  });

  const coverImage =
    immobile.immagini.find((img) => img.isCover) || immobile.immagini[0];

  console.log(immobile);

  return (
    <div className="flex flex-col gap-5">
      <Link href={`/vendita/${immobile.slug}`}>
        <div className="max-w-xl flex flex-col rounded-xl shadow-lg m-3 cursor-pointer">
          <div className="relative w-80 h-52 overflow-hidden rounded-t-xl">
            <Image
              src={coverImage.url}
              alt={`Foto di ${immobile.nome}`}
              fill
              sizes="2xl"
              className="object-cover"
            />
          </div>
          <div className="ms-2 me-5 grow">
            <h1 className="py-4 tracking-tight font-bold text-2xl">
              {formatter.format(immobile.prezzo.toNumber())}
            </h1>

            <h2 className="py-2 tracking-wide text-gray-800 text-lg font-semibold">
              {immobile.nome}
            </h2>

            <h3 className="pb-2 leading-relaxed text-gray-600 capitalize">
              {immobile.indirizzo}
            </h3>
          </div>

          <div className="mt-auto border-t border-gray-200 p-3">{children}</div>
        </div>
      </Link>
      {isLogged && (
        <div className="mt-2 flex justify-between max-w-xl">
          {/* Bottone MODIFICA */}
          <Link
            href={`/admin-login/form-modifica-immobile/${immobile.id}`}
            className="border-2 border-black rounded-xl text-center px-3 py-2 cursor-pointer bg-gray-200 hover:opacity-80"
          >
            Modifica
          </Link>
          {/* Bottone ELIMINA */}
          <DeleteButton id={immobile.id} />
        </div>
      )}
    </div>
  );
}
