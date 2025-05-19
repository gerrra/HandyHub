import React, { useCallback, useMemo, useRef, useState } from "react";
import './selectSocialNetwork.scss';
import { SelectSocialNetworkProps } from "../../types/selectSocialNetworkProps";
import { ReactComponent as Close } from '../../icons/close.svg';
import { ReactComponent as Telegram } from '../../icons/telegram.svg';
import { ReactComponent as Whatsapp } from '../../icons/whatsapp.svg';
import { ReactComponent as Viber } from '../../icons/viber.svg';
import { ReactComponent as Imessage } from '../../icons/imessage.svg';
import { OfferOptionCount } from "../../../main/types/offerOptionCount";
import { Offer } from "../../../main/models/offer";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useResizeObserver } from "../../service/globalService";
import { maxWidth640, maxWidth900 } from "../../service/windowWidth";
import { OfferOptionsGroup } from "../../../main/models/offerOptionsGroup";

export const SelectSocialNetwork = (props: SelectSocialNetworkProps) => {
    const bodyRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const bodyPaddingFull: number = 24;
    const bodyPadding900: number = 18;
    const bodyPadding640: number = 12;
    const [body, setBody] = useState<HTMLDivElement | null>(null);
    const [content, setContent] = useState<HTMLDivElement | null>(null);

    const getBodyPadding = useMemo(
        () => maxWidth640
            ? bodyPadding640
            : maxWidth900
                ? bodyPadding900
                : bodyPaddingFull,
        [],
    );

    const selectSocialNetworkStyles = useMemo(
        (): React.CSSProperties => ({
            opacity: props.componentOn ? 0.8 : 0,
            top: props.componentOn ? 0 : '-100%',
            padding: getBodyPadding,
        }),
        [props.componentOn, getBodyPadding],
    );

    const linksWrapStyles = useMemo(
        (): React.CSSProperties => {
            if (!body || !content) return {};

            return {
                height: body.clientHeight - (getBodyPadding * 2) - content.clientHeight,
            };
        },
        [body, content, getBodyPadding],
    );

    const linkForOrder: string = useMemo(
        () => {
            const offer: Offer | null = props.offer;
            if (!offer || !props.price) return '';

            let options: string = '';
            props.offerOptions.forEach((option: OfferOptionCount) => {
                if (!!option.count) {
                    const group: OfferOptionsGroup = offer.optionsGroups[offer.optionsGroups.findIndex((group: OfferOptionsGroup) => group.id === option.groupId)]
                    options += ` ${group.title}: ${option.title} ${option.count}(${offer.unitOfMeasurement}).`
                }
            });
            return `Hello! I want to order ${offer.title}.${options} Price: $${props.price}`;
        },
        [props],
    )

    const selectTelegramNetwork = useCallback(
        () => {
            if (!linkForOrder) return;

            navigator.clipboard.writeText(linkForOrder)
                .then(() => {
                    toast("Your order message has been copied to your clipboard. You can paste it into the chat.")
                    setTimeout(() => (window.location.href = 'https://t.me/gerrra_smvch'), 3000);
                })
                .catch(err => {
                    console.log('Something went wrong', err);
                });
        },
        [linkForOrder],
    );

    const selectWhatsappNetwork = useCallback(
        () => {
            if (!linkForOrder) return;

            navigator.clipboard.writeText(linkForOrder)
                .then(() => {
                    toast("Your order message has been copied to your clipboard. You can paste it into the chat.")
                    setTimeout(() => (window.location.href = 'https://wa.me/+12533243648'), 3000);
                })
                .catch(err => {
                    console.log('Something went wrong', err);
                });
        },
        [linkForOrder],
    );

    const selectViberNetwork = useCallback(
        () => {
            if (!linkForOrder) return;

            navigator.clipboard.writeText(linkForOrder)
                .then(() => {
                    toast("Your order message has been copied to your clipboard. You can paste it into the chat.")
                    setTimeout(() => (window.location.href = 'viber://pa?chatURI=+2533243648'), 3000);
                })
                .catch(err => {
                    console.log('Something went wrong', err);
                });
            
        },
        [linkForOrder],
    );

    const selectIMessageNetwork = useCallback(
        () => {
            if (!linkForOrder) return;

            navigator.clipboard.writeText(linkForOrder)
                .then(() => {
                    toast("Your order message has been copied to your clipboard. You can paste it into the chat.")
                    setTimeout(() => (window.location.href = 'imessage://+12533243648'), 3000);
                })
                .catch(err => {
                    console.log('Something went wrong', err);
                });
            
        },
        [linkForOrder],
    );

    useResizeObserver(bodyRef, () => setTimeout(() => setBody(bodyRef.current), 300));
    useResizeObserver(contentRef, () => setTimeout(() => setContent(contentRef.current), 300));

    return (
        <div
            className='content-select-social-network'
            style={selectSocialNetworkStyles}
            ref={bodyRef}
        >
            <div
                ref={contentRef}
            >
                <div
                    className='content-select-social-network__header'
                >
                    <h3
                        className='content-select-social-network__header-title'
                    >
                        Select a method of communication
                    </h3>
                    <Close
                        className='content-select-social-network__close-icon'
                        onClick={() => props.toggleComponent(false)}
                    />
                </div>
                <div
                    className='content-select-social-network__item'
                >
                    {props.totalPrice}
                </div>
            </div>
            <div
                className='content-select-social-network__links-wrap'
                style={linksWrapStyles}
            >
                <div
                    className='
                        content-select-social-network__item
                        content-select-social-network__link
                        content-select-social-network__link--telegram
                    '
                    onClick={selectTelegramNetwork}
                >
                    <h4 className='content-select-social-network__link-title'>
                        Telegram
                    </h4>
                    <Telegram />
                </div>
                <div
                    
                    className='
                        content-select-social-network__item
                        content-select-social-network__link
                        content-select-social-network__link--whatsapp
                    '
                    onClick={selectWhatsappNetwork}
                >
                    <h4 className='content-select-social-network__link-title'>
                        WhatsApp
                    </h4>
                    <Whatsapp />
                </div>
                <div
                    
                    className='
                        content-select-social-network__item
                        content-select-social-network__link
                        content-select-social-network__link--viber
                    '
                    onClick={selectViberNetwork}
                >
                    <h4 className='content-select-social-network__link-title'>
                        Viber
                    </h4>
                    <Viber />
                </div>
                <div
                    
                    className='
                        content-select-social-network__item
                        content-select-social-network__link
                        content-select-social-network__link--imessage
                    '
                    onClick={selectIMessageNetwork}
                >
                    <h4 className='content-select-social-network__link-title'>
                        IMessage
                    </h4>
                    <Imessage />
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}