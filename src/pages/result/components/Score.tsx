import styled from "styled-components";
import React from "react";

interface ScoreProps {
    userScore: number;
    matchedUserName: string;
}

const ScoreLayout: React.FC<ScoreProps> = ({ userScore, matchedUserName }) => {
    return (
        <ScoreWrap>
            <ScoreTitle>{`나와 ${matchedUserName}님의 가치관은`}</ScoreTitle>
            <Score score={Number(userScore)}>{`${Number(userScore)}% 일치`}</Score>
        </ScoreWrap>
    );
};

export default ScoreLayout;

const ScoreWrap = styled.div`
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
