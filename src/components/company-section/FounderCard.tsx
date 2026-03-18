import Image from 'next/image';
import { FounderCardProps } from '@/types/card.types';

export default function FounderCard({ name, role, imagePath, onClick }: FounderCardProps) {
  return (
    <div className="max-w-sm bg-[rgb(242,240,236)] rounded-xl border-2 border-[#E7E2DB] shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      {/* Container Foto */}
      <div className="flex justify-center pt-8">
        <div className="relative size-32 overflow-hidden rounded-full ring-4 ring-[#E7E2DB]">
          <Image
            src={imagePath}
            alt={`Foto di ${name}`}
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Contenuto Testuale */}
      <div className="p-6 text-center">
        <h3 className="text-xl font-bold tracking-tight">
          {name}
        </h3>
        <p className="text-sm text-[#332F2C] mb-6 uppercase tracking-wider font-medium">
          {role}
        </p>

        {/* Bottone */}
        <button className="mx-auto text-xs font-semibold uppercase tracking-widest px-6 py-2.5 rounded-full transition-all duration-300 cursor-pointer bg-black text-white hover:bg-gray-800" onClick={onClick}>
          Vedi CV
        </button>
      </div>
    </div>
  );
}