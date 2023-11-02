export const BASE_URL: any = "https://btteur8pu6.execute-api.ap-northeast-2.amazonaws.com/dev";
import * as Interface from "../../interface";

export type SituationAndQuestion = {
    question_id: number; // 문제 id
    situation: string; // 상황 설명
    situation_image: string; //상황 이미지
    title_image: string; // 문제 이미지
    title: string; // 문제 설명
    sub_title: string; // 추가 설명
    categoryId: number; //문제의 카테고리 id
    answers: [{ answer_id: number; answer_content: string; question_id: string }];
};

export const getMyAnswerAndMatchedUserAnswerResult = async (
    categoryId: number,
    myId: string,
    matchUserId: string
): Promise<Interface.MatchUserSelectResult[]> => {
    try {
        const [api1Response, api2Response, api3Response] = await Promise.all([
            fetch(`${BASE_URL}/category/${categoryId}`).then((response) => response.json()) as Promise<
                SituationAndQuestion[]
            >,
            fetch(`${BASE_URL}/category/${categoryId}/user/${myId}/answers`).then((response) =>
                response.json().then((res) => res.data.userAnswerResults)
            ) as Promise<{ answerId: number; questionId: number }[]>,
            fetch(`${BASE_URL}/category/${categoryId}/user/${matchUserId}/answers`).then((response) =>
                response.json().then((res) => res.data.userAnswerResults)
            ) as Promise<{ answerId: number; questionId: number }[]>,
        ]);

        // Map the questions from API1 and update with selected_answer from API2
        const questions = api1Response.map((question) => {
            const selectedAnswer = api2Response.find((answer) => answer.questionId === question.question_id);
            const selectedBAnswer = api3Response.find((answer) => answer.questionId === question.question_id);
            const result: Interface.MatchUserSelectResult = {
                question_id: question.question_id,
                title: question.title,
                answers: question.answers,
                selectedAnswer: {
                    answerId: selectedAnswer?.answerId!,
                    questionId: selectedAnswer?.questionId!,
                },
                selectedBAnswer: {
                    answerId: selectedBAnswer?.answerId!,
                    questionId: selectedAnswer?.questionId!,
                },
            };
            return result;
        });

        return questions; // Return the questions questions;
    } catch (error) {
        console.error("Error fetching APIs:", error);
        throw error;
    }
};
