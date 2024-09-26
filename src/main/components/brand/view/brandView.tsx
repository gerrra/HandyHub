import React, { useEffect, useMemo, useRef, useState } from 'react';
import './brandView.scss';
import { useParams } from 'react-router-dom';
import { Brand } from '../../../models/brand';
import { getBrand, getOffersList } from '../../../actions/mainActions';
import { Slider } from '../../../../global/components/slider/slider';
import { Offer } from '../../../models/offer';
import { Links } from '../../../../global/emuns/links';
import { useMutationObserver } from '../../../../global/service/globalService';
import { maxWidth400, maxWidth640, maxWidth900 } from '../../../../global/service/windowWidth';

export const BrandView = () => {
    const { id } = useParams();
    const [item, setItem] = useState<Brand | null>(null);
    const [offers, setOffers] = useState<Offer[]>([]);
    const [contentSliderWrap, setContentSliderWrap] = useState<HTMLDivElement | null>(null);
    const contentSliderWrapRef = useRef<HTMLDivElement>(null);
    const contentSliderWrapPaddingFull = 24;
    const contentSliderWrapPadding640 = 18;
    const contentSliderWrapPadding400 = 12;

    useEffect(
        () => {
            if (!id) return;

            getBrand(id).then((brand: Brand) => setItem({...brand}));
            getOffersList(id).then((offers: Offer[]) => setOffers([...offers]));
        },
        [id, setItem, setOffers],
    );

    const logoStyles: React.CSSProperties = useMemo(
        () => ({backgroundImage: `url(/images/${item?.image ?? ''})`}),
        [item?.image],
    );

    const getContentSlideWrapPadding = useMemo(
        () => maxWidth400
            ? contentSliderWrapPadding400
            : maxWidth640
                ? contentSliderWrapPadding640
                : contentSliderWrapPaddingFull,
        [],
    );

    const contentSliderWrapStyles: React.CSSProperties = useMemo(
        () => ({
            padding: getContentSlideWrapPadding,
        }),
        [getContentSlideWrapPadding],
    );

    const slideWidth: number | undefined = useMemo(
        () => {
            if (contentSliderWrap) {
                return contentSliderWrap.clientWidth - (getContentSlideWrapPadding * 2);
            }
        },
        [contentSliderWrap, getContentSlideWrapPadding],
    );

    const slideHeight: number | undefined = useMemo(
        () => {
            if (contentSliderWrap) {
                return contentSliderWrap.clientHeight / 100 * 75;
            }
        },
        [contentSliderWrap],
    );

    useMutationObserver(contentSliderWrapRef, () => setContentSliderWrap(contentSliderWrapRef.current), { childList: true, subtree: true });

    return (
        !!item && 
        <div className="brand-view">
            <div className="brand-view__content">
                <div className='brand-view__content-header'>
                    <h1 className='brand-view__content-title'>
                        {
                            item.title ?? ''
                        }
                    </h1>
                    <div
                        style={logoStyles}
                        className='brand-view__content-logo'
                    >
                    </div>
                </div>
                <div className='brand-view__content-body'>
                    <div className='brand-view__content-body-description-wrap'>
                        <h2 className='brand-view__content-body-description-title'>
                            Description:
                        </h2>
                        <div className='brand-view__content-body-descriptions-wrap'>
                            <div className='brand-view__content-body-descriptions'>
                                {
                                    !!item?.brandDescription &&
                                    <div className='brand-view__content-brand-description'>
                                        { item.brandDescription }
                                    </div>
                                }
                                {
                                    !!item?.offersDescription &&
                                    <div className='brand-view__content-offers-description'>
                                        { item.offersDescription }
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                    <div
                        className='brand-view__content-slider-wrap'
                        style={contentSliderWrapStyles}
                        ref={contentSliderWrapRef}
                    >
                        <h2 className='brand-view__content-body-slider-title'>
                            Offers:
                        </h2>
                        <div className='brand-view__content-slider'>
                            <Slider
                                offAutoSlide
                                selectedSlideWidth={slideWidth}
                                selectedSlideHeight={maxWidth640 ? 300 : maxWidth900 ? 400 : slideHeight}
                                hideArrows={maxWidth900}
                                hideDots={maxWidth900}
                                slides={[
                                    ...offers.map((offer: Offer, index: number) => ({
                                        component: (
                                            <div
                                                key={index}
                                                className='brand-view__slide-content'
                                            >
                                                <h2 className='brand-view__slide-title'>
                                                    {offer.title}
                                                </h2>
                                                <div className='brand-view__slide-description'>
                                                    <div className='brand-view__slide-description-text'>
                                                        {offer.description}
                                                    </div>
                                                    <div className='brand-view__slide-price'>
                                                        {`$${offer.price}`}
                                                    </div>
                                                </div>
                                            </div>
                                        ),
                                        link: `/#${Links.BRAND}/${offer.parentId}${Links.OFFER}/${offer.id}`,
                                        backgroundImage: offer.image ?? '',
                                    }))
                                ]}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
