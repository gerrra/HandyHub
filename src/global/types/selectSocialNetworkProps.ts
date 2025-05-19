import { Offer } from "../../main/models/offer";
import { OfferOptionCount } from "../../main/types/offerOptionCount";

export type SelectSocialNetworkProps = {
    componentOn?: boolean;
    toggleComponent: (visibly: boolean) => any;
    totalPrice: string;
    offer: Offer | null;
    price: number;
    offerOptions: OfferOptionCount[];
};
