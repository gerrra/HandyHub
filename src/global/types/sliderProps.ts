import { SliderItem } from "./sliderItem";

export type SliderProps = {
    slides: SliderItem[],
    swipeOff?: boolean;
    hideDots?: boolean,
    hideArrows?: boolean,
    slideWidth?: number;
    slideHeight?: number;
    offAutoSlide?: boolean,
    selectedSlideWidth?: number;
    selectedSlideHeight?: number;
    slideMarginRight?: number;
    slideMarginLeft?: number;
};
