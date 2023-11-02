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
    questionId: number;
    answerContent: string;
};

export type MemberAnswer = {
    answerId: number;
    questionId: number;
};
