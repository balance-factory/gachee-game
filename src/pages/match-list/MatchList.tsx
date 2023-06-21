import styled from "styled-components";
import React, { useState, useEffect } from "react";
import BlueStar from "../../assets/icon/blue-star.svg";

const MatchList: React.FC = () => {
    return (
        <MatchListLayout>
            <MatchListWrap>
                <Header></Header>
                <InnerLayout>
                    <Title>
                        <BlueStarIcon>
                            <BlueStar />
                        </BlueStarIcon>

                        <TitleText>테스트가 끝났습니다.</TitleText>
                        <BlueStarIcon>
                            <BlueStar />
                        </BlueStarIcon>
                    </Title>
                </InnerLayout>
            </MatchListWrap>
        </MatchListLayout>
    );
};

export default MatchList;

const MatchListLayout = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(#010614, #171a5f);
`;

const MatchListWrap = styled.div`
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
`;

const InnerLayout = styled.div`
    width: 100%;
    height: calc(100vh - 58px);
    margin-top: 64px;
    margin: 0 auto;
    padding: 0 60px;
`;

const Title = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    width: 100%;
`;

const BlueStarIcon = styled.div`
    position: absolute;
    top: 1px;
`;

const TitleText = styled.div`
    font-family: Galmuri_Bold;
    font-weight: 700;
    font-size: 20px;
    color: #ff70d0;
`;
