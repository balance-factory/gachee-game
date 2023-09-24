export type MySelectResult = {
    question_id: number;
    title: string;
    answers: [{ answer_id: number; answer_content: string; question_id: string }];
    selectedAnswer: {
        answerId: number;
        questionId: number;
    };
};

export type MatchUserSelectResult = {
    question_id: number;
    title: string;
    answers: [{ answer_id: number; answer_content: string; question_id: string }];
    selectedAnswer: {
        answerId: number;
        questionId: number;
    };
    selectedBAnswer: {
        answerId: number;
        questionId: number;
    };
};

export type UserAnswer = {
    question_id: number;
    question_title: string;
    answers: Answer[];
    selected_answer: {
        answer_id: number;
        answer_content: string;
    };
};

export type UserInfo = {
  user_id: string;
  name: string;
  gender: string;
  profile_image: string;
  social: string;
  gachee_id: string;
  isFirstTime: number;
};

export type Answer = {
    id: number;
    text: string;
};

export type MatchUser = {
    gachee_id: string;
    name: string;
    gender: string;
    profile_image: "";
    social: string;
    user_id: string;
    is_first: boolean;
    created_at: string;
    updated_at: string;
    match_score: number;
};
