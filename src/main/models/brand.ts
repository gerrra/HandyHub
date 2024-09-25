import * as t from 'io-ts';

export const BrandType = t.interface({
    id: t.string,
    title: t.union([t.string, t.null, t.undefined]),
    brandDescription: t.union([t.string, t.null, t.undefined]),
    offersDescription: t.union([t.string, t.null, t.undefined]),
    image: t.union([t.string, t.null, t.undefined]),
});

export interface BrandDTO extends t.TypeOf<typeof BrandType> {}

class Brand {
    id: string;
    title: string | null;
    brandDescription: string | null;
    offersDescription: string | null;
    image: string | null;

    constructor(params: BrandDTO) {
        this.id = params.id;
        this.title = params.title ?? null;
        this.brandDescription = params.brandDescription ?? null;
        this.offersDescription = params.offersDescription ?? null;
        this.image = params.image ?? null;
    }
}

export { Brand };
