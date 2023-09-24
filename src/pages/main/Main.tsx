import styled from "styled-components";
import React, { useState, useEffect } from "react";
import * as Modal from "./modal";
import * as Images from "assets/image";
import Button from "assets/icon/main_button_icon.svg";
import Dot from "assets/icon/dot.svg";
import { useSearchParams, useNavigate } from "react-router-dom";
import * as VM from "./MainViewModel";

const Main: React.FC = () => {
  const navigate = useNavigate();
  const [isModal, setModal] = useState<boolean>(false);
  const [matchedUserName, setMatchedUserName] = useState<string>();
  const [serchParams, setSearchParams] = useSearchParams();
  const matchUserId = serchParams.get("match-user-id");
  const myUserId = serchParams.get("my-user-id");
  const categoryId = serchParams.get("category-id");

  myUserId && window.sessionStorage.setItem("my-user-id", myUserId);
  matchUserId && window.sessionStorage.setItem("match-user-id", matchUserId);
  categoryId && window.sessionStorage.setItem("category-id", categoryId);

  const fetchGetUserInfo = async (matchedUserId: string) => {
    try {
      const UserInfo = await VM.getUserInfo(matchedUserId);
      UserInfo && setMatchedUserName(UserInfo.name);
    } catch (error) {
      console.error("Error fetching matched users:", error);
    }
  };

  useEffect(() => {
    if (matchUserId && myUserId && categoryId) {
      navigate(`/match-list/${categoryId}`);
    } else {
      matchUserId && fetchGetUserInfo(matchUserId);
    }
  }, []);

  return (
    <MainViewLayout>
      <ContentLayout>
        <Header>
          <NavIcon src={Images.NavBar} />
        </Header>
        <Content>
          <DotLayout>
            <Dot />
          </DotLayout>
          <Border>
            <HeartIcon src={Images.Heart} />
            <TitleIcon src={Images.Title} />
            {matchedUserName && (
              <MatchedText>
                {matchedUserName}님이 테스트를
                <br />
                보냈어요!
              </MatchedText>
            )}
            <ButtonIconLayout onClick={() => setModal(true)}>
              <ButtonText>
                {matchedUserName ? "함께 테스트하기" : "start"}
              </ButtonText>
              <Button />
            </ButtonIconLayout>
          </Border>
        </Content>
      </ContentLayout>
      {isModal && <Modal.LoginModal cancelButton={() => setModal(false)} />}
    </MainViewLayout>
  );
};

export default Main;

const MatchedText = styled.div`
  position: absolute;
  bottom: 340px;
  width: 100%;
  color: white;
  font-size: 24px;
  text-align: center;
`;

const MainViewLayout = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
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
  width: 100%;
  text-align: center;
  font-size: 16px;
  font-weight: 700;
`;

const Content = styled.div`
  position: relative;
  width: 100%;
  height: calc(100% - 48px);
  padding: 24px 20px;
  background-color: #171a5f;
`;

const DotLayout = styled.div`
  position: absolute;
`;

const Border = styled.div`
    width: 100%;
    height: 100%;
    border: 1px solid #fff;
    position: relative;
`;
