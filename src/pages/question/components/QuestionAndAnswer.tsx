import React from "react";
import * as VM from "../QuestionViewModel";

interface QuestionAndAnswerProps {
  categoryId: string;
  situationOffset: number;
  situationAndQuestion?: VM.SituationAndQuestion[];
  clickGoNextSituation: (updateOffset: number) => void;
}

const QuestionAndAnswer: React.FC<QuestionAndAnswerProps> = (props) => {
  return props.situationAndQuestion ? (
    <>
      {props.situationAndQuestion[props.situationOffset].title}

      {props.situationAndQuestion[props.situationOffset].answers.map((a, i) => (
        <div
          key={i}
          onClick={() => props.clickGoNextSituation(props.situationOffset + 1)}
        >
          {a.answer_content}
        </div>
      ))}
    </>
  ) : (
    <></>
  );
};
export default QuestionAndAnswer;
