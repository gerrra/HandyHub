import React, { useEffect, useMemo, useState } from 'react';
import './brandView.scss';
import { useParams } from 'react-router-dom';
import { Brand } from '../../../models/brand';
import { getBrand, getOffersList } from '../../../actions/mainActions';
import { Slider } from '../../../../global/components/slider/slider';
import { Offer } from '../../../models/offer';
import { Links } from '../../../../global/emuns/links';

export const BrandView = () => {
    const { id } = useParams()
    const [item, setItem] = useState<Brand | null>(null)
    const [offers, setOffers] = useState<Offer[]>([])

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

    const widthMin900: boolean = useMemo(
        () => window.innerWidth <= 900,
        [],
    );

    const widthMin800: boolean = useMemo(
        () => window.innerWidth <= 800,
        [],
    );

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
                    <div className='brand-view__content-slider-wrap'>
                        <h2 className='brand-view__content-body-slider-title'>
                            Offers:
                        </h2>
                        <div className='brand-view__content-slider'>
                            <Slider
                                selectedSlideWidth={widthMin800 ? 300 : widthMin800 ? 400 : undefined}
                                selectedSlideHeight={widthMin800 ? 300 : widthMin800 ? 400 : undefined}
                                slideWidth={widthMin800 ? 150 : widthMin800 ? 200 : undefined}
                                slideHeight={widthMin800 ? 150 : widthMin800 ? 200 : undefined}
                                hideArrows={widthMin900}
                                hideDots={widthMin900}
                                slides={[
                                    ...offers.map((offer: Offer, index: number) => ({
                                        component: (
                                            <div
                                                key={index}
                                                className='brand-view__slide-content'
                                            >
                                                <h3 className='brand-view__slide-title'>
                                                    {offer.title}
                                                </h3>
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
                                        link: `${Links.BRAND}/${offer.parentId}${Links.OFFER}/${offer.id}`,
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
