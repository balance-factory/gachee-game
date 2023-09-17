import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BackArrow from "../../assets/icon/back_arrow_icon.svg";
import * as Interface from "../../interface";
import * as Component from "./components";
import * as Util from "../../utils";

const RESULTS: Interface.SelectResult[] = [
    {
        id: "dfsdfdfsf",
        question: "10살 차이나는 이성의 소개팅이 들어왔다.",
        auserAnswerId: "1",
        buserAnswerId: "1",
        answers: [
            { id: "1", text: "위로 10살을 받는다.", select: false },
            { id: "2", text: "아래로 10살을 받는다.", select: true },
        ],
    },
    {
        id: "dfsewerdfsf",
        question: "10살 차이나는 이성의 소개팅이 들어왔다.",
        auserAnswerId: "1",
        buserAnswerId: "2",
        answers: [
            { id: "1", text: "위로 10살을 받는다.", select: false },
            { id: "2", text: "아래로 10살을 받는다.", select: true },
        ],
    },
    {
        id: "dfsdfdfsf",
        question: "10살 차이나는 이성의 소개팅이 들어왔다.",

        auserAnswerId: "1",
        buserAnswerId: "1",
        answers: [
            { id: "1", text: "위로 10살을 받는다.", select: true },
            { id: "2", text: "아래로 10살을 받는다.", select: false },
        ],
    },
    {
        id: "dfsdfdfsf",
        question: "10살 차이나는 이성의 소개팅이 들어왔다.",
        auserAnswerId: "1",
        buserAnswerId: "1",
        answers: [
            { id: "1", text: "위로 10살을 받는다.", select: false },
            { id: "2", text: "아래로 10살을 받는다.", select: true },
        ],
    },
    {
        id: "dfsewerdfsf",
        question: "10살 차이나는 이성의 소개팅이 들어왔다.",
        auserAnswerId: "1",
        buserAnswerId: "1",
        answers: [
            { id: "1", text: "위로 10살을 받는다.", select: false },
            { id: "2", text: "아래로 10살을 받는다.", select: true },
        ],
    },
    {
        id: "dfsdfdfsf1",
        question: "10살 차이나는 이성의 소개팅이 들어왔다.",
        auserAnswerId: "1",
        buserAnswerId: "1",
        answers: [
            { id: "1", text: "위로 10살을 받는다.", select: true },
            { id: "2", text: "아래로 10살을 받는다.", select: false },
        ],
    },
    {
        id: "dfsdfdfsf2",
        question: "10살 차이나는 이성의 소개팅이 들어왔다.",
        auserAnswerId: "1",
        buserAnswerId: "1",
        answers: [
            { id: "1", text: "위로 10살을 받는다.", select: false },
            { id: "2", text: "아래로 10살을 받는다.", select: true },
        ],
    },
    {
        id: "dfsewerdfsf3",
        question: "10살 차이나는 이성의 소개팅이 들어왔다.",
        auserAnswerId: "1",
        buserAnswerId: "1",
        answers: [
            { id: "1", text: "위로 10살을 받는다.", select: false },
            { id: "2", text: "아래로 10살을 받는다.", select: true },
        ],
    },
    {
        id: "dfsdfdfsf4",
        question: "10살 차이나는 이성의 소개팅이 들어왔다.",
        auserAnswerId: "1",
        buserAnswerId: "1",
        answers: [
            { id: "1", text: "위로 10살을 받는다.", select: true },
            { id: "2", text: "아래로 10살을 받는다.", select: false },
        ],
    },
];

const MyAnswerView: React.FC = () => {
    const RESULTSCORE = RESULTS.map((result) => result.auserAnswerId === result.buserAnswerId).length;

    const navigate = useNavigate();

    const clickBack = () => {
        navigate("/match-list");
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
                    <ScoreLayout>
                        <ScoreTitle>나와 김도희의 가치관은</ScoreTitle>
                        <Score score={Util.calculateScore(RESULTSCORE)}>{`${Util.calculateScore(
                            RESULTSCORE
                        )}% 일치`}</Score>
                    </ScoreLayout>
                    <DividerContent>
                        <Divider />
                        <ContentTitle>전체 답안 보기</ContentTitle>
                        <Divider />
                    </DividerContent>
                    {RESULTS.map((result, index) => {
                        return <Component.SelectResult result={result} index={index} key={result.id} />;
                    })}
                </InnnerMyAnswerViewLayout>
            </MyAnswerLayoutWrap>
        </MyAnswerLayout>
    );
};

export default MyAnswerView;

const MyAnswerLayout = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(#010614, #171a5f);
`;

const MyAnswerLayoutWrap = styled.div`
    width: 740px;
    height: 100vh;
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

const ScoreLayout = styled.div`
    width: 100%;
    height: 130px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border: 3px solid #bbcbcb;
`;

const ScoreTitle = styled.div`
    font-size: 16px;
    margin-bottom: 6px;
    color: #fff;
`;

const Score = styled.div<{ score: number }>`
    font-family: Galmuri_Bold;
    font-size: 24px;
    color: ${(props) => (props.score <= 39 ? "#E5505D" : props.score > 39 && props.score < 80 ? "#F2AA18" : "#1eb82d")};
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
    margin: 0 10px;
`;
