import styled from "styled-components";
import React, { useState, useEffect } from "react";
import * as VM from "./QuestionViewModel";
import * as Components from "./components";

import { BrowserRouter as Router, Route, Routes, useLocation, useNavigate } from "react-router-dom";

const Question = () => {
    const location = useLocation().search as {};
    const navigate = useNavigate();
    const [situationAndQuestions, setSituationAndQuestions] = useState<VM.SituationAndQuestions[]>();
    //데이터 페이지네이션 형식으로 구현해서 순차적으로 보여주기

    useEffect(() => {
        const data = VM.getSituationAndQuestions("categoryId1");
        setSituationAndQuestions(data);
    }, []);

    return (
        <>
            <Header>
                Situation 텍스트 노출
                {situationAndQuestions && (
                    <>
                        <> situation : {situationAndQuestions[0].text}</>

                        <div
                            onClick={() =>
                                navigate(`/question/${situationAndQuestions[0].questionAndAnswers[0].question.id}`)
                            }
                        >
                            button
                        </div>
                    </>
                )}
                <Routes>
                    <Route path=":questionId" element={<Components.QuestionAndAnswer />} />
                </Routes>
            </Header>
        </>
    );
};

export default Question;

const Header = styled.h1`
    color: red;
    font-family: Galmuri;
`;
