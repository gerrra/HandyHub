import React from 'react';
import { BrandList } from '../brand/list/brandList';
import { MainTemplate } from '../../../global/components/mainTemplate/mainTemplate';
import './mainPage.scss'

export const MainPage = () => {
    return (
        <MainTemplate
            content={<BrandList />}
        />
    );
};
