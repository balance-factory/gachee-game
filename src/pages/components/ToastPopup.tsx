import React, { useState, useEffect } from "react";
import Check from "../../assets/icon/check.svg";
import styled from "styled-components";

interface ToastProps {
    isOpen: boolean;
    title: string;
}

const ToastPopup: React.FC<ToastProps> = ({ isOpen, title }) => {
    const [onToast, setOnToast] = useState<boolean>(isOpen);

    useEffect(() => {
        setTimeout(() => {
            setOnToast(false);
        }, 3000);
    }, []);

    return (
        <>
            {onToast ? (
                <ToastBox>
                    <div>
                        <Check />
                    </div>
                    <ToastText>{title}</ToastText>
                </ToastBox>
            ) : null}
        </>
    );
};

export default ToastPopup;

const ToastBox = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 208px;
    height: 120px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 16px;
    background: var(--Dimmed-80, rgba(0, 0, 0, 0.8));
    box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.08);
    backdrop-filter: blur(4px);
`;

const ToastText = styled.div`
    margin-top: 16px;
    font-size: 20px;
    color: #7b7da1;
    white-space: pre;
    text-align: center;
`;
