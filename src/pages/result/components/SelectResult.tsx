import styled from "styled-components";
import React, { useState, useEffect } from "react";
import * as Interface from "../../../interface";

interface ResultProps {
    result: Interface.MatchUserSelectResult;
    index: number;
    matchUserId?: string;
    matchUserName: string;
}

const SelectResult: React.FC<ResultProps> = ({ result, index, matchUserId, matchUserName }) => {
    return (
        <ResultLayout>
            <QuestionNumber>{`Q${index + 1}`}</QuestionNumber>
            <QuestionText>{result.title.replace("\n", " ")}</QuestionText>
            {result.answers.map((content) => {
                return (
                    <AnswerContent
                        selected={result.selectedMyAnswer.answerId === content.answerId}
                        bUserSelected={
                            matchUserId ? result.selectedMatchedUserAnswer.answerId === content.answerId : false
                        }
                        key={content.answerId}>
                        <AnswerText>{content.answerContent}</AnswerText>
                        {matchUserId && (
                            <>
                                {result.selectedMyAnswer.answerId === content.answerId && <UserA>ME</UserA>}
                                {result.selectedMatchedUserAnswer.answerId === content.answerId && (
                                    <UserB
                                        aUserSelected={result.selectedMyAnswer.answerId === content.answerId}
                                        bUserSelected={result.selectedMatchedUserAnswer.answerId === content.answerId}>
                                        {`${matchUserName.slice(0, 1)}`}
                                    </UserB>
                                )}
                            </>
                        )}
                    </AnswerContent>
                );
            })}
        </ResultLayout>
    );
};

export default SelectResult;

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

const AnswerContent = styled.div<{ selected: boolean; bUserSelected?: boolean }>`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 21px 0;
    border: ${(props) =>
        props.selected ? "1px solid #1EB82D" : props.bUserSelected ? "1px solid #F56571" : "1px solid #fff"};
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
    text-align: center;
    line-height: 32px;
    top: -20px;
    right: 0px;
    background-color: #1eb82d;
    border: 1px solid #fff;
    font-size: 12px;
    font-family: Galmuri_Bold;
    color: #fff;
`;

const UserB = styled.div<{ aUserSelected: boolean; bUserSelected: boolean }>`
    z-index: 1;
    width: 32px;
    height: 32px;
    position: absolute;
    background-color: ${(props) => (props.aUserSelected ? "#1EB82D" : "#F56571")};
    border-radius: 50%;
    text-align: center;
    line-height: 32px;
    top: -20px;
    color: #fff;
    border: 1px solid #fff;
    font-size: 12px;
    font-family: Galmuri_Bold;
    right: ${(props) => (props.aUserSelected ? "25px" : "0")};
`;
