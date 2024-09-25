import React, { useCallback, useMemo, useState } from "react";
import { MenuMainItems } from "../../types/menuMainItems";
import { ReactComponent as Heart } from '../../icons/heart.svg';
import { ReactComponent as Home } from '../../icons/home.svg';
import { ReactComponent as Search } from '../../icons/search.svg';
import { ReactComponent as HandyHubLogo } from '../../icons/handyHubLogo.svg';
import { ReactComponent as HandyHubLogoMin } from '../../icons/handyHubLogoMin.svg';
import './menu.scss';
import { Link } from "react-router-dom";
import { Links } from "../../emuns/links";
import { MenuProps } from "../../types/menuProps";
import classnames from "classnames";

export const Menu = (props: MenuProps) => {
    const [mainItems, setMainItems] =  useState<MenuMainItems[]>([
        {
            title: 'Main',
            select: false,
            hide: false,
            icon: Home,
            link: '/',
        },
        {
            title: 'Поиск',
            select: false,
            hide: false,
            icon: Search,
            link: Links.SEARCH,
        },
        {
            title: 'Избранное',
            select: false,
            hide: false,
            icon: Heart,
            link: Links.FAVOURITES,
        },
    ]);

    const updateMainItems = useCallback(
        (item: MenuMainItems, index: number) => {
            const newItem: MenuMainItems = {...item, select: !item.select};
            const newItems: MenuMainItems[] = [...mainItems.map((v: MenuMainItems, i: number) => (
                i === index
                    ? newItem
                    : v.select
                        ? {...v, select: false}
                        : v
            ))];
            setMainItems(newItems);
        },
        [setMainItems, mainItems],
    );

    const getMenuItemIcon = useCallback(
        (icon: React.FunctionComponent<React.SVGAttributes<SVGElement>>) => {
            const IconName = icon;
            return <IconName />;
        },
        [],
    );

    const widthMin900: boolean = useMemo(
        () => window.innerWidth <= 900,
        [],
    );

    const menuClasses = useMemo(
        () => classnames(
            'menu',
            {
                'menu--min': props.collapse,
            },
        ),
        [props.collapse],
    );

    const menuLogoClasses = useMemo(
        () => classnames(
            'menu__logo-wrap',
            {
                'menu__logo-wrap--min': props.collapse,
            },
        ),
        [props.collapse],
    );

    const goToMainPage = useCallback(
        () => {
            window.location.href = window.location.origin
        },
        [],
    );

    return (
        <div className={menuClasses}>
            <div className="menu__main-items">
                <div
                    className={menuLogoClasses}
                    onClick={goToMainPage}
                >
                    {
                        props.collapse
                            ? <HandyHubLogoMin />
                            : <HandyHubLogo />
                    }
                </div>
                {
                    mainItems.map((item: MenuMainItems, index: number) => (
                        !item.hide && <Link
                            key={index}
                            to={item.link}
                            className="menu__main-item"
                            onClick={() => updateMainItems(item, index)}
                        >
                            <div
                                className="menu__main-item-icon"
                            >
                                {getMenuItemIcon(item.icon)}
                            </div>
                            {
                                !widthMin900 && !props.collapse &&
                                <div className="menu__main-item-title">
                                    {item.title}
                                </div>
                            }
                        </Link>
                    ))
                }
            </div>
        </div>
    );
};
