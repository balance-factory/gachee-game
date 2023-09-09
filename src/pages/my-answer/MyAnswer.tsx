import styled from "styled-components";
import React, { useState, useEffect } from "react";
import BackArrow from "../../assets/icon/back_arrow_icon.svg";
import * as Interface from "../../interface";
import * as Component from "./components";
import { useNavigate } from "react-router-dom";

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
    const navigate = useNavigate();
    return (
        <MyAnswerLayout>
            <MyAnswerLayoutWrap>
                <Header>
                    <BackArrow onClick={() => navigate("/")} />
                </Header>
                <InnnerMyAnswerViewLayout>
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
