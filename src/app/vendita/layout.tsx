import { getSession } from "@/actions/auth";
import Link from "next/link";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isLogged = await getSession();
  return (
    <main className="w-full h-full">
      {isLogged && (
        <div className="flex mt-32">
          <Link
            href="/admin-login/form-inserimento-immobili"
            className="ms-32 border-2 border-gray-400 rounded-xl px-4 py-3 cursor-pointer text-lg hover:opacity-60"
          >
            <span className="text-lg font-semibold mr-2">+</span>Inserisci un
            immobile
          </Link>
        </div>
      )}
      {children}
    </main>
  );
}
