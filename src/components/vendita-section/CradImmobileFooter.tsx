import { CardImFooterProps } from "@/types/card.types";
import {SquaresPlusIcon} from "@heroicons/react/24/outline";

export default function CardFooter({
  metratura,
  numeroBagni,
  numeroLocali,
}: CardImFooterProps) {
  return (
    <div className="flex flex-row gap-3 m-2">
      <div className="flex flex-row gap-1 text-sm">
        <svg
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 3.75v16.5h16.5V3.75H3.75zM9 3.75v16.5M3.75 12h16.5M15 12v8.25"
          />
        </svg>
          {numeroLocali === 1 ? (<p>{numeroLocali} locale</p>
          ): (<p>{numeroLocali} locali</p>
          )}
      </div>
      <div className="flex flex-row gap-1 text-sm">
        <svg
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 3.75v16.5h16.5V3.75H3.75zM9 3.75v16.5M3.75 12h16.5M15 12v8.25"
          />
        </svg>
          {numeroLocali === 1 ? (<p>{numeroLocali} locale</p>
          ): (<p>{numeroLocali} locali</p>
          )}
      </div>
      <div className="flex flex-row gap-1 text-sm">
        <SquaresPlusIcon className="size-5"/>
        
          {numeroLocali === 1 ? (<p>{numeroLocali} locale</p>
          ): (<p>{numeroLocali} locali</p>
          )}
      </div>
    </div>
  );
}
