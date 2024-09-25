import { Method } from "../../global/emuns/method";
import { requestApi } from "../../global/service/globalService";
import { Brand, BrandDTO } from "../models/brand";
import { Offer } from "../models/offer";
import { OffersList, OffersListDTO } from "../models/offersList";

export const list = (): Promise<Brand[]> =>
    requestApi('/mocks/brandList.json', Method.GET).then((res: Brand[]) => {
        if (!res.length) return [];
        return res.map((item: BrandDTO) => new Brand(item));
    });

export const getBrand = async (id: string): Promise<Brand> => {
    let items: Brand[] = [];
    await list().then((res: Brand[]) => items = res);
    const index = items.findIndex((item: Brand, index: number) => item.id === id);
    return items[index];
};

export const listOffersList = (): Promise<OffersList[]> =>
    requestApi('/mocks/listOffersList.json', Method.GET).then((res: OffersList[]) => {
        if (!res.length) return [];
        return res.map((item: OffersListDTO) => new OffersList(item));
    });

export const getOffersList = async (brandId: string): Promise<Offer[]> => {
    let items: OffersList[] = [];
    await listOffersList().then((res: OffersList[]) => items = res);
    const index = items.findIndex((item: OffersList, index: number) => item.brandId === brandId);
    return items[index].offers;
};

export const getOffer = async (brandId: string, offerId: string): Promise<Offer> => {
    let items: Offer[] = [];
    await getOffersList(brandId).then((res: Offer[]) => items = res);
    const index = items.findIndex((item: Offer, index: number) => item.id === offerId);
    return items[index];
};
