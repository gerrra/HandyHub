import { MainTemplate } from '../../../../global/components/mainTemplate/mainTemplate';
import { OfferView } from '../view/offerView';

export const OfferViewPage = () => {
    return (
        <MainTemplate
            collapseMenu
            content={<OfferView />}
        />
    );
};
