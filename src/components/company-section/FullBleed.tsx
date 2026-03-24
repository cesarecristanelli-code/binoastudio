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
      <div className="absolute inset-0 bg-linear-to-b from-[rgb(218,211,201)]/70 via-[#3C3833]/70 to-[#3C3833]/90" />
    </div>
  );
}
