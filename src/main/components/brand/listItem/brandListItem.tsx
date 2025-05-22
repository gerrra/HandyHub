import './brandListItem.scss';
import { BrandItemProps } from '../../../types/brandItemProps';
import { Links } from '../../../../global/emuns/links';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { smartImageCloudinary } from '../../../../global/service/globalService';

export const BrandListItem = (props: BrandItemProps) => {
    const brandItemLink: string = useMemo(
        () => (`${Links.BRAND}/${props.item.id}`),
        [props.item.id],
    );

    return (
        <div
            className={'brand-list-item__wrap'}
        >
            <Link
                className='brand-list-item'
                to={brandItemLink}
            >
                <div className='brand-list-item__header'>
                    <h1 className='brand-list-item__title'>
                        {
                            props.item.title ?? ''
                        }
                    </h1>
                    <img
                        alt={props.item.title ?? ''}
                        src={smartImageCloudinary(props.item.logo ?? '', 50)}
                        className='brand-list-item__logo'
                    >
                    </img>
                </div>
                {
                    !!props.item.brandShortDescription &&
                    <div className='brand-list-item__description'>
                        { props.item.brandShortDescription }
                    </div>
                }
            </Link>
        </div>
    );
};
