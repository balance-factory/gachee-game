import styled from "styled-components";
import React, { useState, useEffect } from "react";
import BlueStar from "../../assets/icon/blue-star.svg";
import Return from "../../assets/icon/small-return.svg";

const MatchUserList = [
    {
        userId: "dfsdfsf",
        userName: "김도희",
        matchScore: 100,
    },
    {
        userId: "dfsdfSDFSDsf",
        userName: "황재원",
        matchScore: 100,
    },
    {
        userId: "dfsdSDFCCVXCfsf",
        userName: "최다예",
        matchScore: 70,
    },
    {
        userId: "EWRWER",
        userName: "김도도",
        matchScore: 30,
    },
    {
        userId: "dfsdfsFSDFVXVf",
        userName: "황하루",
        matchScore: 50,
    },
];

const AnswerView: React.FC = () => {
    return (
        <MatchLayout>
            <MatchLayoutWrap>
                <Header>안녕 난 헤더야</Header>
                <InnerTitleLayout>
                    <TitleText>테스트가 끝났습니다.</TitleText>
                    <ResultTitleText>100% 일치</ResultTitleText>
                </InnerTitleLayout>
                <InnnerAnswerViewLayout>
                    <AnswerViewWrap>
                        <MatchUserCount>
                            {`응답한 사람`}
                            <Count>{`${5}명`}</Count>
                        </MatchUserCount>
                        <MatchUserListLayout>
                            {MatchUserList.map((user) => {
                                return (
                                    <MatchUserLayout key={user.userId}>
                                        <UserImg />
                                        <UserName>{user.userName}</UserName>
                                        <UserScore score={user.matchScore}>
                                            {user.matchScore}% <ScoreText>일치</ScoreText>
                                        </UserScore>
                                    </MatchUserLayout>
                                );
                            })}
                        </MatchUserListLayout>
                    </AnswerViewWrap>
                </InnnerAnswerViewLayout>
            </MatchLayoutWrap>
        </MatchLayout>
    );
};

export default AnswerView;

const MatchLayout = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(#010614, #171a5f);
`;

const MatchLayoutWrap = styled.div`
    width: 740px;
    height: 100vh;
`;

const Header = styled.div`
    width: 100%;
    height: 58px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    color: #fff;
    border-bottom: 1px solid #fff;
`;

const InnerTitleLayout = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding: 30px;
    margin-bottom: 40px;
    border: 3px solid #bbcbcb;
`;

const ResultTitleText = styled.div`
    font-family: Galmuri_Bold;
    font-size: 24px;
    margin-top: 6px;
`;

const BlueStarIcon = styled.div`
    position: absolute;
`;

const TitleText = styled.div`
    font-size: 16px;
    color: #fff;
`;

const SubTitle = styled.div`
    margin-top: 20px;
    color: #fff;
    text-align: center;
`;

const LinkShareButton = styled.div`
    margin-top: 48px;
    width: 244px;
    height: 48px;
    background-color: #fff;
    border-radius: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const MyAnswerButton = styled.div`
    margin-top: 20px;
    width: 244px;
    height: 48px;
    background-color: transparent;
    border: 1px solid #fff;
    border-radius: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ButtonText = styled.div`
    color: #000;
    font-weight: 100;
    font-size: 16px;
`;

const RetryTest = styled.div`
    margin-top: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const RetryTestText = styled.div`
    color: #fff;
    font-size: 14px;
    margin-left: 10px;
`;

const InnnerAnswerViewLayout = styled.div`
    margin-top: 48px;
    width: 100%;
    padding: 0 20px;
`;

const AnswerViewWrap = styled.div`
    border-top: 1px dashed #fff;
    width: 100%;
    height: 500px;
    padding-top: 48px;
`;

const MatchUserCount = styled.div`
    color: #fff;
    font-size: 16px;
`;

const Count = styled.span`
    font-family: Galmuri_Bold;
    font-size: 16px;
    margin-left: 8px;
    letter-spacing: 1.2;
`;

const MatchUserListLayout = styled.div`
    margin-top: 10px;
`;

const MatchUserLayout = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 20px;
    width: 100%;
    height: 93px;
    border: 1px solid #fff;
    border-radius: 12px;
    margin: 20px 0;
`;

const UserImg = styled.div`
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background-color: #eee;
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
