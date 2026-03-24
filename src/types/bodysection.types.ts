import { ReactNode } from "react";

export interface SectionStyle {
  bodyColor?: string;
  titleColor?: string;
  textColor?: string;
}

export interface SectionProps {
  title: string;
  children: string | ReactNode;
  imagePath: string;
  reverse: boolean;
  idSection: string;
  style?: SectionStyle;
}

export interface SectionType {
  id: number;
  title: string;
  imagePath: string;
  idSection: string;
  children: string | ReactNode;
  revrese: boolean;
  divClasses: string;
}