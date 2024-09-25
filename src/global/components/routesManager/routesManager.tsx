import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MainPage } from "../../../main/components/mainPage/mainPage";
import { SearchPage } from "../../../search/components/searchPage/searchPage";
import { FavoutitesPage } from "../../../favoutites/components/favoutitesPage/favoutitesPage";
import { Links } from "../../emuns/links";
import { BrandViewPage } from "../../../main/components/brand/viewPage/brandViewPage";
import { OfferViewPage } from "../../../main/components/offers/viewPage/offerViewPage";
import { PageNotFound } from "../pageNotFound/pageNotFound";

export const RoutesManager = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={'/*'} element={<PageNotFound />} />
                <Route path={Links.HOME} element={<MainPage />} />
                <Route path={Links.SEARCH} element={<SearchPage />} />
                <Route path={Links.FAVOURITES} element={<FavoutitesPage />} />
                <Route path={`${Links.BRAND}/:id`} element={<BrandViewPage />} />
                <Route path={`${Links.BRAND}/:brandId${Links.OFFER}/:offerId`} element={<OfferViewPage />} />
            </Routes>
        </BrowserRouter>
    )
}