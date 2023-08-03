import styled from "styled-components";
import React, { useEffect } from "react";
import { REST_API_KEY, REDIRECT_URI } from "KakaoOAuth";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
    const navigate = useNavigate();
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code `;
    const KAKAO_CODE = new URL(location.href).searchParams.get("code");

    const getKakaoToken = (kakaoCode: string) => {
        fetch(`https://kauth.kakao.com/oauth/token`, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded;charset=utf-8" },
            body: `grant_type=authorization_code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${kakaoCode}`,
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.access_token) {
                    const date = new Date();
                    date.setTime(date.getTime() + 5 * 24 * 60 * 60 * 1000);
                    document.cookie = "kakao_token=" + data.access_token + ";expires=" + date.toUTCString() + ";path=/";
                    navigate(`/category`);
                } else {
                    navigate(`/`);
                }
            });
    };

    useEffect(() => {
        KAKAO_CODE ? getKakaoToken(KAKAO_CODE) : navigate(`/login`);
    }, [KAKAO_CODE]);

    return (
        <Header>
            로그인 페이지
            <button onClick={() => (window.location.href = KAKAO_AUTH_URL)}>카카오톡으로 로그인 하기</button>
        </Header>
    );
};
export default Login;

const Header = styled.h1`
    color: blue;
    font-family: Galmuri;
`;
