import * as Interface from "../../interface";
export const BASE_URL: any = "https://btteur8pu6.execute-api.ap-northeast-2.amazonaws.com/dev";

export const getMatchUsers = async (userId: string, categoryId: number): Promise<Interface.MatchUser[]> => {
    try {
        const response = await fetch(`${BASE_URL}/category/${categoryId}/user/${userId}/matched-users`);
        const data = await response.json();
        console.log("data", data);

        return data;
    } catch (error) {
        console.error("Error fetching match users:", error);
        return [];
    }
};
