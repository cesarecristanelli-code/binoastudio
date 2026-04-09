import { ReactNode } from "react";

export interface SectionStyle {
  bodyColor?: string;
  titleColor?: string;
  textColor?: string;
}

export interface SectionProps {
  title: string;
  subtitle?: string;
  children: string | ReactNode;
  imagePath: string;
  imagePosition?: string;
  reverse: boolean;
  idSection: string;
  style?: SectionStyle;
}

export interface SectionType {
  id: number;
  title: string;
  subtitle?: string;
  imagePath: string;
  imagePosition?: string;
  idSection: string;
  children: string | ReactNode;
  reverse: boolean;
  divClasses: string;
}