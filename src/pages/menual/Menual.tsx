import styled from "styled-components";
import React from "react";
import { useNavigate } from "react-router-dom";
import BackArrow from "assets/icon/back_arrow_icon.svg";

const Menual: React.FC = () => {
  const navigate = useNavigate();

  return (
    <MenualViewLayout>
      <ContentLayout>
        <Header>
          <BackArrow onClick={() => navigate(-1)} />
        </Header>

        <Content>
          <ContentText>
            안녕하세요
            <br />
            GACHEE GAME에 오신걸 환영합니다.
          </ContentText>
          게임에 대해 설명해드릴게요.
          <MenualLayout>
            <MenualText>
              1. 1명이 먼저 테스트를 진행합니다.
              <br />
              2. 테스트를 마친 뒤 가치관을 알고 싶은 상대방에게 링크 공유를
              합니다.
              <br />
              3.공유를 받은 사람이 테스트가 끝나면 자신의 게임 결과를 상대방에게
              공유합니다.
              <br />
              4.공유받은 링크로 서로의 게임 결과를 보고 가치관이 잘 맞는지
              확인합니다.
            </MenualText>
          </MenualLayout>
        </Content>
      </ContentLayout>
    </MenualViewLayout>
  );
};

export default Menual;

const MenualViewLayout = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContentLayout = styled.div`
  width: 740px;
  height: 100%;
  background: #171a5f;
  padding: 21px 20px;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: start;
`;

const Content = styled.div`
  width: 100%;
  height: calc(100% - 28px);
  padding: 114px 0 44px;
  text-align: center;
  font-size: 14px;
  color: #fff;
  font-weight: 400;
`;

const ContentText = styled.div`
  font-weight: 700;
  margin-bottom: 33px;
`;

const MenualLayout = styled.div`
  border: 1px solid #fff;
  background: #00316b;
  height: fit-content;
  padding: 45px 0 55px;
  margin-top: 24px;
  text-align: center;
`;

const MenualText = styled.div`
  color: #fff;
  font-weight: 700;
  font-size: 14px;
  line-height: 50px;
`;
