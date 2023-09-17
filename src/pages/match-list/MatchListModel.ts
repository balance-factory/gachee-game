export const BASE_URL: any = "https://btteur8pu6.execute-api.ap-northeast-2.amazonaws.com/dev";

export type MatchUser = {
    match_id: number;
    user_a_id: string;
    user_b_id: string;
    matched_date: string;
    match_score: number;
    user_b_user_id: string;
    user_b_name: string;
    user_b_gender: string;
    user_b_profile_image: string;
};

export const getMatchUsers = async (userId: string): Promise<MatchUser[]> => {
    try {
<<<<<<< HEAD
        const response = await fetch(`${BASE_URL}/matched-users/${userId}`);
        const data = await response.json();
        console.log("data", data);
        return data.matchedUsers;
=======
      const response = await fetch(`${BASE_URL}/matched-users`);
      const data = await response.json();
      return data;
>>>>>>> main
    } catch (error) {
        console.error("Error fetching match users:", error);
        return [];
    }
};
