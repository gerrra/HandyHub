import React, { useMemo } from "react";
import { Menu } from "../menu/menu";
import './mainTemplate.scss';
import { Header } from '../header/header';
import classnames from 'classnames';
import { MainTemplateProps } from "../../types/mainTemplateProps";
import { maxWidth1240 } from "../../service/windowWidth";

export const MainTemplate = (props: MainTemplateProps) => {
    const mainTemplateClasses = useMemo(
        () => classnames(
            'main-template',
            {
                'main-template--full-height': props.fullHeight,
            },
        ),
        [props.fullHeight],
    );

    const contentWrapClasses = useMemo(
        () => classnames(
            'main-template__content-wrap',
            {
                'main-template__content-wrap--full-width': props.collapseMenu,
            },
        ),
        [props.collapseMenu],
    );

    const contentClasses = useMemo(
        () => classnames(
            'main-template__content',
            {
                'main-template__content--with-header': props.headerOn,
            },
        ),
        [props.headerOn],
    );

    return (
        <div className={mainTemplateClasses}>
            <Menu
                collapse={props.collapseMenu || maxWidth1240}
            />
            <div
                className={contentWrapClasses}
            >
                {
                    !!props.headerOn &&
                    <Header />
                }
                <div className={contentClasses}>
                    {props.content}
                </div>
            </div>
        </div>
    )
}