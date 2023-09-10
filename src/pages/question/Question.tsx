import styled from "styled-components";
import React, { useState, useEffect } from "react";
import * as VM from "./QuestionViewModel";
import * as Components from "./components";
import { BrowserRouter as Router, Route, Routes, useLocation, useNavigate } from "react-router-dom";

const Question: React.FC = () => {
  const pathname = useLocation().pathname;
  const navigate = useNavigate();
  const [situationAndQuestion, setSituationAndQuestion] =
    useState<VM.SituationAndQuestion[]>();
  const [situationTotal, setSituationTotal] = useState<number>(0);
  const [situationOffset, setSituationOffset] = useState<number>(0);
  const categoryId = pathname.split("/")[2];

  const fetchSituationAndQuestion = async (categoryId: string) => {
    try {
      const data = await VM.getSituationAndQuestion(categoryId);

      setSituationAndQuestion(data);
      setSituationTotal(data.length);
    } catch (error) {
      console.error("Error fetching matched users:", error);
    }
  };

  const onClickNextSituation = (updateOffset: number) => {
    if (situationTotal < updateOffset + 1) {
      navigate(`/result`);
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

  return (
    <>
      <Header>
        {situationAndQuestion && (
          <>
            <Title>
              situation : {situationAndQuestion[situationOffset].situation}
            </Title>

            <div
              onClick={() =>
                navigate(
                  `/category/${categoryId}/question/${situationAndQuestion[situationOffset].question_id}`
                )
              }
            >
              상황 button
            </div>
          </>
        )}
        <Routes>
          {/* path에 부모 경로까지 적을 필요 없이 파라미터만 적어줌 (:questionId) */}
          <Route
            path=":questionId"
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
      </Header>
    </>
  );
};

export default Question;

const Header = styled.div``;

const Title = styled.div`
    font-size: 30px;
    font-family: Galmuri_Bold;
`;
