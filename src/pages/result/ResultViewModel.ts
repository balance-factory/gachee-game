export const BASE_URL: any = "https://btteur8pu6.execute-api.ap-northeast-2.amazonaws.com/dev";
import * as Interface from "../../interface";

export const getUserResult = async (userId: string): Promise<Interface.UserAnswer[]> => {
    try {
        const response = await fetch(`${BASE_URL}/user/${userId}/answers`);
        const data = await response.json();
        console.log("data", data);
        return data;
    } catch (error) {
        console.error("Error fetching match users:", error);
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
