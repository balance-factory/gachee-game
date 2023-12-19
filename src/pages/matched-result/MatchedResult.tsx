import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import * as Interface from "../../interface";
import * as VM from "./MatchedResultViewModel";
import styled from "styled-components";
import BlueStar from "../../assets/icon/blue-star.svg";
import Return from "../../assets/icon/small-return.svg";
import Home from "../../assets/icon/home_icon.svg";
import * as Util from "../../utils";
import * as Components from "../result/components";

const MatchedResult: React.FC = () => {
  const navigate = useNavigate();
  const categoryId = localStorage.getItem("categoryId");
  const myId = localStorage.getItem("myUserId");
  const { matchUserId } = useParams();
  const [resultInfo, setResultInfo] =
    useState<Interface.MatchedUserResultInfo>();

  useEffect(() => {
    matchUserId &&
      VM.getSelectedUserAnswers(Number(categoryId), matchUserId)
        .then((res) => {
          setResultInfo(res);
        })
        .catch((err) => {
          if (err.status) {
          }
        });
  }, []);

  const handleClickHome = () => {
    navigate(`/`);
  };

  const handleClickRetryTest = () => {
    navigate(`/category`);
  };

  const handleClickShare = () => {
    Util.addClipboard(
      `/?category-id=${categoryId}?my-user-id=${myId}&match-user-id=${matchUserId}`
    );
  };

  return (
    <MatchedUserLayout>
      <MatchLayoutWrap>
        <Header>
          <IconWrap onClick={handleClickHome}>
            <Home />
          </IconWrap>
        </Header>
        <InnnerMatchedUserViewLayout>
          <InnerTitleLayout>
            <Title>
              <BlueStarIcon style={{ top: "-15px", left: "-20px" }}>
                <BlueStar />
              </BlueStarIcon>
              <TitleText>테스트가 끝났습니다.</TitleText>
              <BlueStarIcon style={{ bottom: "-15px", right: "-20px" }}>
                <BlueStar />
              </BlueStarIcon>
            </Title>
            {resultInfo && (
              <Components.Score
                userScore={resultInfo.matchedScore ?? 0}
                matchedUserName={resultInfo.matchedUserName ?? ""}
              />
            )}
            <SubTitle>
              가치관을 확인한 상대에게
              <br />
              결과를 공유해주세요.
            </SubTitle>
            <ResultShareButton onClick={handleClickShare}>
              <ButtonText>결과 공유하기</ButtonText>
            </ResultShareButton>

            <RetryTest onClick={handleClickRetryTest}>
              <Return />
              <RetryTestText>테스트 다시하기</RetryTestText>
            </RetryTest>
          </InnerTitleLayout>
          <DividerContent>
            <Divider />
            <ContentTitle>전체 답안 보기</ContentTitle>
            <Divider />
          </DividerContent>
          {resultInfo?.resultList.map((result, index) => {
            return (
              <Components.SelectResult
                result={result}
                index={index}
                matchUserId={matchUserId}
                matchUserName={resultInfo.matchedUserName}
                key={`result_${result.questionId}`}
              />
            );
          })}
        </InnnerMatchedUserViewLayout>
      </MatchLayoutWrap>
    </MatchedUserLayout>
  );
};

export default MatchedResult;

const MatchedUserLayout = styled.div`
  width: 100%;
  height: 100vh;
  overflow: scroll;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(#010614, #171a5f);
`;

const MatchLayoutWrap = styled.div`
  width: 100%;
  height: 100%;
  padding-bottom: 100px;
`;

const Header = styled.div`
  width: 100%;
  height: 58px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 20px 0 20px;
  color: #fff;
`;

const IconWrap = styled.div``;

const InnnerMatchedUserViewLayout = styled.div`
  width: 100%;
  height: auto;
  padding: 0 20px 80px;
`;

const InnerTitleLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 64px 60px 0;
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 200px;
  margin: 0 auto;
  margin-bottom: 40px;
`;

const BlueStarIcon = styled.div`
  position: absolute;
`;

const TitleText = styled.div`
  font-family: Galmuri_Bold;
  font-weight: 700;
  font-size: 20px;
  color: #ff70d0;
`;

const SubTitle = styled.div`
  margin-top: 32px;
  font-size: 14px;
  color: #fff;
  text-align: center;
  font-weight: 400;
`;

const ResultShareButton = styled.div`
  margin-top: 23px;
  width: 355px;
  height: 46px;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #ff70d0;
  color: #ff70d0;
`;

const ButtonText = styled.div`
  color: #ff70d0;
  font-size: 16px;
`;

const RetryTest = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RetryTestText = styled.div`
  color: #fff;
  font-size: 14px;
  margin-left: 10px;
`;

const DividerContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 3px;
  margin-top: 43px;
`;

const Divider = styled.div`
  width: 36%;
  height: 1px;
  border: dashed 1px #fff;
`;

const ContentTitle = styled.div`
  color: #fff;
  width: 130px;
  margin: 0 10px;
  text-align: center;
  font-family: Galmuri_Bold;
`;
