import { ReactNode } from "react";

export interface CardStyles {
    iconColor?: string,
    iconCenter?: boolean,
    titleCenter?: boolean,
    hasShadow?: boolean,
    hasBorder?: boolean,
    animate?: boolean,
    circleImage?: boolean,
}

export interface CardProps {
    title: string,
    icon?: ReactNode,
    imagePath?: string,
    children?: string | ReactNode,
    footer?: string,
    styles?: CardStyles
}

export interface CardType {
    id: string | number,
    title: string,
    icon?: ReactNode,
    imagePath?: string,
    children?: string,
    footer?: string,
    styles?: CardStyles
}