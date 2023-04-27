import styled from "styled-components";
import React, { useState, useEffect } from "react";
import * as VM from "./QuestionViewModel";
import * as Components from "./components";
import { BrowserRouter as Router, Route, Routes, useLocation, useNavigate } from "react-router-dom";

const Question = () => {
    const location = useLocation().search as {};
    const navigate = useNavigate();
    const [situationAndQuestions, setSituationAndQuestions] = useState<VM.SituationAndQuestions[]>();
    const [situationTotal, setSituationTotal] = useState<number>(0);
    const [situationOffset, setSituationOffset] = useState<number>(0);
    const [questionTotal, setQuestionTotal] = useState<number>(0);
    const [questionOffset, setQuestionOffset] = useState<number>(0);

    //데이터 페이지네이션 형식으로 구현해서 순차적으로 보여주기

    useEffect(() => {
        const data = VM.getSituationAndQuestions("categoryId1");
        setSituationAndQuestions(data);
    }, []);

    useEffect(() => {
        situationAndQuestions && setSituationTotal(situationAndQuestions.length);
        situationAndQuestions && setQuestionTotal(situationAndQuestions[situationOffset].questionAndAnswers.length);
    }, [situationAndQuestions]);

    return (
        <>
            <Header>
                {situationAndQuestions && (
                    <>
                        <> situation : {situationAndQuestions[situationOffset].text}</>

                        <div
                            onClick={() =>
                                navigate(
                                    `/question/${situationAndQuestions[situationOffset].questionAndAnswers[situationOffset].question.id}`
                                )
                            }
                        >
                            상황 button
                        </div>
                    </>
                )}
                <Routes>
                    <Route
                        path=":questionId"
                        element={
                            <Components.QuestionAndAnswer
                                situationAndQuestions={situationAndQuestions}
                                situationOffset={situationOffset}
                                questionOffset={questionOffset}
                                situationTotal={situationTotal}
                                questionTotal={questionTotal}
                                updataQuestionOffset={setQuestionOffset}
                                updataSituationOffset={setSituationOffset}
                            />
                        }
                    />
                </Routes>
            </Header>
        </>
    );
};

export default Question;

const Header = styled.div`
    color: red;
    font-family: Galmuri;
`;
