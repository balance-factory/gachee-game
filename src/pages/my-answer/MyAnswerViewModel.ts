import * as Interface from "../../interface";
import { api } from "../../api";

export const getUserResult = async (categoryId: number): Promise<Interface.MySelectResult[]> => {
    try {
        const [api1Response, api2Response] = await Promise.all([
            api.get<Interface.Question[]>(`/question/questionList?categoryId=${categoryId}`),
            api.get<Interface.MemberAnswer[]>("/memberAnswer/memberAnswerList"),
        ]);

        const questions = api1Response.data;
        const myAnswerList = api2Response.data;

        // Map the questions from API1 and update with selected_answer from API2
        const userSelectedQuestionAndAnswers = questions.map((question) => {
            const selectedAnswer = myAnswerList.find((answer) => answer.questionId === question.questionId);
            const result: Interface.MySelectResult = {
                questionId: question.questionId,
                title: question.title,
                answers: question.answerList,
                selectedAnswer: {
                    answerId: selectedAnswer?.answerId!,
                    questionId: selectedAnswer?.questionId!,
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
