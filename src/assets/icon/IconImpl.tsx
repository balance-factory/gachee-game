import React from "react";
import styled from "styled-components";
import * as IconRepo from "./IconRepository";

interface IconImplementProps {
    name: IconTypes;
    size: number;
    hoverColor?: string;
    activeColor?: string;
    onClick?: () => void;
}

const IconImpl: React.FC<IconImplementProps> = (props) => {
    return (
        <SVG_Style
            size={props.size}
            hoverColor={props.hoverColor}
            activeColor={props.activeColor}
            onClick={props.onClick}
            // color={props.name === IconTypes.Error ? undefined : props.color}
            style={{ cursor: props.onClick ? "pointer" : undefined }}
        >
            {Icons[props.name]}
        </SVG_Style>
    );
};

interface SVG_Props {
    size: number;
    // color?: ICON_COLOR_TYPE;
    hoverColor?: string;
    activeColor?: string;
}

const SVG_Style = styled.div<SVG_Props>`
    display: inline-block;
    border-radius: 50%;

    svg {
        vertical-align: middle;
        width: ${(props) => props.size}px;
        height: ${(props) => props.size}px;
    }

    svg path:nth-last-child(1) {
        fill: ${(props) => {
            if (props.color) {
                return `var(--${props.color})`;
            } else {
                return "";
            }
        }};
    }

    &:hover {
        background-color: ${(props) => (props.hoverColor ? props.hoverColor : "initial")};
    }

    &:active {
        background-color: ${(props) => (props.activeColor ? props.activeColor : "initial")};
    }

    @media (max-width: 768px) {
        &:hover {
            background-color: initial;
        }

        &:active {
            background-color: ${(props) => (props.activeColor ? props.activeColor : "initial")};
        }
    }
`;

export enum IconTypes {
    ArrowSVGIcon = "ArrowSVGIcon",
}

const Icons = {
    //regacy
    ArrowSVGIcon: <IconRepo.ArrowSVGIcon viewBox={"0 0 20 20"} />,
};

export default IconImpl;
