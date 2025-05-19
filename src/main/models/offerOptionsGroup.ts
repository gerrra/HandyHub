import * as t from 'io-ts';

export const OfferOptionsGroupType = t.interface({
    id: t.string,
    title: t.union([t.string, t.null, t.undefined]),
});

export interface OfferOptionsGroupDTO extends t.TypeOf<typeof OfferOptionsGroupType> {}

class OfferOptionsGroup {
    id: string;
    title: string | null;

    constructor(params: OfferOptionsGroupDTO) {
        this.id = params.id;
        this.title = params.title ?? null;
    }
}

export { OfferOptionsGroup };
