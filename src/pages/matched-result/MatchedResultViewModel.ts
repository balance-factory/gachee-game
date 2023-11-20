import * as Interface from "../../interface";
import { api } from "../../api";

export const getQuestions = async (categoryId: number) => {
    const { data } = await api.get<Interface.Question[]>(`/question/questionList?categoryId=${categoryId}`);
    return data;
};

export const getUserAnswerList = async (memberId?: number) => {
    const { data } = await api.get<Interface.MemberAnswer[]>(
        memberId ? `/memberAnswer/memberAnswerList?matchedMemberId=${memberId}` : "/memberAnswer/memberAnswerList"
    );
    return data;
};

export const getSelectedUserAnswers = async (
    categoryId: number,
    matchedUserId: string
): Promise<Interface.MatchUserSelectResult[]> => {
    try {
        const [api1Response, api2Response, api3Response] = await Promise.all([
            api.get<Interface.Question[]>(`/question/questionList?categoryId=${categoryId}`),
            api.get<Interface.MemberAnswer[]>("/memberAnswer/memberAnswerList"),
            api.get<Interface.MemberAnswer[]>(`/memberAnswer/memberAnswerList?matchedMemberId=${matchedUserId}`),
        ]);

        const questions = api1Response.data;
        const myAnswerList = api2Response.data;
        const matchedUserAnswerList = api3Response.data;

        // Map the questions from API1 and update with selected_answer from API2
        const userSelectedQuestionAndAnswers = questions.map((question) => {
            const myAnswer = myAnswerList.find((answer) => answer.questionId === question.questionId);
            const matchedAnswer = matchedUserAnswerList.find((answer) => answer.questionId === question.questionId);
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

        return userSelectedQuestionAndAnswers; // Return the questions questions;
    } catch (error) {
        console.error("Error fetching APIs:", error);
        throw error;
    }
};
