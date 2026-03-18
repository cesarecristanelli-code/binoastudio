import { FounderCardType } from "./card.types";


export interface FounderCVProps {
    founder: FounderCardType,
    onClose?: () => void,
}