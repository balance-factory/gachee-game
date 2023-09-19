export const BASE_URL: any = "https://btteur8pu6.execute-api.ap-northeast-2.amazonaws.com/dev";
import * as Interface from "../../interface";

export const getUserResult = async (userId: string): Promise<Interface.UserAnswer[]> => {
    try {
        const response = await fetch(`${BASE_URL}/user/${userId}/answers`);
        await fetch(`${BASE_URL}/user/${userId}/answers`);
        const data = await response.json();
        console.log("data", data);
        return data;
    } catch (error) {
        console.error("Error fetching match users:", error);
        return [];
    }
};

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

export type Answer = {
    question_id: number;
    answer_id: number;
};

export const getSituationAndQuestion = async (categoryId: string): Promise<SituationAndQuestion[]> => {
    try {
        const response = await fetch(`${BASE_URL}/questions-answers/${categoryId}`);

        const data = await response.json();
        return data;
    } catch (error) {
        console.log(`${error} 에러`);
        return [];
    }
};

export const getResult = async (userId: string, userBId: string): Promise<Interface.SelectResult[]> => {
    try {
        const response = await fetch(`${BASE_URL}/`);
        const data = await response.json();
        console.log("data", data);
        return data;
    } catch (error) {
        console.error("Error fetching match users:", error);
        return [];
    }
};
