import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as Interface from "../../interface";
import * as VM from "./MatchListModel";
import styled from "styled-components";
import BlueStar from "../../assets/icon/blue-star.svg";
import Return from "../../assets/icon/small-return.svg";
import Home from "../../assets/icon/home_icon.svg";
import Empty from "../../assets/icon/send-clock.svg";

const MatchList: React.FC = () => {
    const navigate = useNavigate();
    const { categoryId } = useParams();
    const [matchUsers, setMatchUsers] = useState<Interface.MatchUser[]>([]);
    const userAId = sessionStorage.getItem("my-user-id")!;
    sessionStorage.setItem("categoryId", `${categoryId}`);

    useEffect(() => {
        //컴포넌트가 마운트되었을 때 호출
        const fetchMatchedUsers = async () => {
            try {
                const users = await VM.getMatchUsers(userAId, Number(categoryId));
                setMatchUsers(users);
            } catch (error) {
                console.error("Error fetching matched users:", error);
            }
        };

        fetchMatchedUsers();
    }, []);

    const handleClickMyAnswer = () => {
        navigate(`/my-answer`);
    };

    const handleClickHome = () => {
        navigate(`/`);
    };

    const handleClickRetryTest = () => {
        navigate(`/category`);
    };

    const handleClickMatchResult = (user: Interface.MatchUser) => {
        sessionStorage.setItem("match-user-info", JSON.stringify({ name: user.name, userScore: user.match_score }));
        navigate(`/result/${user.gachee_id}`);
    };

    return (
        <MatchLayout>
            <MatchLayoutWrap>
                <Header>
                    <Home onClick={handleClickHome} />
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
                    <RetryTest onClick={handleClickRetryTest}>
                        <Return />
                        <RetryTestText style={{ color: "#fff" }}>테스트 다시하기</RetryTestText>
                    </RetryTest>
                </InnerTitleLayout>
                <InnnerMatchListLayout>
                    <MatchListWrap>
                        <MatchUserCount>
                            {`응답한 사람`}
                            <Count>{`${matchUsers.length ?? 0}명`}</Count>
                        </MatchUserCount>
                        <MatchUserListLayout>
                            {matchUsers.length > 0 ? (
                                matchUsers.map((user) => {
                                    return (
                                        <MatchUserLayout
                                            onClick={() => handleClickMatchResult(user)}
                                            key={`${user.gachee_id}`}>
                                            {user.profile_image ? (
                                                <UserImg src={user.profile_image} />
                                            ) : (
                                                <UserEmptyImg />
                                            )}
                                            <UserName>{user.name}</UserName>
                                            <UserScore score={user.match_score}>
                                                {user.match_score}% <ScoreText>일치</ScoreText>
                                            </UserScore>
                                        </MatchUserLayout>
                                    );
                                })
                            ) : (
                                <MatchUserEmptyLayout>
                                    <div>
                                        <Empty />
                                    </div>
                                    <EmptyText>{`${"아직 매칭을\n기다리고 있어요"}`}</EmptyText>
                                </MatchUserEmptyLayout>
                            )}
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
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(#010614, #171a5f);
`;

const MatchLayoutWrap = styled.div`
    width: 740px;
    height: 100%;
`;

const Header = styled.div`
    width: 100%;
    height: 58px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    color: #fff;
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
    cursor: pointer;
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

const MatchUserEmptyLayout = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: calc(100vh - 640px);
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

const EmptyText = styled.div`
    margin-top: 16px;
    font-size: 20px;
    color: #7b7da1;
    white-space: pre;
    text-align: center;
`;
