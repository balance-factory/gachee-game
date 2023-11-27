import * as Interface from "../../interface";
import { api } from "../../api";

export const getSelectedUserAnswers = async (
    categoryId: number,
    matchedUserId: string
): Promise<Interface.MatchedUserResultInfo> => {
    try {
        const [api1Response, api2Response] = await Promise.all([
            api.get<{
                body: {
                    questionList: Interface.Question[];
                };
            }>(`/question/questionList?categoryId=${categoryId}`),
            api.get<{
                body: {
                    matchScore: number;
                    matchedMemberName: string;
                    memberAnswerList: {
                        matchedMemberAnswerList: Interface.SelectedAnswer[];
                        myAnswerList: Interface.SelectedAnswer[];
                    };
                };
            }>(`/memberAnswer/memberAnswerList?matchedMemberId=${matchedUserId}&categoryId=${categoryId}`),
        ]);

        const questions = api1Response.data.body.questionList;
        const myAnswerList = api2Response.data.body.memberAnswerList.myAnswerList;
        const matchedUserName = api2Response.data.body.matchedMemberName;
        const matchedScore = api2Response.data.body.matchScore;
        const matchedUserAnswerList = api2Response.data.body.memberAnswerList.matchedMemberAnswerList;

        // Map the questions from API1 and update with selected_answer from API2
        const userSelectedQuestionAndAnswers = questions.map((question) => {
            const myAnswer = myAnswerList.find((myAnswer) => myAnswer.questionId === question.questionId);
            const matchedAnswer = matchedUserAnswerList.find(
                (matchedMemberAnswer) => matchedMemberAnswer.questionId === question.questionId
            );
            const result: Interface.MatchUserSelectResult = {
                questionId: question.questionId,
                title: question.title,
                answers: question.answerList,
                selectedMyAnswer: {
                    answerId: myAnswer?.answerId!,
                    questionId: myAnswer?.questionId!,
                },
                selectedMatchedUserAnswer: {
                    answerId: matchedAnswer?.answerId!,
                    questionId: matchedAnswer?.questionId!,
                },
            };
            return result;
        });

        return {
            matchedUserName: matchedUserName,
            matchedScore: matchedScore,
            resultList: userSelectedQuestionAndAnswers,
        }; // Return the questions questions;
    } catch (error) {
        console.error("Error fetching APIs:", error);
        throw error;
    }
};
