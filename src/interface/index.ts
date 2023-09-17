export type SelectResult = {
    id: string;
    question: string;
    auserAnswerId: number;
    buserAnswerId?: number;
    answers: Answer[];
};

export type UserAnswer = {
    question_id: number;
    question_title: string;
    selected_answer: {
        answer_id: number;
        answer_content: string;
    };
};

export type Answer = {
    id: number;
    text: string;
    select: boolean;
};

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
