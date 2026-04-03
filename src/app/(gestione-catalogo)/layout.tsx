import ImmobiliProvider from "@/context/ImmobiliContext";

export default function VenditaLayout({
  children,
}: {
  children: React.ReactElement;
}) {
  return <ImmobiliProvider>{children}</ImmobiliProvider>;
}
