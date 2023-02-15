import styled from "styled-components";
import { useEffect, useState } from "react";
import { REST_API_KEY, REDIRECT_URI } from "../../KakaoOAuth";
import * as API from "../../api";
import { json } from "react-router-dom";

const Login = () => {
    const [users, setUsers] = useState<{ gender: string; name: string }>({
        gender: "",
        name: "",
    });
    const KAKAO_CODE = new URL(location.href).searchParams.get("code");

    const getUsers = () => {
        fetch(API.UsersDatabaseURL)
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                console.log("res", res);
                setUsers(res);
            });
    };

    const addUser = (user: { gender: string; name: string }) => {
        fetch(API.UsersDatabaseURL, {
            method: "POST",
            body: JSON.stringify(user),
        }).then((res) => {
            if (res.status !== 200) {
                throw new Error(res.statusText);
            }
            return res.json();
        });
    };

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
                            const userInfo: { gender: string; name: string } = {
                                gender: kakaoUser.kakao_account.gender,
                                name: kakaoUser.kakao_account.profile.nickname,
                            };
                            addUser(userInfo);
                        });

                    // localStorage.setItem("token", data.access_token);
                    // window.location.href = "/guide";
                } else {
                    window.location.href = "/";
                }
            });
    };

    useEffect(() => {
        getUsers();
        if (!location.search) return;
        getKakaoToken();
    }, []);

    return <Header>로그인 페이지</Header>;
};

export default Login;

const Header = styled.h1`
    color: red;
`;
