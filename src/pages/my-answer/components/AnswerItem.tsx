import styled from "styled-components";
import React, { useState, useEffect } from "react";
import * as Interface from "../../../interface";

interface AnswerItemProps {
    result: Interface.MySelectResult;
    index: number;
}

const AnswerItem: React.FC<AnswerItemProps> = ({ result, index }) => {
    return (
        <ResultLayout>
            <QuestionNumber>{`Q${index + 1}`}</QuestionNumber>
            <QuestionText>{result.title}</QuestionText>
            {result.answers.map((content) => {
                return (
                    <AnswerContent
                        selected={result.selected_answer.answerId === content.answer_id}
                        key={content.answer_content}>
                        <AnswerText>{content.answer_content}</AnswerText>
                    </AnswerContent>
                );
            })}
        </ResultLayout>
    );
};

export default AnswerItem;

const ResultLayout = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: 48px;
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
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 21px 0;
    border: ${(props) => (props.selected ? "1px solid #1EB82D" : "1px solid #fff")};
    border-radius: 12px;
    margin-bottom: 16px;
`;

const AnswerText = styled.div`
    font-family: Galmuri_Bold;
    font-size: 14px;
    color: #fff;
`;

const UserA = styled.div`
    z-index: 1;
    width: 32px;
    height: 32px;
    position: absolute;
    border-radius: 50%;
    background-color: #fff;
    text-align: center;
    line-height: 32px;
    top: -20px;
    right: 0px;
    border: 1px solid #1eb82d;
`;

const UserB = styled.div<{ aUserSelected: boolean; bUserSelected: boolean }>`
    z-index: 1;
    width: 32px;
    height: 32px;
    position: absolute;
    background-color: #fff;
    border-radius: 50%;
    text-align: center;
    line-height: 32px;
    top: -20px;
    right: ${(props) => (props.aUserSelected ? "25px" : "0")};
    border: ${(props) => (props.bUserSelected ? "1px solid #1EB82D" : "1px solid #F56571")};
`;
