import * as t from 'io-ts';
import { OfferOption, OfferOptionDTO, OfferOptionType } from './offerOption';
import { OfferOptionsGroup, OfferOptionsGroupDTO, OfferOptionsGroupType } from './offerOptionsGroup';

export const OfferType = t.interface({
    parentId: t.string,
    id: t.string,
    title: t.union([t.string, t.null, t.undefined]),
    description: t.union([t.string, t.null, t.undefined]),
    image: t.union([t.string, t.null, t.undefined]),
    price: t.union([t.number, t.null, t.undefined]),
    unitOfMeasurement: t.union([t.string, t.null, t.undefined]),
    gallery: t.union([t.array(t.string), t.null, t.undefined]),
    optionsGroups: t.union([t.array(OfferOptionsGroupType), t.null, t.undefined]),
    options: t.union([t.array(OfferOptionType), t.null, t.undefined]),
});

export interface OfferDTO extends t.TypeOf<typeof OfferType> {}

class Offer {
    parentId: string;
    id: string;
    title: string | null;
    description: string | null;
    image: string | null;
    price: number;
    unitOfMeasurement: string | null;
    gallery: string[];
    optionsGroups: OfferOptionsGroup[];
    options: OfferOption[];

    constructor(params: OfferDTO) {
        this.parentId = params.parentId;
        this.id = params.id;
        this.title = params.title ?? null;
        this.description = params.description ?? null;
        this.image = params.image ?? null;
        this.price = params.price ?? 0;
        this.unitOfMeasurement = params.unitOfMeasurement ?? null;
        this.gallery = params.gallery?.length ? params.gallery : [];
        this.optionsGroups = params.optionsGroups?.length
            ? params.optionsGroups.map((offerOptionsGroup: OfferOptionsGroupDTO) => new OfferOptionsGroup(offerOptionsGroup))
            : [];
        this.options = params.options?.length
            ? params.options.map((offerOptions: OfferOptionDTO) => new OfferOption(offerOptions))
            : [];
    }
}

export { Offer };
