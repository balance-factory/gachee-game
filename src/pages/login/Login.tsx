import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { REST_API_KEY, REDIRECT_URI } from "../../KakaoOAuth";
import * as VM from "./LoginViewModel";
import uuid from "react-uuid";
import * as Images from "../../assets/image";
import * as Icons from "../../assets/icon";
import Button from "../../assets/icon/main_button_icon.svg";

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
                        <HeartIcon src={Images.Heart} />
                        <TitleIcon src={Images.Title} />

                        <ButtonIconLayout>
                            <Button />
                        </ButtonIconLayout>
                    </Border>
                </Content>
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

const NavIcon = styled.img`
    width: 92px;
    height: 28px;
`;

const HeartIcon = styled.img`
    width: 50px;
    height: 44px;
    position: absolute;
    top: calc(50% - 100px);
    left: calc(50% - 18px);
`;

const TitleIcon = styled.img`
    width: 299px;
    height: 72px;
    position: absolute;
    top: calc(50% - 60px);
    left: calc(50% - 145px);
`;

const ButtonIconLayout = styled.div`
    position: absolute;
    bottom: 36px;
    left: calc(50% - 145px);
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
    position: relative;
`;
