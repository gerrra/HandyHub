import { ReactNode } from "react";

export type SliderItemType = {
    component: ReactNode;
    link?: string;
    image?: string;
    selected: boolean;
    stop: boolean;
};
