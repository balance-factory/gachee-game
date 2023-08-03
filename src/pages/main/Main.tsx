import styled from "styled-components";
import React, { useState } from "react";
import uuid from "react-uuid";
import * as VM from "./MainViewModel";
import * as Images from "assets/image";
import Button from "assets/icon/main_button_icon.svg";
import { useNavigate } from "react-router-dom";

const Main: React.FC = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState<VM.UserType[]>(VM.getUsers);
    const KAKAO_TOKEN = document.cookie.match(
        new RegExp("(?:^|; )" + "kakao_token".replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") + "=([^;]*)")
    );

    const getKakaoToken = () => {
        if (KAKAO_TOKEN) {
            const TOKEN = decodeURIComponent(KAKAO_TOKEN[1]);

            fetch(`https://kapi.kakao.com/v2/user/me`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${TOKEN}`,
                    "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
                },
            })
                .then((res) => res.json())
                .then((kakaoUser) => {
                    const userInfo: VM.UserType = {
                        gender: kakaoUser.kakao_account.gender,
                        name: kakaoUser.kakao_account.profile.nickname,
                        email: kakaoUser.kakao_account.email,
                        userId: uuid(),
                    };
                    VM.addUser(userInfo);
                    navigate(`/category`);
                });
        } else {
            navigate(`/login`);
        }
    };

    return (
        <MainViewLayout>
            <ContentLayout>
                <Header>
                    <NavIcon src={Images.NavBar} />
                </Header>

                <Content>
                    <Border>
                        <HeartIcon src={Images.Heart} />
                        <TitleIcon src={Images.Title} />

                        <ButtonIconLayout onClick={() => getKakaoToken()}>
                            {/* 클릭시 로그인 팝업띄우기 */}
                            <ButtonText>start</ButtonText>
                            <Button />
                        </ButtonIconLayout>
                    </Border>
                </Content>
            </ContentLayout>
        </MainViewLayout>
    );
};

export default Main;

const MainViewLayout = styled.div`
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

const ButtonText = styled.div`
    position: absolute;
    bottom: 28px;
    left: calc(50% - 20px);
    font-size: 16px;
    font-weight: 700;
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
