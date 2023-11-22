import * as Interface from "../../interface";
import { api } from "../../api";

export const getMatchedUsers = async (categoryId: number) => {
    const { data } = await api.get<{
        body: {
            matchedMemberList: Interface.MatchedUser[];
        };
    }>(`/memberAnswer/matchedMemberList?categoryId=${categoryId}`);
    return data.body.matchedMemberList;
};
