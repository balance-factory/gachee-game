import styled from "styled-components";
import React, { useState } from "react";
import * as Modal from "./modal";
import * as Images from "assets/image";
import Button from "assets/icon/main_button_icon.svg";

const Main: React.FC = () => {
  const [isModal, setModal] = useState<boolean>(false);
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

            <ButtonIconLayout onClick={() => setModal(true)}>
              <ButtonText>start</ButtonText>
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

const MainViewLayout = styled.div`
  width: 100%;
  height: 100vh;
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
