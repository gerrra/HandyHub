import { ReactNode } from "react";

export type SliderItem = {
    component: ReactNode;
    selected?: boolean;
    link?: string;
    image?: string;
};
