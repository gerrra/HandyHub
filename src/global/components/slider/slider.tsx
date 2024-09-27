import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import './slider.scss';
import { SliderProps } from '../../types/sliderProps';
import { SliderItemType } from '../../types/sliderItemProps';
import classnames from 'classnames';
import { ReactComponent as ArrowLeft } from '../../icons/arrow-left.svg';
import { useResizeObserver } from '../../service/globalService';

export const Slider = (props: SliderProps) => {
    const [slides, setSlides] = useState<SliderItemType[]>([]);
    const [touchStartXLocation, setTouchStartXLocation] = useState<number>(0);
    const [touchMoveXLocation, setTouchMoveXLocation] = useState<number>(0);
    const [sliderWrapWidth, setSliderWrapWidth] = useState<number>(0);
    const sliderWrapRef = useRef<HTMLDivElement>(null);

    const defaultSlideWidth: number = 250;
    const defaultSlideHeight: number = 250;
    const defaultSlideMarginRight: number = 24;
    const defaultSlideMarginLeft: number = 24;
    const defaultSelectedSlideWidth: number = 450;
    const defaultSelectedSlideHeight: number = 450;

    const slideWidth: number = props.slideWidth ?? defaultSlideWidth;
    const slideHeight: number = props.slideHeight ?? defaultSlideHeight;
    const slideMarginRight: number = props.slideMarginRight ?? defaultSlideMarginRight;
    const slideMarginLeft: number = props.slideMarginLeft ?? defaultSlideMarginLeft;
    const selectedSlideWidth: number = props.selectedSlideWidth ?? defaultSelectedSlideWidth;
    const selectedSlideHeight: number = props.selectedSlideHeight ?? defaultSelectedSlideHeight;

    const getSelectedSlideIndex = useMemo(
        () => slides.findIndex((el) => el.selected),
        [slides],
    );

    const updateSelectedSlideByIndex = useCallback(
        (index: number) => {
            const link = slides[getSelectedSlideIndex].link;
            if (index === getSelectedSlideIndex && !!link) {
                window.location.href = link;
            }
            const slideIndex = index >= slides.length
                ? 0
                : index < 0
                    ? slides.length - 1
                    : index;
            setSlides([...slides.map((el, i) => ({...el, selected: i === slideIndex}))]);
        },
        [slides, getSelectedSlideIndex],
    );

    useEffect(
        () => {
            setSlides([...props.slides.map((v, i) => ({
                ...v,
                selected: props.slides.some((slide) => slide.selected)
                    ? !!v.selected
                    : i === 0,
                stop: false,
            }))]);
        },
        [props.slides],
    );

    useEffect(
        () => {
            if (props.offAutoSlide) return;

            let timerId = setInterval(
                () => !slides[getSelectedSlideIndex].stop && updateSelectedSlideByIndex(getSelectedSlideIndex + 1),
                3000,
            );
            return () => clearInterval(timerId);
        },
        [getSelectedSlideIndex, updateSelectedSlideByIndex, slides, props.offAutoSlide],
    );

    const imageStyles = useCallback(
        (image: string | null, selected: boolean) => ({
            backgroundImage: image ? `url(/images/${image})`: '',
            width: selected ? selectedSlideWidth : slideWidth,
            height: selected ? selectedSlideHeight : slideHeight,
        }),
        [selectedSlideWidth, selectedSlideHeight, slideWidth, slideHeight],
    );

    const sliderListWrapStyles: React.CSSProperties = useMemo(
        (): React.CSSProperties => {
            const left: number = !!sliderWrapWidth
                ? (sliderWrapWidth / 2) - (selectedSlideWidth / 2)
                : 0;

            return {
                left: left - ((slideWidth + slideMarginRight + slideMarginLeft) * getSelectedSlideIndex),
            };
        },
        [getSelectedSlideIndex, selectedSlideWidth, slideWidth, slideMarginRight, slideMarginLeft, sliderWrapWidth],
    );

    const slideStyles = useCallback(
        (selected: boolean, link?: string) => ({
            cursor: link ? 'pointer' : 'default',
            top: selected ? 0 : ((selectedSlideHeight / 2) - (slideHeight / 2)),
            width: selected ? selectedSlideWidth : slideWidth,
            height: selected ? selectedSlideHeight : slideHeight,
            marginLeft: selected ? 0 : slideMarginLeft,
            marginRight: selected ? 0 : slideMarginRight,
        }),
        [selectedSlideWidth, selectedSlideHeight, slideHeight, slideWidth, slideMarginLeft, slideMarginRight],
    );

    const sliderListStyles = useCallback(
        () => ({
            height: selectedSlideHeight,
        }),
        [selectedSlideHeight],
    );

    const stopOnThisSlide = useCallback(
        (item: SliderItemType, index: number, stop: boolean) => {
            if (!item.selected) {
                return;
            }

            setSlides([...slides.map((v, i) => i === index ? { ...v, stop } : v)]);
        },
        [setSlides, slides],
    );

    const sliderItemClasses = useCallback(
        (select: boolean, stop: boolean) => {
            return classnames(
                'slider-item',
                {
                    'slider-item--selected': select,
                },
                {
                    'slider-item--stop': stop,
                },
            );
        },
        [],
    );

    const dotWrapClasses = useCallback(
        (select: boolean) => {
            return classnames(
                'dot-item__wrap',
                {
                    'dot-item__wrap--selected': select,
                },
            );
        },
        [],
    );

    const handleTouchStart = useCallback(
        (touchStartEvent: React.TouchEvent<HTMLDivElement>) => {
            if (props.swipeOff) return;
            setTouchStartXLocation(touchStartEvent.changedTouches[0].clientX);
        },
        [props.swipeOff],
    );

    const handleTouchMove = useCallback(
        (touchMoveEvent: React.TouchEvent<HTMLDivElement>) => {
            if (props.swipeOff) return;
            setTouchMoveXLocation(touchMoveEvent.changedTouches[0].clientX);
        },
        [props.swipeOff],
    );

    const handleTouchEnd = useCallback(
        () => {
            if (props.swipeOff || !touchMoveXLocation) return;
            if (touchStartXLocation - 40 > touchMoveXLocation) {
                updateSelectedSlideByIndex(getSelectedSlideIndex + 1);
            }
            if (touchStartXLocation + 40 < touchMoveXLocation) {
                updateSelectedSlideByIndex(getSelectedSlideIndex - 1);
            }
            setTouchMoveXLocation(0);
        },
        [touchStartXLocation, touchMoveXLocation, updateSelectedSlideByIndex, getSelectedSlideIndex, props.swipeOff],
    );

    useResizeObserver(sliderWrapRef, (target) => setSliderWrapWidth(target.clientWidth));

    return (
        <div
            className="slider"
            ref={sliderWrapRef}
        >
            <div
                className="slider-list"
                style={sliderListStyles()}
            >
                {
                    !props.hideArrows &&
                    <>
                        <div
                            className='slider-list__arrow slider-list__arrow--right'
                            onClick={() => updateSelectedSlideByIndex(getSelectedSlideIndex + 1)}
                        >
                            <ArrowLeft />
                        </div>
                        <div
                            className='slider-list__arrow slider-list__arrow--left'
                            onClick={() => updateSelectedSlideByIndex(getSelectedSlideIndex - 1)}
                        >
                            <ArrowLeft />
                        </div>
                    </>
                }
                <div
                    className="slider-list__wrap"
                    style={sliderListWrapStyles}
                >
                    {
                        slides.map((item: SliderItemType, index: number) => (
                            <div
                                key={index}
                                style={slideStyles(item.selected, item.link)}
                                className={sliderItemClasses(item.selected, item.stop)}
                                onClick={() => updateSelectedSlideByIndex(index)}
                                onMouseOver={() => stopOnThisSlide(item, index, true)}
                                onMouseOut={() => stopOnThisSlide(item, index, false)}
                                onTouchStart={touchStartEvent => handleTouchStart(touchStartEvent)}
                                onTouchMove={touchMoveEvent => handleTouchMove(touchMoveEvent)}
                                onTouchEnd={() => handleTouchEnd()}
                            >
                                <div className='slider-item__content'>
                                    {item.component}
                                </div>
                                {
                                    !!item.backgroundImage &&
                                    <div
                                        className='slider-item__image'
                                        style={imageStyles(item.backgroundImage, item.selected)}
                                    />
                                }
                            </div>
                        ))
                    }
                </div>
            </div>
            {
                !props.hideDots &&
                <div
                    className='dots__wrap'
                >
                    <div
                        className='dots'
                    >
                        {
                            slides.map((item: SliderItemType, index: number) => (
                                <div
                                    key={index}
                                    className={dotWrapClasses(item.selected)}
                                    onClick={() => updateSelectedSlideByIndex(index)}
                                >
                                    <div
                                        key={index}
                                        className='dot-item'
                                    />
                                </div>
                            ))
                        }
                    </div>
                </div>
            }
        </div>
    );
};
