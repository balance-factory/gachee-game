import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { REST_API_KEY, REDIRECT_URI } from "../../KakaoOAuth";
import * as VM from "./LoginViewModel";
import uuid from "react-uuid";
import * as Images from "../../assets/image";

const Login = () => {
    const [users, setUsers] = useState<VM.UserType[]>([]);
    const KAKAO_CODE = new URL(location.href).searchParams.get("code");

    const getKakaoToken = () => {
        console.log("getKakaoToken 실행됨");
        fetch(`https://kauth.kakao.com/oauth/token`, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded;charset=utf-8" },
            body: `grant_type=authorization_code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${KAKAO_CODE}`,
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.access_token) {
                    fetch(`https://kapi.kakao.com/v2/user/me`, {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${data.access_token}`,
                            "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
                        },
                    })
                        .then((res) => res.json())
                        .then((kakaoUser) => {
                            console.log(kakaoUser);
                            const userInfo: VM.UserType = {
                                gender: kakaoUser.kakao_account.gender,
                                name: kakaoUser.kakao_account.profile.nickname,
                                email: kakaoUser.kakao_account.email,
                                userId: uuid(),
                            };
                            VM.addUser(userInfo);
                        });

                    // localStorage.setItem("token", data.access_token);
                    // window.location.href = "/guide";
                } else {
                    window.location.href = "/";
                }
            });
    };

    useEffect(() => {
        setUsers(VM.getUsers);
        if (!location.search) return;
        getKakaoToken();
    }, []);

    return (
        <LoginLayout>
            <LoginWrap>
                <Header></Header>
                <InnerLayout image={Images.BackgroundImage}>
                    <Border></Border>
                </InnerLayout>
            </LoginWrap>
        </LoginLayout>
    );
};

export default Login;

const LoginLayout = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: lightgray;
`;

const LoginWrap = styled.div`
    width: 740px;
    height: 100vh;

    @media (max-width: 700px) {
        width: 700px;
    }
`;

const Header = styled.div`
    width: 100%;
    height: 48px;
    background-color: lightpink;

    @media (max-width: 700px) {
        width: 100%;
    }
`;

const InnerLayout = styled.div<{ image: string }>`
    width: 100%;
    height: calc(100vh - 48px);
    background: ${(props) => `url(${props.image}) center / contain no-repeat #171A5F`};
`;

const Border = styled.div``;
