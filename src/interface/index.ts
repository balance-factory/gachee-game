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
    answers: Answer[];
    selected_answer: {
        answer_id: number;
        answer_content: string;
    };
};

export type Answer = {
    id: number;
    text: string;
};

export type MatchUser = {
    match_id: number;
    user_a_id: string;
    user_b_id: string;
    matched_date: string;
    match_score: number;
    user_b: {
        user_b_user_id: string;
        user_b_name: string;
        user_b_gender: string;
        user_b_profile_image: string;
        created_at: string;
    };
};
