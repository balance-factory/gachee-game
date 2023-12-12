import styled from "styled-components";
import React, { useState, useEffect } from "react";
import * as VM from "./QuestionViewModel";
import * as QuestionComponents from "./components";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Pause from "assets/icon/pause_icon.svg";
import ReplayIcon from "assets/icon/re_play_Icon.svg";
import StopIcon from "assets/icon/stop.svg";
import PlayIcon from "assets/icon/play.svg";
import * as Images from "assets/image";
import * as Components from "pages/components/index";
import * as Interface from "interface";

const Question: React.FC = () => {
  const pathname = useLocation().pathname;
  const navigate = useNavigate();
  const splitUrl = pathname.split("/");
  const categoryId = splitUrl[2];
  const questionId = splitUrl[4];
  const answers = window.sessionStorage.getItem("answers");
  const myUserId = window.sessionStorage.getItem("my-user-id");
  const matchUserId = window.sessionStorage.getItem("match-user-id");

  const lastPath = splitUrl[splitUrl.length - 1] === "answer" ? false : true;
  const [openError, setOpenError] = useState<boolean>(false);
  const [isPause, setIsPause] = useState<boolean>(false);
  const [situationAndQuestion, setSituationAndQuestion] =
    useState<Interface.Question[]>();
  const [situationTotal, setSituationTotal] = useState<number>(0);
  const [situationOffset, setSituationOffset] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Interface.Answer[]>([]);

  const fetchSituationAndQuestion = (categoryId: string) => {
    VM.getCategories(Number(categoryId))
      .then((res) => {
        setSituationAndQuestion(res);
        setSituationTotal(res.length);
      })
      .catch((err) => {
        setOpenError(true);
      });
  };

  const fetchPostUserAnswers = async (userId: string, categoryId: number) => {
    const answers = sessionStorage.getItem("answers");
    if (answers) {
      VM.postUserAnswers(JSON.parse(answers), categoryId, Number(matchUserId))
        .then((res) => {
          if (userId && matchUserId) {
            navigate(`/match-list/${categoryId}`);
          } else {
            navigate(`/match-list/${categoryId}`);
            window.sessionStorage.removeItem("answers");
          }
        })
        .catch((err) => {
          setOpenError(true);
        });
    }
  };

  const onClickNextSituation = (updateOffset: number, answerId: number) => {
    userAnswers.push({
      answerId: answerId,
      comment: "",
    });
    setUserAnswers(userAnswers);

    window.sessionStorage.setItem("answers", JSON.stringify(userAnswers));

    if (situationTotal < updateOffset + 1) {
      if (myUserId) fetchPostUserAnswers(myUserId, Number(categoryId));
    } else {
      setSituationOffset(updateOffset);
      navigate(
        `/category/${categoryId}/question/${
          situationAndQuestion && situationAndQuestion[updateOffset].questionId
        }`
      );
    }
  };

  useEffect(() => {
    fetchSituationAndQuestion(categoryId);
  }, []);

  useEffect(() => {
    if (situationAndQuestion && situationAndQuestion.length > 0 && questionId) {
      const indexNumber = situationAndQuestion.findIndex(
        (s) => s.questionId === Number(questionId)
      );

      answers && setUserAnswers(JSON.parse(answers));
      setSituationOffset(indexNumber);
    }
  }, [situationAndQuestion]);

  return (
    <QuestionViewLayout>
      {isPause && (
        <PauseLayout>
          <PauseContent>
            <PauseButtonColor
              onClick={() => {
                window.location.replace(`/category/${categoryId}/question`);
              }}
            >
              <ReplayIcon />
              다시하기
            </PauseButtonColor>
            <PauseButtonColor onClick={() => navigate("/")}>
              <StopIcon />
              그만하기
            </PauseButtonColor>
            <PauseButtonDefault onClick={() => setIsPause(false)}>
              <PlayIcon />
              계속하기
            </PauseButtonDefault>
          </PauseContent>
        </PauseLayout>
      )}
      <ContentLayout>
        <Pause onClick={() => setIsPause(true)} />
        <>
          {lastPath && situationAndQuestion && (
            <>
              <SituationImage
                src={situationAndQuestion[situationOffset].situationImage}
              />

              <QuestionLayout>
                <QuestionContent>
                  <QuestionText>
                    {situationAndQuestion[situationOffset].situation}
                  </QuestionText>

                  <NextQuestionButton
                    onClick={() =>
                      navigate(
                        `/category/${categoryId}/question/${situationAndQuestion[situationOffset].questionId}/answer`
                      )
                    }
                  >
                    <BottomArrow src={Images.BottomArrow} />
                  </NextQuestionButton>
                </QuestionContent>
              </QuestionLayout>
            </>
          )}
        </>

        <Routes>
          {/* path에 부모 경로까지 적을 필요 없이 파라미터만 적어줌 (:questionId) */}
          <Route
            path="/:id/answer"
            element={
              <QuestionComponents.QuestionAndAnswer
                categoryId={categoryId}
                situationAndQuestion={situationAndQuestion}
                situationOffset={situationOffset}
                clickGoNextSituation={onClickNextSituation}
              />
            }
          />
        </Routes>
      </ContentLayout>
      {openError && (
        <Components.ErrorPopup cancelButton={() => setOpenError(false)} />
      )}
    </QuestionViewLayout>
  );
};

export default Question;

const QuestionViewLayout = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;
const ContentLayout = styled.div`
  position: absolute;
  width: 740px;
  height: 100%;
  background: linear-gradient(180deg, #000513 0%, #171a5f 100%);
  padding: 20px 20px 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const PauseLayout = styled.div`
  z-index: 1;
  height: 100%;
  position: absolute;
  width: 740px;
  background: rgba(3, 3, 3, 0.76);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 37px;
`;

const PauseContent = styled.div`
  width: 100%;
  padding: 34px 32px 35px 24px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 14px;
  border-radius: 15px;
  background: #fff;
  color: var(--white, #fff);
  font-size: 16px;
  font-weight: 700;
`;

const PauseButtonColor = styled.div`
  display: flex;
  height: 48px;
  align-items: center;
  border-radius: 30px;
  background: #f56571;
  justify-content: center;

  box-shadow: 0px 5px 0px 1px #883037;
  margin-bottom: 19px;
`;

const PauseButtonDefault = styled.div`
  display: flex;
  height: 48px;
  align-items: center;
  border-radius: 30px;
  background: #171a5f;
  justify-content: center;

  box-shadow: 0px 5px 0px 1px #000;
`;

const SituationImage = styled.img``;

const QuestionLayout = styled.div`
  height: 168px;
  border: 3px solid #bbcbcb;
  background: #00316b;
`;

const QuestionContent = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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

const NextQuestionButton = styled.div`
  text-align: end;
`;

const BottomArrow = styled.img`
  width: 15px;
  height: 20px;
`;
