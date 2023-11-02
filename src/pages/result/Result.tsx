import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BackArrow from "../../assets/icon/back_arrow_icon.svg";
import * as Interface from "../../interface";
import * as Component from "./components";
import * as VM from "./ResultViewModel";
import * as Components from "pages/components";

const ResultView: React.FC = () => {
    const myId = sessionStorage.getItem("my-user-id");
    const categoryId = sessionStorage.getItem("categoryId");
    const { matchUserId } = useParams();
    const navigate = useNavigate();

    const matchUserInfo = sessionStorage.getItem("match-user-info");
    const [resultList, setResultList] = useState<Interface.MatchUserSelectResult[]>([]);
    const matchUser: { name: string; userScore: number } = JSON.parse(matchUserInfo!);
    const [openError, setOpenError] = useState<boolean>(false);

    useEffect(() => {
        // 컴포넌트가 마운트되었을 때 호출
        const fetchUserResult = async () => {
            try {
                const users = await VM.getSelectedUserAnswers(Number(categoryId), matchUserId!);
                setResultList(users);
            } catch (error) {
                setOpenError(true);
                console.error("Error fetching matched users:", error);
            }
        };

        fetchUserResult();
    }, []);

    const clickBack = () => {
        navigate(`/match-list/${categoryId}`);
    };

    return (
        <MyAnswerLayout>
            <MyAnswerLayoutWrap>
                <Header>
                    <IconWrap onClick={clickBack}>
                        <BackArrow />
                    </IconWrap>
                </Header>
                <InnnerMyAnswerViewLayout>
                    {matchUserId && (
                        <>
                            <Component.Score userScore={80} />
                            <DividerContent>
                                <Divider />
                                <ContentTitle>전체 답안 보기</ContentTitle>
                                <Divider />
                            </DividerContent>
                        </>
                    )}
                    {resultList.map((result, index) => {
                        return (
                            <Component.SelectResult
                                result={result}
                                index={index}
                                matchUserId={matchUserId}
                                matchUserName={matchUser.name}
                                key={`result_${result.questionId}`}
                            />
                        );
                    })}
                </InnnerMyAnswerViewLayout>
            </MyAnswerLayoutWrap>
            {openError && <Components.ErrorPopup cancelButton={() => setOpenError(false)} />}
        </MyAnswerLayout>
    );
};

export default ResultView;

const MyAnswerLayout = styled.div`
    width: 100%;
    height: 100vh;
    overflow: scroll;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(#010614, #171a5f);
`;

const MyAnswerLayoutWrap = styled.div`
    width: 740px;
    height: 100%;
    padding-bottom: 100px;
`;

const Header = styled.div`
    width: 100%;
    height: 58px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    color: #fff;
    margin-bottom: 62px;
`;

const InnnerMyAnswerViewLayout = styled.div`
    width: 100%;
    padding: 0 20px 80px;
`;

const IconWrap = styled.div``;

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
