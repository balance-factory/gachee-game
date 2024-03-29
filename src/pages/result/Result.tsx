import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BackArrow from "../../assets/icon/back_arrow_icon.svg";
import * as Interface from "../../interface";
import * as Component from "./components";
import * as VM from "./ResultViewModel";
import * as Components from "pages/components";

const ResultView: React.FC = () => {
  const categoryId = localStorage.getItem("categoryId");

  const { matchUserId } = useParams();
  const navigate = useNavigate();
  const [resultInfo, setResultInfo] =
    useState<Interface.MatchedUserResultInfo>();
  const [openError, setOpenError] = useState<boolean>(false);

  useEffect(() => {
    // 컴포넌트가 마운트되었을 때 호출
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

  const clickBack = () => {
    navigate(`/match-list/${categoryId}`);
  };

  return (
    <MyAnswerLayout>
      <MyAnswerLayoutWrap>
        <Header>
          <IconWrap onClick={clickBack}>
            <BackArrow />
          </IconWrap>
        </Header>
        <InnnerMyAnswerViewLayout>
          {resultInfo && (
            <>
              <Component.Score
                userScore={resultInfo.matchedScore ?? 0}
                matchedUserName={resultInfo.matchedUserName ?? ""}
              />
              <DividerContent>
                <Divider />
                <ContentTitle>전체 답안 보기</ContentTitle>
                <Divider />
              </DividerContent>
            </>
          )}
          {resultInfo?.resultList.map((result, index) => {
            return (
              <Component.SelectResult
                result={result}
                index={index}
                matchUserId={matchUserId}
                matchUserName={resultInfo.matchedUserName}
                key={`result_${result.questionId}`}
              />
            );
          })}
        </InnnerMyAnswerViewLayout>
      </MyAnswerLayoutWrap>
      {openError && (
        <Components.ErrorPopup cancelButton={() => setOpenError(false)} />
      )}
    </MyAnswerLayout>
  );
};

export default ResultView;

const MyAnswerLayout = styled.div`
  width: 100%;
  height: 100vh;
  overflow: scroll;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(#010614, #171a5f);
`;

const MyAnswerLayoutWrap = styled.div`
  height: 100%;
  height: 100%;
  padding-bottom: 100px;
`;

const Header = styled.div`
  width: 100%;
  height: 58px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  color: #fff;
  margin-bottom: 62px;
`;

const InnnerMyAnswerViewLayout = styled.div`
  width: 100%;
  padding: 0 20px 80px;
`;

const IconWrap = styled.div``;

const DividerContent = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 3px;
  margin-top: 40px;
`;

const Divider = styled.div`
  width: 40%;
  height: 1px;
  border: dashed 1px #fff;
`;

const ContentTitle = styled.div`
  color: #fff;
  width: 130px;
  margin: 0 10px;
  text-align: center;
`;
