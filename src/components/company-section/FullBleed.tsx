import Image from "next/image";

export default function FullBleedImage() {
  return (
    <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen h-100 overflow-hidden">
      <Image
        src="/vetro.jpg"
        alt="Paesaggio naturalistico"
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
    </div>
  );
}
