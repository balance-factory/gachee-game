import * as Interface from "../../interface";
import { api } from "../../api";

export const getMatchedUsers = async (categoryId: number) => {
    try {
        const response = await api.get<Interface.MatchedUser[]>(
            `/memberAnswers/matchedUserList?categoryId=${categoryId}`
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};
