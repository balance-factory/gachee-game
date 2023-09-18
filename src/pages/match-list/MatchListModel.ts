import * as Interface from "../../interface";
export const BASE_URL: any = "https://btteur8pu6.execute-api.ap-northeast-2.amazonaws.com/dev";

export const getMatchUsers = async (userId: string): Promise<Interface.MatchUser[]> => {
    try {
        const response = await fetch(`${BASE_URL}/matched-users/${1}`);
        const data = await response.json();
        console.log("data", data);
        return data;
    } catch (error) {
        console.error("Error fetching match users:", error);
        return [];
    }
};
