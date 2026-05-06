"use client";

import useInserimentoHooks from "../admin-section/inserimento/useInserimentoHooks";

export default function DeleteButton({ id }: { id: string }) {
  const { isDeleting, handleDelete } = useInserimentoHooks();

  return (
    <button
      type="button"
      className="border-2 border-red-700 rounded-xl text-center px-3 py-2 cursor-pointe text-white bg-red-400 cursor-pointer hover:opacity-80"
      onClick={() => handleDelete(id)}
    >
      {isDeleting ? "Sto eliminando..." : "Elimina"}
    </button>
  );
}
