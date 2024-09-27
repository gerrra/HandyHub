import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import './offerView.scss';
import { Link, useParams } from 'react-router-dom';
import { getBrand, getOffer } from '../../../actions/mainActions';
import { Offer } from '../../../models/offer';
import { Brand } from '../../../models/brand';
import { Links } from '../../../../global/emuns/links';
import { OfferOptionType } from '../../../types/offerOptions';
import { ReactComponent as Minus } from '../../../../global/icons/minus.svg';
import { ReactComponent as Plus } from '../../../../global/icons/plus.svg';
import { ReactComponent as Arrow } from '../../../../global/icons/arrow-left.svg';
import { ReactComponent as Close } from '../../../../global/icons/close.svg';
import classnames from 'classnames';
import { Slider } from '../../../../global/components/slider/slider';
import 'react-toastify/dist/ReactToastify.css';
import { useMutationObserver } from '../../../../global/service/globalService';
import { maxWidth640 } from '../../../../global/service/windowWidth';
import { SelectSocialNetwork } from '../../../../global/components/selectSocialNetwork/selectSocialNetwork';

export const OfferView = () => {
    const { brandId, offerId } = useParams()
    const [offer, setOffer] = useState<Offer | null>(null);
    const [brand, setBrand] = useState<Brand | null>(null);
    const [selectedContent, setSelectedContent] = useState<boolean>(false);
    const [selectedGallery, setSelectedGallery] = useState<boolean>(false);
    const [offerOptions, setOfferOptions] = useState<OfferOptionType[]>([]);
    const [sliderWrap, setSliderWrap] = useState<HTMLDivElement | null>(null);
    const [optionContent, setOptionContent] = useState<HTMLDivElement | null>(null);
    const [selectSocialNetworkOn, setSelectSocialNetworkOn] = useState<boolean>(false);
    const optionDescriptionRef = useRef<HTMLDivElement>(null);
    const optionContentRef = useRef<HTMLDivElement>(null);
    const sliderWrapRef = useRef<HTMLDivElement>(null);

    useEffect(
        () => {
            if (!brandId || !offerId) return;

            getBrand(brandId).then((brand: Brand) => setBrand(brand));
            getOffer(brandId, offerId).then((offer: Offer) => {
                setOffer(offer);
                setOfferOptions([...offer.options.map((v) => ({...v, count: 0, showDescription: false}))]);
            });
        },
        [brandId, offerId, setOffer],
    );

    const brandLogoStyles: React.CSSProperties = useMemo(
        () => ({backgroundImage: `url(/images/${brand?.image ?? ''})`}),
        [brand?.image],
    );

    const imageStyles: React.CSSProperties = useMemo(
        () => ({backgroundImage: `url(/images/${offer?.image ?? ''})`}),
        [offer?.image],
    );

    const changeOfferOptionCount = useCallback(
        (count: number, index: number) => {
            const newCount = count < 0 ? 0 : count;
            setOfferOptions([...offerOptions.map((v, i) => i === index ? {...v, count: newCount } : v)]);
        },
        [offerOptions],
    );

    const price = useMemo(
        (): number => {
            let addPrice = 0;
            let count = 0;
            offerOptions.forEach((opt: OfferOptionType) => {
                addPrice += opt.additionalPrice * opt.count;
                count += opt.count;
            });
            return addPrice + (count * (offer?.price ?? 0));
        },
        [offerOptions, offer?.price],
    );

    const offerOrderClasses = useMemo(
        () => classnames(
            'offer-view__content-order',
            'offer-view__content-button',
            {
                'offer-view__content-button--disable': !price,
            }
        ),
        [price],
    );

    const takeOrder = useCallback(
        () => {
            if (!price || !offer) {
                return;
            }
            setSelectSocialNetworkOn(true);
        },
        [price, offer],
    );

    const totalCount = useMemo(
        () => {
            if (!price) return;

            let count = 0;
            offerOptions.forEach((v) => {
                if (!!v.count) count += v.count;
            });

            return count;
        },
        [offerOptions, price],
    );

    const showOrHideOptionDescription = useCallback(
        (option: OfferOptionType) => {
            setOfferOptions([...offerOptions.map((v) => v.title === option.title    
                ? {...v, showDescription: !v.showDescription}
                : v)]);
        },
        [offerOptions],
    );

    const optionArrowClasses = useCallback(
        (option: OfferOptionType) => classnames(
            'offer-view__content-option-arrow',
            {
                'offer-view__content-option-arrow--open': option.showDescription,
            },
        ),
        [],
    );

    const optionDescriptionStyles = useCallback(
        (option: OfferOptionType): React.CSSProperties => ({
            zIndex: option.showDescription ? 0 : -1,
            top: option.showDescription
                ? (optionContent?.clientHeight ?? 0)
                : 0,
            opacity: option.showDescription ? 1 : 0,
        }),
        [optionContent],
    );

    const contentOptionWrapStyles = useCallback(
        (option: OfferOptionType): React.CSSProperties => {
            return {
                minHeight: option.showDescription
                    ? (optionContent?.clientHeight ?? 0) + (optionDescriptionRef.current?.clientHeight ?? 0)
                    : optionContent?.clientHeight ?? 'auto',
            }
        },
        [optionContent],
    );

    const orderTotalCountStyles = useMemo(
        (): React.CSSProperties => ({
            opacity: !!price ? 1 : 0,
        }),
        [price],
    );

    const openGallery = useCallback(
        () => {
            setSelectedContent(false);
            setSelectedGallery(true);
        },
        [],
    );

    const openContent = useCallback(
        () => {
            setSelectedContent(true);
            setSelectedGallery(false);
        },
        [],
    );

    const totalPrice = useMemo(
        () => `Total: ${totalCount ?? 0}${offer?.unitOfMeasurement ? `(${offer.unitOfMeasurement})` : ''} - $${price}`,
        [totalCount, offer, price],
    );

    useMutationObserver(sliderWrapRef, () => setSliderWrap(sliderWrapRef.current), { childList: true, subtree: true });

    useMutationObserver(sliderWrapRef, () => setTimeout(() => setOptionContent(optionContentRef.current), 300), { childList: true, subtree: true });

    const slideWrapStyles = useMemo(
        (): React.CSSProperties => ({
            opacity: !sliderWrap ? 0 : 1,
        }),
        [sliderWrap],
    );

    const contentStyles = useMemo(
        (): React.CSSProperties => ({
            opacity: maxWidth640 && selectSocialNetworkOn ? 0 : 1,
        }),
        [selectSocialNetworkOn],
    );

    const contentOrderPriceStyles = useMemo(
        (): React.CSSProperties => ({
            opacity: selectSocialNetworkOn ? 0 : 1,
        }),
        [selectSocialNetworkOn],
    );

    const contentOptionsWrapStyles = useMemo(
        (): React.CSSProperties => ({
            opacity: selectSocialNetworkOn ? 0 : 1,
        }),
        [selectSocialNetworkOn],
    );

    const offerGallerySlideWidth: number | undefined = useMemo(
        () => sliderWrap?.clientWidth,
        [sliderWrap?.clientWidth],
    );

    const offerGallerySlideHeight: number | undefined = useMemo(
        () => sliderWrap?.clientHeight,
        [sliderWrap?.clientHeight],
    );

    return (
        !!offer && !!brand && 
        <div className="offer-view">
            <div className="offer-view__box">
                <div className='offer-view__brand-wrap'>
                    {
                        selectedGallery
                            ? (
                                <>
                                    <h2>
                                        Gallery
                                    </h2>
                                    <Close
                                        className='offer-view__content-close-gallery'
                                        onClick={openContent}
                                    />
                                </>
                            )
                            : (
                                <>
                                    <Link
                                        className='offer-view__brand-title-wrap'
                                        to={`${Links.BRAND}/${brand.id}`}
                                    >
                                        <Arrow className='offer-view__brand-title-arrow'/>
                                        <div className='offer-view__brand-title'>
                                            {
                                                brand.title ?? ''
                                            }
                                        </div>
                                    </Link>
                                    <div
                                        style={brandLogoStyles}
                                        className='offer-view__brand-logo'
                                    />
                                </>
                            )
                    }
                </div>
                <div
                    className='offer-view__offer-wrap'
                >
                    <div
                        className='offer-view__slider-wrap'
                        ref={sliderWrapRef}
                        style={slideWrapStyles}
                    >
                        {
                            maxWidth640 &&
                            <SelectSocialNetwork
                                offer={offer}
                                offerOptions={offerOptions}
                                price={price}
                                toggleComponent={setSelectSocialNetworkOn}
                                totalPrice={totalPrice}
                                componentOn={selectSocialNetworkOn}
                            />
                        }
                        <Slider
                            hideArrows
                            hideDots
                            swipeOff
                            offAutoSlide
                            selectedSlideWidth={sliderWrap?.clientWidth}
                            selectedSlideHeight={sliderWrap?.clientHeight}
                            slideWidth={sliderWrap?.clientWidth}
                            slideHeight={sliderWrap?.clientHeight}
                            slides={[
                                {
                                    selected: selectedContent,
                                    component: (
                                        <div
                                            className='offer-view__content'
                                            style={contentStyles}
                                        >
                                            <div
                                                className='offer-view__content-wrap'
                                            >
                                                <div className='offer-view__content-block offer-view__content-title-wrap'>
                                                    <h1 className='offer-view__content-title'>
                                                        {
                                                            offer.title ?? ''
                                                        }
                                                    </h1>
                                                    <div className='offer-view__content-unit-measurement'>
                                                        Price: ${offer.price ?? ''}/{offer.unitOfMeasurement ?? ''}
                                                    </div>
                                                </div>
                                                <div className='offer-view__content-block offer-view__content-description-wrap'>
                                                    <h3 className='offer-view__content-title'>
                                                        Description:
                                                    </h3>
                                                    <div className='offer-view__content-description'>
                                                        {
                                                            offer.description ?? ''
                                                        }
                                                    </div>
                                                </div>
                                                <div className='
                                                    offer-view__content-block
                                                    offer-view__content-block--without-margin
                                                    offer-view__content-open-gallery-wrap
                                                '>
                                                    <div
                                                        className='offer-view__content-button offer-view__content-open-gallery'
                                                        onClick={openGallery}
                                                    >
                                                        Open gallery
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='offer-view__order-wrap'>
                                                {
                                                    !!offer.options.length &&
                                                    <div
                                                        className='offer-view__content-options-wrap'
                                                        style={contentOptionsWrapStyles}
                                                    >
                                                        {
                                                            !!offer.optionsTitle &&
                                                            <h3 className='offer-view__content-options-title'>
                                                                {`${offer.optionsTitle}:`}
                                                            </h3>
                                                        }
                                                        {
                                                            offerOptions.map((option: OfferOptionType, index: number) => (
                                                                <div
                                                                    key={index}
                                                                    className='offer-view__content-option-wrap'
                                                                    style={contentOptionWrapStyles(option)}
                                                                >
                                                                    <div
                                                                        className='offer-view__content-option'
                                                                        ref={optionContentRef}
                                                                    >
                                                                        <div
                                                                            className='offer-view__content-option-title-wrap'
                                                                            onClick={() => showOrHideOptionDescription(option)}
                                                                        >
                                                                            <div
                                                                                className={optionArrowClasses(option)}
                                                                            >
                                                                                <Arrow />
                                                                            </div>
                                                                            <div className='offer-view__content-option-title'>
                                                                                {`${option.title}${!!option.additionalPrice ? ` (+$${option.additionalPrice})` : ''}`}
                                                                            </div>
                                                                        </div>
                                                                        <div
                                                                            className='offer-view__content-option-counter'
                                                                        >
                                                                            <Minus
                                                                                className='offer-view__content-option-icon'
                                                                                onClick={() => changeOfferOptionCount(--option.count, index)}
                                                                            />
                                                                            <div
                                                                                className='offer-view__content-option-count'
                                                                            >
                                                                                {option.count}
                                                                            </div>
                                                                            <Plus
                                                                                className='offer-view__content-option-icon'
                                                                                onClick={() => changeOfferOptionCount(++option.count, index)}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div
                                                                        className='offer-view__content-option-description'
                                                                        style={optionDescriptionStyles(option)}
                                                                        ref={optionDescriptionRef}
                                                                    >
                                                                        { option.description }
                                                                    </div>
                                                                </div>
                                                            ))
                                                        }
                                                    </div>
                                                }
                                                <div
                                                    className='offer-view__content-order-price'
                                                    style={contentOrderPriceStyles}
                                                >
                                                    <div
                                                        className='offer-view__content-order-total-count'
                                                        style={orderTotalCountStyles}
                                                    >
                                                        {totalPrice}
                                                    </div>
                                                    <div
                                                        className={offerOrderClasses}
                                                        onClick={takeOrder}
                                                    >
                                                        Order
                                                    </div>
                                                </div>
                                                {
                                                    !maxWidth640 &&
                                                    <SelectSocialNetwork
                                                        offer={offer}
                                                        offerOptions={offerOptions}
                                                        price={price}
                                                        toggleComponent={setSelectSocialNetworkOn}
                                                        totalPrice={totalPrice}
                                                        componentOn={selectSocialNetworkOn}
                                                    />
                                                }
                                            </div>
                                        </div>
                                    ),
                                },
                                {
                                    selected: selectedGallery,
                                    component: (
                                        <div
                                            className='offer-view__offer-gallery'
                                        >
                                            <Slider
                                                hideArrows={maxWidth640}
                                                selectedSlideWidth={offerGallerySlideWidth}
                                                selectedSlideHeight={offerGallerySlideHeight}
                                                slideWidth={offerGallerySlideWidth}
                                                slideHeight={offerGallerySlideHeight}
                                                offAutoSlide={!selectedGallery}
                                                slides={[...offer.gallery.map((image: string, index: number) => ({
                                                    component: <></>,
                                                    backgroundImage: image,
                                                }))]}
                                                hideDots
                                            />
                                        </div>
                                    ),
                                },
                            ]}
                        />
                    </div>
                    <div
                        style={imageStyles}
                        className='offer-view__content-image'
                    />
                </div>
            </div>
        </div>
    );
};
