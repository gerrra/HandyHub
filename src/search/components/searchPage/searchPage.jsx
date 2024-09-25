import React from "react";
import { MainTemplate } from "../../../global/components/mainTemplate/mainTemplate";
import { Search } from "../search/search";

export const SearchPage = () => {
    return (
        <MainTemplate
            content={<Search />}
        />
    );
};
