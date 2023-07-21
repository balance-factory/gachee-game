import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { REST_API_KEY, REDIRECT_URI } from "../../KakaoOAuth";
import * as VM from "./LoginViewModel";
import uuid from "react-uuid";
import * as Images from "../../assets/image";
import Arrow from "../../assets/icon/arrow_icon.svg";

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
        <LoginViewLayout>
            <ContentLayout>
                <Header>
                    <NavIcon src={Images.NavBar} />
                </Header>

                <Content>
                    <Border>
                        <SVG_Style>
                            <Arrow />

                            {/*
                            <svg
                                width="10"
                                height="15"
                                viewBox="0 0 10 15"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M2.5 0H0V15H2.5V12.5H5V10.4167H7.5V9.16667H10V6.25H7.5V5H5V2.5H2.5V0Z"
                                    fill="white"
                                />
                            </svg> */}

                            {/* <Images.ArrowSVGIcon viewBox={"0 0 24 24"} /> */}
                        </SVG_Style>
                    </Border>
                </Content>
                {/* 로그인 페이지 */}
            </ContentLayout>
        </LoginViewLayout>
    );
};

export default Login;

const LoginViewLayout = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ContentLayout = styled.div`
    width: 740px;
    height: 100%;
`;

const Header = styled.div`
    width: 100%;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: end;
    padding-right: 20px;
    background-color: #f56571;
`;

const A = styled.svg`
    width: 92px;
    height: 28px;
`;

const NavIcon = styled.img`
    width: 92px;
    height: 28px;
`;

const SVG_Style = styled.div`
    width: 92px;
    height: 28px;

    /* svg {
        vertical-align: middle;
        width: 92px;
        height: 28px;
    } */
`;

const Content = styled.div`
    width: 100%;
    height: calc(100% - 48px);
    padding: 24px 20px;
    background: url(${Images.MainBackground}) center / contain no-repeat #171a5f;
`;

const Border = styled.div`
    width: 100%;
    height: 100%;
    border: 1px solid #fff;
`;
