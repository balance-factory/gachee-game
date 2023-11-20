import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import * as Interface from "../../../interface";
import React from "react";

interface MatchedUserItemProps {
    matchedUserInfo: Interface.MatchedUser;
}

const MatchedUserItem: React.FC<MatchedUserItemProps> = ({ matchedUserInfo }) => {
    const navigate = useNavigate();
    const handleClickMatchResult = (user: Interface.MatchedUser) => {
        sessionStorage.setItem("match-user-info", JSON.stringify({ name: user.name, userScore: user.matchScore }));
        navigate(`/result/${user.memberId}`);
    };
    return (
        <MatchedUserItemLayout
            onClick={() => handleClickMatchResult(matchedUserInfo)}
            key={`${matchedUserInfo.memberId}`}>
            {matchedUserInfo.profileImage ? <UserImg src={matchedUserInfo.profileImage} /> : <UserEmptyImg />}
            <UserName>{matchedUserInfo.name}</UserName>
            <UserScore score={matchedUserInfo.matchScore}>
                {matchedUserInfo.matchScore}% <ScoreText>일치</ScoreText>
            </UserScore>
        </MatchedUserItemLayout>
    );
};

export default MatchedUserItem;

const MatchedUserItemLayout = styled.div`
    width: 100%;
    height: 130px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border: 3px solid #bbcbcb;
`;

const UserImg = styled.img`
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background-color: #eee;
`;

const UserEmptyImg = styled.div`
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background-color: #f56571;
    border: 1px solid #fff;
`;

const UserName = styled.div`
    font-size: 16px;
    color: #fff;
    margin-left: 30px;
`;

const UserScore = styled.div<{ score: number }>`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-family: Galmuri_Bold;
    font-size: 20px;
    color: ${(props) => (props.score <= 39 ? "#E5505D" : props.score > 39 && props.score < 80 ? "#F2AA18" : "#1eb82d")};
    margin-left: auto;
`;

const ScoreText = styled.span`
    font-size: 16px;
    color: inherit;
    margin-left: 4px;
`;
