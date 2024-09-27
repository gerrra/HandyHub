import { MainTemplate } from '../../../../global/components/mainTemplate/mainTemplate';
import { BrandView } from '../view/brandView';

export const BrandViewPage = () => {
    return (
        <MainTemplate
            collapseMenu
            content={<BrandView />}
            fullHeight
        />
    );
};
