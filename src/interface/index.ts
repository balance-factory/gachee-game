export type MySelectResult = {
    questionId: number;
    title: string;
    answers: Answer[];
    selectedAnswer: SelectedAnswer;
};

export type MatchUserSelectResult = {
    questionId: number;
    title: string;
    answers: Answer[];
    selectedMyAnswer: SelectedAnswer;
    selectedMatchedUserAnswer: SelectedAnswer;
};

export type MatchedUserResultInfo = {
    matchedUserName: string;
    matchedScore: number;
    resultList: MatchUserSelectResult[];
};

export type SelectedAnswer = {
    answerId: number;
    questionId: number;
};

export type MatchedUser = {
    memberId: string;
    profileImage: string;
    name: string;
    email: string;
    isFirst: boolean;
    gender: string;
    social: string;
    createdAt: string;
    updatedAt: string;
    matchScore: number;
};

export type Question = {
    questionId: number;
    situation: string;
    situationImage: string;
    titleImage: string;
    title: string;
    subTitle?: string;
    answerList: Answer[];
};

export type Answer = {
    answerId: number;
    questionId?: number;
    answerContent?: string;
    comment: string;
};

export type MemberAnswer = {
    matchScore: number;
    matchedMemberName: string;
    memberAnswerList?: selectedAnswer[];
    myAnswerList?: selectedAnswer[];
};

export type selectedAnswer = {
    answerId: number;
    questionId: number;
};

export type MemberInfoAndToken = {
    jwtToken: TokenInfo;
    memberInfo: MemberInfo;
};

export type TokenInfo = {
    accessToken: string;
    refreshToken: string;
    accessTokenExpiresIn: number;
};

export type MemberInfo = {
    oAuthId: string;
    name: string;
    email: string;
    gender: string;
    profileImage: string;
    social: string;
    memberId: string;
    isFirstTime: number;
};

export type Category = {
    categoryId: number;
    name: string;
};
