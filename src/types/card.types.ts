 export interface FounderCardProps {
  name: string;
  role: string; 
  imagePath: string;
  onClick: () => void;
}

export interface FounderCardType {
  id: string | number;
  name: string;
  imagePath: string;
  role: string;
}