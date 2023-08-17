import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as VM from "./MatchListModel";
import styled from "styled-components";
import BlueStar from "../../assets/icon/blue-star.svg";
import Return from "../../assets/icon/small-return.svg";
import Home from "../../assets/icon/home_icon.svg";

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

const MatchList: React.FC = () => {
    const navigate = useNavigate();
    const [matchUsers, setMatchUsers] = useState<VM.MatchUser[]>([]);
    const userAId = localStorage.getItem("userId");

    useEffect(() => {
        // 컴포넌트가 마운트되었을 때 호출
        const fetchMatchedUsers = async () => {
            try {
                const users = await VM.getMatchUsers();
                setMatchUsers(users);
            } catch (error) {
                console.error("Error fetching matched users:", error);
            }
        };

        fetchMatchedUsers();
    }, []);

    console.log("matchUsers", matchUsers);

    const handleClickMyAnswer = () => {
        navigate(`/my-answer`);
    };

    return (
        <MatchLayout>
            <MatchLayoutWrap>
                <Header>
                    <Home />
                </Header>
                <InnerTitleLayout>
                    <Title>
                        <BlueStarIcon style={{ top: "-15px", left: "-20px" }}>
                            <BlueStar />
                        </BlueStarIcon>
                        <TitleText>테스트가 끝났습니다.</TitleText>
                        <BlueStarIcon style={{ bottom: "-15px", right: "-20px" }}>
                            <BlueStar />
                        </BlueStarIcon>
                    </Title>
                    <SubTitle>
                        가치관을 확인할 상대에게
                        <br />
                        링크를 공유해주세요.
                    </SubTitle>
                    <LinkShareButton onClick={() => console.log("data")}>
                        <ButtonText style={{ fontFamily: "Galmuri_Bold" }}>링크 공유하기</ButtonText>
                    </LinkShareButton>
                    <MyAnswerButton onClick={handleClickMyAnswer}>
                        <ButtonText style={{ color: "#fff" }}>내 답안 보기</ButtonText>
                    </MyAnswerButton>
                    <RetryTest>
                        <Return />
                        <RetryTestText style={{ color: "#fff" }}>테스트 다시하기</RetryTestText>
                    </RetryTest>
                </InnerTitleLayout>
                <InnnerMatchListLayout>
                    <MatchListWrap>
                        <MatchUserCount>
                            {`응답한 사람`}
                            <Count>{`${matchUsers.length}명`}</Count>
                        </MatchUserCount>
                        <MatchUserListLayout>
                            {matchUsers.map((user) => {
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
                    </MatchListWrap>
                </InnnerMatchListLayout>
            </MatchLayoutWrap>
        </MatchLayout>
    );
};

export default MatchList;

const MatchLayout = styled.div`
    width: 100%;
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
    padding: 64px 60px 0;
`;

const Title = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 200px;
    margin: 0 auto;
`;

const BlueStarIcon = styled.div`
    position: absolute;
`;

const TitleText = styled.div`
    font-family: Galmuri_Bold;
    font-weight: 700;
    font-size: 20px;
    color: #ff70d0;
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

const InnnerMatchListLayout = styled.div`
    margin-top: 48px;
    width: 100%;
    padding: 0 20px;
`;

const MatchListWrap = styled.div`
    border-top: 1px dashed #fff;
    width: 100%;
    padding-top: 48px;
    padding-bottom: 48px;
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
