export type SelectResult = {
    id: string;
    question: string;
    auserAnswerId: string;
    buserAnswerId?: string;
    answers: Answer[];
};

export type Answer = {
    id: string;
    text: string;
    select: boolean;
};
