import * as t from 'io-ts';

export const OfferOptionType = t.interface({
    title: t.union([t.string, t.null, t.undefined]),
    description: t.union([t.string, t.null, t.undefined]),
    additionalPrice: t.union([t.number, t.null, t.undefined]),
});

export interface OfferOptionDTO extends t.TypeOf<typeof OfferOptionType> {}

class OfferOption {
    title: string | null;
    description: string | null;
    additionalPrice: number;

    constructor(params: OfferOptionDTO) {
        this.title = params.title ?? null;
        this.description = params.description ?? null;
        this.additionalPrice = params.additionalPrice ?? 0;
    }
}

export { OfferOption };
