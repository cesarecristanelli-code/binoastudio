// import { prisma } from "@/lib/prisma";

// export default async function UpdateForm({
//   params,
// }: {
//   params: { id: string };
// }) {
//   const { id } = params;

//   const immobile = await prisma.immobile.findUnique({
//     where: { id: id },
//     include: { immagini: true },
//   });

// //   const {
// //     nome,
// //     prezzo,
// //     indirizzo,
// //     metratura,
// //     numeroLocali,
// //     numeroBagni,
// //     immagini,
// //   } = immobile;

//   if (!immobile)
//     return <div className="mt-52 w-full text-center">Immobile non trovato</div>;

// //   const handleSubmit = (e: SubmitEvent) => {
// //     e.preventDefault;

// //   };
// }


