import { Offer } from "../../main/models/offer";
import { OfferOptionType } from "../../main/types/offerOptions";

export type SelectSocialNetworkProps = {
    componentOn?: boolean;
    toggleComponent: (visibly: boolean) => any;
    totalPrice: string;
    offer: Offer | null;
    price: number;
    offerOptions: OfferOptionType[];
};
