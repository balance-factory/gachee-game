export const BASE_URL: any = "https://btteur8pu6.execute-api.ap-northeast-2.amazonaws.com/dev";

export type MatchUser = {
    userId: string;
    userName: string;
    matchScore: number;
};

export const getMatchUsers = (): MatchUser[] => {
    let user: MatchUser[] = [];
    fetch(`${BASE_URL}/matched-users`)
        .then((res) => {
            return res.json();
        })
        .then((res) => console.log("res", res));

    return user;
};
