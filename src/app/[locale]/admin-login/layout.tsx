import { getSession } from "@/actions/auth";
import LogoutButton from "@/components/admin-section/LogoutButton";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isLogged = await getSession();
  return (
    <main className="w-full h-full">
      {isLogged && (
        <div className="flex w-[90%] justify-end mx-auto mt-32">
          <LogoutButton />
        </div>
      )}
      {children}
    </main>
  );
}
