import { createGlobalStyle } from "styled-components";
import * as Images from "../../src/assets/image";
import Galmurittf from "../assets/font/Galmuri11.ttf";
import GalmuriBoldttf from "../assets/font/Galmuri11-Bold.ttf";

const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
        outline: none;
        font-family:Galmuri;
        letter-spacing: -0.8px;
        word-break: keep-all;
        overflow-wrap: break-word;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        /* cursor: url(https://t1.daumcdn.net/cfile/tistory/246AC64B56E089B41A), url(two.svg) 5 5, progress; */
        cursor: url(${Images.Mouse}) , auto;
 
        /* .cursor {
      width: 10px;
      height: 10px;
      border: 2px solid var(--color-texta);
      border-radius: 50%;
      position: absolute;
      z-index: 1000;
      transform: translate(-50%, -50%);
      pointer-events: none;
      transition: all 0.3s ease;
      transition-property: background, transform;
      transform-origin: 100% 100%;
      backdrop-filter: sepia(20%);
      background-size: cover;
  } */

        .cursor-png {
            cursor: url(${Images.Mouse}), auto;
        }

        /* width */
        ::-webkit-scrollbar {
            width: 6px;
            height: 6px;
        }

        /* Track */
        ::-webkit-scrollbar-track {
            background: initial;
        }

        /* Handle */
        ::-webkit-scrollbar-thumb {
            background: #C8D1E0;
        }

        /* Handle on hover */
        ::-webkit-scrollbar-thumb:hover {
            background: var(--neutral-gray-50);
        }

        @media(max-width: 768px){
            ::-webkit-scrollbar {
                display:none;
            }
        }
    }

    :root {
        --background: #f7f7f7;
        --primary-orange-opacity: #fde0d9;
        --primary-orange-default: #f44016;
        --primary-orange-dark: #cd2f0a;
        --neutral-white-default: #ffffff;
        --neutral-gray-10: #f5f7fa;
        --neutral-gray-20: #ebeff5;
        --neutral-gray-30: #dde3ed;
        --neutral-gray-40: #c8d1e0;
        --neutral-gray-50: #afbacc;
        --neutral-gray-60: #8e99ab;
        --neutral-gray-70: #707a8a;
        --neutral-gray-80: #58606e;
        --neutral-gray-90: #434a54;
        --neutral-gray-100: #333840;
        --neutral-black-default: #000000;
        --error-red-opacity: #fccddf;
        --error-red-default: #ff0200;
        --error-red-dark: #b4131b;
        --success-green-opacity: #c6ebd0;
        --success-green-default: #26a149;
        --success-green-dark: #188941;
        --warning-yellow-opacity: #f7ffcb;
        --warning-yellow-default: #fec200;
        --warning-yellow-dark: #cf9200;
        --information-blue-opacity: #c0d2f8;
        --information-blue-default: #0043ce;
        --information-blue-dark: #0041ab;
        --tasktype-etc-gray-opacity: #ececeb;
        --tasktype-etc-gray-default: #848485;
        --tasktype-exchange-yellow-opacity: #fff8e6;
        --tasktype-exchange-yellow-default: #ffb700;
        --tasktype-prepaid-navy-opacity: #edeef4;
        --tasktype-prepaid-navy-default: #47538f;
        --tasktype-pickup-blue-opacity: #edf0fe;
        --tasktype-pickup-blue-default: #4865f3;
        --tasktype-return-coral-opacity: #ffeeef;
        --tasktype-return-coral-default: #ff4f5e;
        --tasktype-sample-emerald-opacity: #b5f0dc;
        --tasktype-sample-emerald-default: #02c886;
        --tasktype-sample-return-pink-opacity: #f8aff8;
        --tasktype-sample-return-pink-default: #ec06e8;
    }

   

    @font-face {
        font-family:Galmuri_Bold;
        src:url(${GalmuriBoldttf}) format('truetype');
        font-display: swap;

    }

    @font-face {
        font-family:Galmuri;
        src:url(${Galmurittf}) format('truetype');
        font-display: swap;
    }

    @font-face {
        font-family: GmarketSansMedium;
        src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/GmarketSansMedium.woff') format('woff');
    }

    @font-face {
        font-family: GmarketSansBold;
        src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/GmarketSansBold.woff') format('woff');
    }



    body {
        font-family: Galmuri, sans-serif;
        margin: 0px;
        box-sizing: border-box;
        min-width: 1280px;
    

        @media (max-width: 768px) {
            min-width: auto;
        }
    }

    ul {
        margin: 0px;
        padding: 0px;
        appearance: none;
        list-style: none;
    }

    li {
        cursor: pointer;
    }

    input {
        padding: 0px;
        margin: 0px;
        -webkit-appearance: none;
        appearance: none;
        border: none;
        font-family: NanumSquare_acR;
        font-size: 14px;
        color: var(--neutral-black-default);
        letter-spacing: 0px;
    }

    img {
        object-fit: contain;
    }

    button {
        margin: 0px;
        padding: 0px;
        appearance: none;
        border-style: none;
        border-width: none;
        border-color: none;
        background-color: initial;
    }

    .collapse-list {
        transition-duration: 0.2s;
        transition-timing-function: ease;
    }

    .expand-list {
        transition-duration: 0.2s;
        transition-timing-function: ease;
    }

    .skeleton {
        position: relative;
        overflow: hidden;
        border-radius: 8px;
        background-color: var(--neutral-gray-10);

        ::before {
            content: "";
            display: block;
            position: absolute;
            left: -100%;
            top: 0;
            height: 100%;
            width: 120px;
            background: linear-gradient(
                to right,
                var(--neutral-gray-10) 0%,
                var(--neutral-white-default) 50%,
                var(--neutral-gray-10) 100%
            );
            animation: placeholder-load 1s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
    }

    .feed-skeleton {
        position: relative;
        overflow: hidden;
        background-color: #d8d8d8;


        ::before {
            content: "";
            display: block;
            position: absolute;
            left: -100%;
            top: 0;
            height: 100%;
            width: 120px;
            background: linear-gradient(to right, #d8d8d8 0%, var(--neutral-white-default) 50%, #d8d8d8 100%);
            animation: placeholder-load 1s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
    }

    .loader,
    .loader:before,
    .loader:after {
        background: var(--neutral-gray-40);
        -webkit-animation: normal-load 1s infinite ease-in-out;
        animation: normal-load 1s infinite ease-in-out;
        width: 1em;
        height: 1em;
        border-radius: 4px;
    }
    .loader {
        color: var(--neutral-gray-40);
        text-indent: -9999em;
        margin: auto;
        position: relative;
        top: 50%;
        transform: translate(0, -50%);
        font-size: 8px;
        -webkit-transform: translateZ(0);
        -ms-transform: translateZ(0);
        transform: translateZ(0);
        -webkit-animation-delay: -0.16s;
        animation-delay: -0.16s;
    }
    .loader:before,
    .loader:after {
        content: '';
        position: absolute;
        top: 0;
    }
    .loader:before {
        left: -1.5em;
        -webkit-animation-delay: -0.32s;
        animation-delay: -0.32s;
    }
    .loader:after {
        left: 1.5em;
    }

    .toast-up {
        animation-name: desktop-toast;
        animation-duration: 3s;
        animation-iteration-count: 1;
        animation-timing-function: ease-in-out;

        @media(max-width: 768px) {
            animation-name: mobile-toast;
        }
    }
    
    .product-toast-up {
        animation-name: desktop-toast;
        animation-duration: 5s;
        animation-iteration-count: 1;
        animation-timing-function: ease-in;

        @media(max-width: 768px) {
            animation-name: mobile-toast;
        }
    }

    .expand {
        transform: rotate(180deg);
        transition-duration: 0.2s;
        transition-timing-function: ease;
    }
    .collapse {
        transform: rotate(360deg);
        transition-duration: 0.2s;
        transition-timing-function: ease;
    }

    .fade {
        transition: opacity 267ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, transform 178ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    }
`;

export default GlobalStyle;
