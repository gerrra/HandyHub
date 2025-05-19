import * as t from 'io-ts';

export const OfferOptionType = t.interface({
    id: t.string,
    groupId: t.union([t.string, t.null, t.undefined]),
    title: t.union([t.string, t.null, t.undefined]),
    description: t.union([t.string, t.null, t.undefined]),
    additionalPrice: t.union([t.number, t.undefined]),
});

export interface OfferOptionDTO extends t.TypeOf<typeof OfferOptionType> {}

class OfferOption {
    id: string;
    groupId: string | null;
    title: string | null;
    description: string | null;
    additionalPrice: number;

    constructor(params: OfferOptionDTO) {
        this.id = params.id;
        this.groupId = params.groupId ?? null;
        this.title = params.title ?? null;
        this.description = params.description ?? null;
        this.additionalPrice = params.additionalPrice ?? 0;
    }
}

export { OfferOption };
