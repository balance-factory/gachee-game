import styled from "styled-components";
import React, { useState, useEffect } from "react";
import BackArrow from "../../assets/icon/back_arrow_icon.svg";

const ANSWER = [
    {
        id: "dfsdfdfsf",
        question: "10살 차이나는 이성의 소개팅이 들어왔다.",
        answers: [
            { id: "1", text: "위로 10살을 받는다.", select: false },
            { id: "2", text: "아래로 10살을 받는다.", select: true },
        ],
    },
    {
        id: "dfsewerdfsf",
        question: "10살 차이나는 이성의 소개팅이 들어왔다.",
        answers: [
            { id: "1", text: "위로 10살을 받는다.", select: false },
            { id: "2", text: "아래로 10살을 받는다.", select: true },
        ],
    },
    {
        id: "dfsdfdfsf",
        question: "10살 차이나는 이성의 소개팅이 들어왔다.",
        answers: [
            { id: "1", text: "위로 10살을 받는다.", select: true },
            { id: "2", text: "아래로 10살을 받는다.", select: false },
        ],
    },
];

const MyAnswerView: React.FC = () => {
    return (
        <MyAnswerLayout>
            <MyAnswerLayoutWrap>
                <Header>
                    <BackArrow />
                </Header>
                <InnnerMyAnswerViewLayout>
                    {ANSWER.map((answer, index) => {
                        return (
                            <ResultLayout key={answer.id}>
                                <QuestionNumber>{`Q${index + 1}`}</QuestionNumber>
                                <QuestionText>{answer.question}</QuestionText>
                                {answer.answers.map((content) => {
                                    return (
                                        <AnswerContent selected={content.select} key={content.id}>
                                            <AnswerText>{content.text}</AnswerText>
                                        </AnswerContent>
                                    );
                                })}
                            </ResultLayout>
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
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(#010614, #171a5f);
`;

const MyAnswerLayoutWrap = styled.div`
    width: 740px;
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

const ResultLayout = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const QuestionNumber = styled.div`
    font-family: Galmuri_Bold;
    font-size: 16px;
    margin-bottom: 6px;
    color: #fff;
`;

const QuestionText = styled.div`
    margin-bottom: 20px;
    font-family: Galmuri_Bold;
    font-size: 16px;
    color: #fff;
`;

const AnswerContent = styled.div<{ selected: boolean }>`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 21px 0;
    border: ${(props) => (props.selected ? "1px solid #fff" : "1px solid #1EB82D")};
    border-radius: 12px;
    margin-bottom: 16px;
`;

const AnswerText = styled.div`
    font-family: Galmuri_Bold;
    font-size: 14px;
    color: #fff;
`;
