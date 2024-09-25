import { MainTemplate } from "../../../global/components/mainTemplate/mainTemplate";
import { Favoutites } from "../favoutites/favoutites";

export const FavoutitesPage = () => {
    return (
        <MainTemplate
            content={<Favoutites />}
        />
    );
};
