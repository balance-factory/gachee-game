import styled from "styled-components";
import React, { useState, useEffect } from "react";
import * as VM from "./QuestionViewModel";
import * as Components from "./components";
import { BrowserRouter as Router, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Pause from "assets/icon/pause_icon.svg";

const Question: React.FC = () => {
    const pathname = useLocation().pathname;
    const splitUrl = pathname.split("/");
    const categoryId = splitUrl[2];
    const questionId = splitUrl[4];
    const lastPath = splitUrl[splitUrl.length - 1] === "answer" ? false : true;
    const navigate = useNavigate();
    const [situationAndQuestion, setSituationAndQuestion] = useState<VM.SituationAndQuestion[]>();
    const [situationTotal, setSituationTotal] = useState<number>(0);
    const [situationOffset, setSituationOffset] = useState<number>(0);
    const [userAnswers, setUserAnswers] = useState<VM.Answer[]>([]);
    const answers = window.sessionStorage.getItem("ANSWERS");
    const userId = window.sessionStorage.getItem("ID");

    const fetchSituationAndQuestion = async (categoryId: string) => {
        try {
            const data = await VM.getSituationAndQuestion(categoryId);

            setSituationAndQuestion(data);
            setSituationTotal(data.length);
        } catch (error) {
            console.error("Error fetching matched users:", error);
        }
    };

    const fetchPostUserAnswers = async (answers: VM.Answer[], userId: string) => {
        try {
            const data = await VM.postUserAnswers(answers, userId);

            if (data) {
                navigate(`/match-list`);
                window.sessionStorage.removeItem("ANSWERS");
            }
        } catch (error) {
            console.error("Error fetching matched users:", error);
        }
    };

    const onClickNextSituation = (updateOffset: number, answerId: number) => {
        userAnswers.push({
            question_id: Number(questionId),
            answer_id: answerId,
        });
        setUserAnswers(userAnswers);

        window.sessionStorage.setItem("ANSWERS", JSON.stringify(userAnswers));

        if (situationTotal < updateOffset + 1) {
            if (answers && userId) fetchPostUserAnswers(JSON.parse(answers), userId);
        } else {
            setSituationOffset(updateOffset);
            navigate(
                `/category/${categoryId}/question/${
                    situationAndQuestion && situationAndQuestion[updateOffset].question_id
                }`
            );
        }
    };

    useEffect(() => {
        fetchSituationAndQuestion(categoryId);
    }, []);

    useEffect(() => {
        if (situationAndQuestion && situationAndQuestion.length > 0 && questionId) {
            const indexNumber = situationAndQuestion.findIndex((s) => s.question_id === Number(questionId));

            answers && setUserAnswers(JSON.parse(answers));
            setSituationOffset(indexNumber);
        }
    }, [situationAndQuestion]);

    return (
        <QuestionViewLayout>
            <ContentLayout>
                <Pause />
                {lastPath && situationAndQuestion && (
                    <>
                        <SituationImage src={situationAndQuestion[situationOffset].situation_image} />

                        <QuestionLayout>
                            <QuestionContent>
                                <QuestionText>{`${situationAndQuestion[situationOffset].situation}`}</QuestionText>

                                <div
                                    onClick={() =>
                                        navigate(
                                            `/category/${categoryId}/question/${situationAndQuestion[situationOffset].question_id}/answer`
                                        )
                                    }>
                                    상황 button
                                </div>
                            </QuestionContent>
                        </QuestionLayout>
                    </>
                )}
                <Routes>
                    {/* path에 부모 경로까지 적을 필요 없이 파라미터만 적어줌 (:questionId) */}
                    <Route
                        path="/:id/answer"
                        element={
                            <Components.QuestionAndAnswer
                                categoryId={categoryId}
                                situationAndQuestion={situationAndQuestion}
                                situationOffset={situationOffset}
                                clickGoNextSituation={onClickNextSituation}
                            />
                        }
                    />
                </Routes>
            </ContentLayout>
        </QuestionViewLayout>
    );
};

export default Question;

const QuestionViewLayout = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const ContentLayout = styled.div`
    width: 740px;
    height: 100%;
    background: linear-gradient(180deg, #000513 0%, #171a5f 100%);
    padding: 20px 20px 40px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const SituationImage = styled.img``;

const QuestionLayout = styled.div`
    height: 168px;
    border: 3px solid #bbcbcb;
    background: #00316b;
`;

const QuestionContent = styled.div`
    height: 100%;
    padding: 24px 20px 13px 20px;
    border-bottom: 11px solid #c7dde7;
`;

const QuestionText = styled.div`
    color: #f7ffff;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    font-size: 14px;
    line-height: 160%;
    letter-spacing: -0.07px;
`;
