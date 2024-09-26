import './brandListItem.scss';
import { BrandItemProps } from '../../../types/brandItemProps';
import { Links } from '../../../../global/emuns/links';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';

export const BrandListItem = (props: BrandItemProps) => {
    const logoStyles: React.CSSProperties = useMemo(
        () => ({backgroundImage: `url(/images/${props.item.image})`}),
        [props.item.image],
    );

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
                    <div
                        style={logoStyles}
                        className='brand-list-item__logo'
                    >
                    </div>
                </div>
                {
                    !!props.item.brandDescription &&
                    <div className='brand-list-item__description'>
                        { props.item.brandDescription }
                    </div>
                }
            </Link>
        </div>
    );
};
