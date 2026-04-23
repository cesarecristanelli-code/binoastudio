"use client";

import { deleteImmobile } from "@/actions/immobiliActions";
import { useRouter } from "next/navigation";

export default function DeleteButton({ id }: { id: string }) {
  const router = useRouter();

  const handleDelete = async () => {
    if (confirm("Sei sicuro di voler eliminare questo immobile?")) {
      const response = await deleteImmobile(id);
      if (response.success) {
        router.refresh();
      } else {
        alert(response.message);
      }
    }
  };

  return (
    <button
      type="button"
      className="border-2 border-red-700 rounded-xl text-center px-3 py-2 cursor-pointe text-white bg-red-400r"
      onClick={handleDelete}
    >
      Elimina
    </button>
  );
}
