export const BASE_URL: any = "https://btteur8pu6.execute-api.ap-northeast-2.amazonaws.com/dev";

export type MatchUser = {
    userId: string;
    userName: string;
    matchScore: number;
};

export const getMatchUsers = async (): Promise<MatchUser[]> => {
    try {
        const response = await fetch(`${BASE_URL}/matched-users`);
        const data = await response.json();
        console.log("data", data);
        return data;
    } catch (error) {
        console.error("Error fetching match users:", error);
        return [];
    }
};
