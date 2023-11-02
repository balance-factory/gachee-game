import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import * as Interface from "../../interface";
// import * as VM from "./";
import styled from "styled-components";
import BlueStar from "../../assets/icon/blue-star.svg";
import Return from "../../assets/icon/small-return.svg";
import Home from "../../assets/icon/home_icon.svg";
import * as Util from "../../utils";
import * as Components from "../result/components";

const MatchedResult: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { categoryId } = useParams();
    const [matchUsers, setMatchUsers] = useState<Interface.MatchUser[]>([]);
    const [resultList, setResultList] = useState<Interface.MatchUserSelectResult[]>([]);
    const userAId = sessionStorage.getItem("my-user-id")!;
    sessionStorage.setItem("categoryId", `${categoryId}`);

    useEffect(() => {
        //컴포넌트가 마운트되었을 때 호출
        const fetchMatchedUsers = async () => {
            try {
                // const users = await VM.getMatchUsers(userAId, Number(categoryId));
                // setMatchUsers(users);
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

    const handleClickShare = () => {
        console.log(location);
        Util.addClipboard("aa");
    };

    return (
        <MatchedUserLayout>
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
                    <Components.Score userScore={80} />
                    <SubTitle>
                        가치관을 확인한 상대에게
                        <br />
                        결과를 공유해주세요.
                    </SubTitle>
                    <ResultShareButton onClick={handleClickShare}>
                        <ButtonText>결과 공유하기</ButtonText>
                    </ResultShareButton>

                    <RetryTest onClick={handleClickRetryTest}>
                        <Return />
                        <RetryTestText style={{ color: "#fff" }}>테스트 다시하기</RetryTestText>
                    </RetryTest>
                </InnerTitleLayout>
                <DividerContent>
                    <Divider />
                    <ContentTitle>전체 답안 보기</ContentTitle>
                    <Divider />
                </DividerContent>
                {resultList.map((result, index) => {
                    return (
                        <Components.SelectResult
                            result={result}
                            index={index}
                            matchUserId={"1"}
                            matchUserName={"김도희"}
                            key={`result_${result.question_id}`}
                        />
                    );
                })}
            </MatchLayoutWrap>
        </MatchedUserLayout>
    );
};

export default MatchedResult;

const MatchedUserLayout = styled.div`
    width: 100%;
    height: auto;
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
    margin-bottom: 40px;
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
    margin-top: 32px;
    color: #fff;
    text-align: center;
    font-weight: 400;
`;

const ResultShareButton = styled.div`
    margin-top: 20px;
    width: 355px;
    height: 46px;
    border-radius: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #ff70d0;
    color: #ff70d0;
`;

const ButtonText = styled.div`
    color: #ff70d0;
    font-size: 16px;
`;

const RetryTest = styled.div`
    margin-top: 20px;
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

const DividerContent = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: 3px;
    margin-top: 40px;
`;

const Divider = styled.div`
    width: 40%;
    height: 1px;
    border: dashed 1px #fff;
`;

const ContentTitle = styled.div`
    color: #fff;
    margin: 0 10px;
`;
