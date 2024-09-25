import React from "react";
import { Menu } from "../menu/menu";
import './mainTemplate.scss';
import { Header } from '../header/header';
import classnames from 'classnames';
import { MainTemplateProps } from "../../types/mainTemplateProps";

export const MainTemplate = (props: MainTemplateProps) => {
    return (
        <div className="main-template">
            <Menu
                collapse={props.collapseMenu}
            />
            <div
                className="main-template__content-wrap"
            >
                {
                    !!props.headerOn &&
                    <Header />
                }
                <div className={classnames(
                    'main-template__content',
                    {
                        'main-template__content--with-header': !!props.headerOn,
                    },
                )}>
                    {props.content}
                </div>
            </div>
        </div>
    )
}