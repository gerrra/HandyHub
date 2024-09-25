import React, { useEffect, useState } from 'react';
import './brandList.scss';
import { BrandListItem } from '../listItem/brandListItem';
import { Brand } from '../../../models/brand';
import { list } from '../../../actions/mainActions';

export const BrandList = () => {
    const [items, setItems] = useState<Brand[]>([]);

    useEffect(
        () => {
            list().then((res) => setItems([...res]));
        },
        [],
    );

    return (
        <div className="brand-list">
            {
                items.map((item, index) => (
                    <BrandListItem
                        key={index}
                        item={item}
                    />
                ))
            }
        </div>
    );
};
