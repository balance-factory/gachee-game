import styled from "styled-components";
import React, { useState, useEffect } from "react";
import Home from "../../assets/icon/home_icon.svg";

const MyAnswerView: React.FC = () => {
    return (
        <MatchLayout>
            <MatchLayoutWrap>
                <Header>
                    <Home />
                </Header>
                <InnnerMyAnswerViewLayout>
                    <MyAnswerViewWrap></MyAnswerViewWrap>
                </InnnerMyAnswerViewLayout>
            </MatchLayoutWrap>
        </MatchLayout>
    );
};

export default MyAnswerView;

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

const InnnerMyAnswerViewLayout = styled.div`
    margin-top: 48px;
    width: 100%;
    padding: 0 20px;
`;

const MyAnswerViewWrap = styled.div`
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
