export const BASE_URL: any = "https://btteur8pu6.execute-api.ap-northeast-2.amazonaws.com/dev";

export class PaginationInfo<T> {
    offset: number;
    total: number;

    constructor(size?: number) {
        this.total = 0;
        this.offset = 0;
    }

    next = () => {
        if (this.offset + 1 < this.total) {
            this.offset = this.offset + 1;
        }
    };

    prev = () => {
        if (this.offset > 0) {
            this.offset = this.offset - 1;
        }
    };

    // startPage = () => {
    //     if (this.offset > 0) {
    //         this.offset = 0;
    //     }
    // };

    // endPage = () => {
    //     if (this.offset + 1 < this.totalPage) {
    //         this.offset = this.totalPage - 1;
    //     }
    // };

    setOffset = (offset: number) => {
        this.offset = offset;
    };
}

export type SituationAndQuestions = {
    id: string; //상황 id
    text: string; //상황 텍스트
    questionAndAnswers: QuestionAndAnswer[];
};

export type QuestionAndAnswer = {
    question: Question;
    answers: Answer[];
};

export type Question = {
    id: string; //문제 아이디
    title: string; //문제 타이틀
    subtitle: string; //문제 서브타이틀
};

export type Answer = {
    id: string;
    text: string;
    ordinal: number; //답안지 랜덤하게 보여주기 위해서
};

const mockData = [
    {
        id: "situation1", //상황 id
        text: "상황1일 상황", //상황 텍스트
        questionAndAnswers: [
            {
                question: {
                    id: "question1-1-ID", //문제 아이디
                    title: "situation1- 문제1일번", //문제 타이틀
                    subtitle: "상황1 문제 1번 서브", //문제 서브타이틀
                },
                answers: [
                    {
                        id: "answer1-1",
                        text: "문제1 정답1번",
                        ordinal: 1,
                    },
                    {
                        id: "answer1-2",
                        text: "문제1 정답2번",
                        ordinal: 2,
                    },
                ],
            },
            {
                question: {
                    id: "question1-2-ID", //문제 아이디
                    title: "situation1-문제2일번", //문제 타이틀
                    subtitle: "상황1 문제 2번 서브", //문제 서브타이틀
                },
                answers: [
                    {
                        id: "answer2-1",
                        text: "상황1 문제2-정답1번",
                        ordinal: 1,
                    },
                    {
                        id: "answer2-1",
                        text: "상황1 문제2 정답2번",
                        ordinal: 1,
                    },
                ],
            },
        ],
    },

    {
        id: "situation2", //상황 id
        text: "상황2일 상황", //상황 텍스트
        questionAndAnswers: [
            {
                question: {
                    id: "question2-1-ID", //문제 아이디
                    title: "situation2- 문제1일번", //문제 타이틀
                    subtitle: "상황2 문제 1번 서브", //문제 서브타이틀
                },
                answers: [
                    {
                        id: "answer3-1",
                        text: "상황2  문제1 정답1번",
                        ordinal: 1,
                    },
                    {
                        id: "answer3-2",
                        text: "상황2 문제1 정답2번",
                        ordinal: 2,
                    },
                ],
            },
            {
                question: {
                    id: "question2-2-ID", //문제 아이디
                    title: "situation2-문제2일번", //문제 타이틀
                    subtitle: "상황2 문제 2번 서브", //문제 서브타이틀
                },
                answers: [
                    {
                        id: "answer4-1",
                        text: "상황2 문제2-정답1번",
                        ordinal: 1,
                    },
                    {
                        id: "answer4-2",
                        text: "상황2 문제2 정답2번",
                        ordinal: 1,
                    },
                ],
            },
        ],
    },
];

export const getSituationAndQuestions = (categoryId: string): SituationAndQuestions[] => {
    let data: SituationAndQuestions[] = [];
    // fetch(`${BASE_URL}/questions/${categoryId}`)
    //     .then((res) => {
    //         return res.json();
    //     })
    //     .then((res) => console.log("res", res));

    data = mockData;
    return data;
};
