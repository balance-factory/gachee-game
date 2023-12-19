import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BackArrow from "../../assets/icon/back_arrow_icon.svg";
import * as Interface from "../../interface";
import * as Component from "./components";
import * as VM from "./MyAnswerViewModel";

const MyAnswerView: React.FC = () => {
  const navigate = useNavigate();
  const categoryId = localStorage.getItem("categoryId");
  const [myAnswers, setMyAnswers] = useState<Interface.MySelectResult[]>();

  useEffect(() => {
    VM.getUserResult(Number(categoryId))
      .then((res) => {
        setMyAnswers(res);
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
          {myAnswers?.map((result, index) => {
            return (
              <Component.AnswerItem
                key={result.questionId}
                result={result}
                index={index}
              />
            );
          })}
        </InnnerMyAnswerViewLayout>
      </MyAnswerLayoutWrap>
    </MyAnswerLayout>
  );
};

export default MyAnswerView;

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
  width: 740px;
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
