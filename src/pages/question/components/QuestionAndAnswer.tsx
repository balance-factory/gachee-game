import React, { useState } from "react";
import * as VM from "../QuestionViewModel";
import styled from "styled-components";
import * as Images from "assets/image";

interface AnswerState {
  index: number;
  answerId: number;
}

interface QuestionAndAnswerProps {
  categoryId: string;
  situationOffset: number;
  situationAndQuestion?: VM.SituationAndQuestion[];
  clickGoNextSituation: (updateOffset: number, answerId: number) => void;
}

const QuestionAndAnswer: React.FC<QuestionAndAnswerProps> = (props) => {
  const [isAnswer, setIsAnswer] = useState<AnswerState>({
    index: 0,
    answerId: 0,
  });

  return props.situationAndQuestion ? (
    <>
      <div>
        <QuestionAndAnswerTitle>
          {props.situationAndQuestion[props.situationOffset].title}
        </QuestionAndAnswerTitle>
        <QuestionAndAnswerSubTitle>
          {props.situationAndQuestion[props.situationOffset].sub_title}
        </QuestionAndAnswerSubTitle>
      </div>
      <QuestionImage
        src={props.situationAndQuestion[props.situationOffset].title_image}
      />
      <QuestionAndAnswerLayout>
        <QuestionAndAnswerContent>
          {props.situationAndQuestion[props.situationOffset].answers.map(
            (a, i) => (
              <AnswerContent
                key={i}
                onClick={() =>
                  setIsAnswer({
                    index: i,
                    answerId: a.answer_id,
                  })
                }
              >
                {i === isAnswer.index && (
                  <ClickArrowImage src={Images.ClickArrow} />
                )}

                {a.answer_content}
              </AnswerContent>
            )
          )}

          <NextBtnLayout
            onClick={() =>
              props.clickGoNextSituation(
                props.situationOffset + 1,
                isAnswer.answerId
              )
            }
          >
            다음
            <EnterImage src={Images.Enter} />
          </NextBtnLayout>
        </QuestionAndAnswerContent>
      </QuestionAndAnswerLayout>
    </>
  ) : (
    <>"loding"</>
  );
};
export default QuestionAndAnswer;

const QuestionImage = styled.img``;

const QuestionAndAnswerLayout = styled.div`
  height: 168px;
  border: 3px solid #bbcbcb;
  background: #00316b;
`;

const QuestionAndAnswerContent = styled.div`
  height: 100%;
  padding: 24px 20px 13px 20px;
  border-bottom: 11px solid #c7dde7;
`;

const QuestionAndAnswerTitle = styled.div`
  color: #fff;
  text-align: center;
  font-size: 24px;
  font-weight: 700;
`;

const QuestionAndAnswerSubTitle = styled.div`
  color: #fff;
  text-align: center;
  font-size: 14px;
  font-weight: 400;
  margin-top: 8px;
`;

const AnswerContent = styled.div`
  color: #fff;
  font-size: 18px;
  display: flex;
  align-items: center;

  &:first-child {
    margin-bottom: 16px;
  }

  &:nth-last-child(2) {
    margin-bottom: 32px;
  }
`;

const ClickArrowImage = styled.img`
  width: 10px;
  height: 15px;
  margin-right: 18px;
`;

const NextBtnLayout = styled.div`
  color: #1eb82d;
  font-size: 14px;
  font-weight: 700;
  text-align: end;
`;

const EnterImage = styled.img`
  width: 18px;
  height: 13.5px;
  margin-left: 8px;
`;
