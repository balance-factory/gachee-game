import React from "react";
import IconImpl, { IconTypes } from "./IconImpl";
import * as IconRepo from "./IconRepository";

interface IconHocProps {
    xxsmall?: boolean;
    xsmall?: boolean;
    small?: boolean;
    medium?: boolean;
    xlarge?: boolean;
    xxlarge?: boolean;
    xxxlarge?: boolean;
    fill?: boolean;
    selected?: boolean;
    active?: boolean;
    hover?: boolean;
    // color?: ICON_COLOR_TYPE;
    onClick?: () => void;
}

const IconHOC = (iconType: IconTypes) => {
    const Inner: React.FC<IconHocProps> = (props) => {
        const size = {
            xxxlarge: 48,
            xxlarge: 40,
            xlarge: 32,
            large: 28,
            medium: 24,
            small: 20,
            xsmall: 16,
            xxsmall: 12,
        };

        const setSize = () => {
            return props.xxxlarge
                ? size.xxxlarge
                : props.xxlarge
                ? size.xxlarge
                : props.xlarge
                ? size.xlarge
                : props.medium
                ? size.medium
                : props.small
                ? size.small
                : props.xsmall
                ? size.xsmall
                : props.xxsmall
                ? size.xxsmall
                : size.large;
        };

        const setHoverColor = (color: string) => {
            return props.hover ? color : undefined;
        };

        const setActiveColor = (color: string) => {
            return props.active ? color : undefined;
        };

        return (
            <IconImpl
                name={iconType}
                // color={
                //     props.selected
                //         ? "primary-orange-default"
                //         : props.selected === false
                //         ? "neutral-gray-50"
                //         : props.color
                //         ? props.color
                //         : "neutral-gray-100"
                // }
                size={setSize()}
                hoverColor={setHoverColor("var(--neutral-gray-10)")}
                activeColor={setActiveColor("var(--neutral-gray-20)")}
                onClick={props.onClick}
            />
        );
    };

    return Inner;
};

const Icon = {
    IconRepo,
    //regacy
    ArrowSVGIcon: IconHOC(IconTypes.ArrowSVGIcon),
};

export default Icon;
