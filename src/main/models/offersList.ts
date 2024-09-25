import * as t from 'io-ts';
import { Offer, OfferDTO, OfferType } from './offer';

export const OffersListType = t.interface({
    brandId: t.string,
    offers: t.union([t.array(OfferType), t.null, t.undefined]),
});

export interface OffersListDTO extends t.TypeOf<typeof OffersListType> {}

class OffersList {
    brandId: string;
    offers: Offer[];

    constructor(params: OffersListDTO) {
        this.brandId = params.brandId;
        this.offers = params.offers
            ? params.offers.map((offer: OfferDTO) => new Offer({...offer, parentId: params.brandId}))
            : [];
    }
}

export { OffersList };
