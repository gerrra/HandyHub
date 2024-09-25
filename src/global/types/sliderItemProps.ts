import { ReactNode } from "react";

export type SliderItemType = {
    component: ReactNode;
    link?: string;
    backgroundImage?: string;
    selected: boolean;
    stop: boolean;
};
