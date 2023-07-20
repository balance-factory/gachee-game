import React from "react";
import { useNavigate } from "react-router-dom";
import * as VM from "../QuestionViewModel";

interface QuestionAndAnswerProps {
    situationOffset: number;
    questionOffset: number;
    situationTotal: number;
    questionTotal: number;
    situationAndQuestions?: VM.SituationAndQuestions[];
    updataQuestionOffset: (questionOffset: number) => void;
    updataSituationOffset: (situationOffset: number) => void;
}

const QuestionAndAnswer: React.FC<QuestionAndAnswerProps> = (props) => {
    const navigate = useNavigate();

    const goNextQuestion = () => {
        if (props.questionTotal <= props.questionOffset + 1) {
            if (props.situationTotal <= props.situationOffset + 1) {
                navigate(`/result`);
            } else {
                props.updataSituationOffset(props.situationOffset + 1);
                props.updataQuestionOffset(0);

                navigate(
                    `/question/${
                        props.situationAndQuestions &&
                        props.situationAndQuestions[props.situationOffset].questionAndAnswers[0].question.id
                    }`
                );
            }
        } else {
            props.updataQuestionOffset(props.questionOffset + 1);

            navigate(
                `/question/${
                    props.situationAndQuestions &&
                    props.situationAndQuestions[props.situationOffset].questionAndAnswers[props.questionOffset].question
                        .id
                }`
            );
        }
    };

    return props.situationAndQuestions ? (
        <>
            {props.situationAndQuestions[props.situationOffset].questionAndAnswers[props.questionOffset].question.title}

            {props.situationAndQuestions[props.situationOffset].questionAndAnswers[props.questionOffset].answers.map(
                (a, i) => (
                    <div key={i} onClick={goNextQuestion}>
                        {a.text}
                    </div>
                )
            )}
        </>
    ) : (
        <></>
    );
};
export default QuestionAndAnswer;
