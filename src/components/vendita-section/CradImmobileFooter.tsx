import { CardImFooterProps } from "@/types/card.types";
import {LayoutTemplate, Bath} from "lucide-react"
import { ArrowsPointingOutIcon } from "@heroicons/react/24/outline";

export default function CardFooter({
  metratura,
  numeroBagni,
  numeroLocali,
}: CardImFooterProps) {
  return (
    <div className="flex flex-row gap-3 m-2">
      <div className="flex flex-row gap-1 text-sm">
        <LayoutTemplate className="size-5 text-green-800" />
        {numeroLocali === 1 ? (
          <p>{numeroLocali} locale</p>
        ) : (
          <p>{numeroLocali} locali</p>
        )}
      </div>
      <div className="flex flex-row gap-1 text-sm">
        <ArrowsPointingOutIcon className="size-5 text-yellow-600" />
        <p>{metratura} Mq</p>
      </div>
      <div className="flex flex-row gap-1 text-sm">
        <Bath className="size-5 text-blue-800" />
        {numeroBagni === 1 ? (
          <p>{numeroLocali} bagno</p>
        ) : (
          <p>{numeroLocali} bagni</p>
        )}
      </div>
    </div>
  );
}
