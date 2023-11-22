import * as Interface from "../../interface";
import { api } from "../../api";

export const getQuestions = async (categoryId: number) => {
    const { data } = await api.get<{
        body: {
            matchedMemberList: Interface.Question[];
        };
    }>(`/question/questionList?categoryId=${categoryId}`);
    return data;
};

export const getUserAnswerList = async (memberId?: number) => {
    const { data } = await api.get<{
        body: {
            matchedMemberList: Interface.MemberAnswer;
        };
    }>(memberId ? `/memberAnswer/memberAnswerList?matchedMemberId=${memberId}` : "/memberAnswer/memberAnswerList");
    return data;
};

const questionList = [
    {
        questionId: 1004,
        situation: "친구가 연락와서 소개팅할거냐고 물어봤다.키,외모,성격 모두 내 타입이다.",
        situationImage: "https://mml.pstatic.net/www/mobile/edit/20231025_1095/upload_1698200483547lzwTg.png",
        titleImage: "https://mml.pstatic.net/www/mobile/edit/20231025_1095/upload_1698200483547lzwTg.png",
        title: "10살 차이나는 이성의 소개팅이 들어왔다.",
        subTitle: "“근데 나이가...”",
        answerList: [
            {
                answerId: 1,
                questionId: 1004,
                answerContent: "위로 10살을 받는다",
            },
            {
                answerId: 2,
                questionId: 1004,
                answerContent: "아래로 10살을 받는다",
            },
        ],
    },
    {
        questionId: 1005,
        situation: "소개팅으로 만난 그 사람이 마음에 들어서 몇번의 만남 후 연인이 되었다.",
        situationImage: "https://mml.pstatic.net/www/mobile/edit/20231025_1095/upload_1698200483547lzwTg.png",
        titleImage: "https://mml.pstatic.net/www/mobile/edit/20231025_1095/upload_1698200483547lzwTg.png",
        title: "내 애인의 직업은",
        subTitle: "",
        answerList: [
            {
                answerId: 3,
                questionId: 1005,
                answerContent: "연봉 7천 대기업 대리",
            },
            {
                answerId: 4,
                questionId: 1005,
                answerContent: "연봉 추정불가 스타트업 대표",
            },
        ],
    },
];

export const getSelectedUserAnswers = async (
    categoryId: number,
    matchedUserId: string
): Promise<Interface.MatchedUserResultInfo> => {
    try {
        const [api1Response, api2Response] = await Promise.all([
            api.get<{
                body: {
                    questionList: Interface.Question[];
                };
            }>(`/question/questionList?categoryId=${categoryId}`),
            api.get<{
                body: {
                    matchScore: number;
                    matchedMemberName: string;
                    memberAnswerList: {
                        matchedMemberAnswerList: Interface.SelectedAnswer[];
                        myAnswerList: Interface.SelectedAnswer[];
                    };
                };
            }>(`/memberAnswer/memberAnswerList?matchedMemberId=${matchedUserId}&categoryId=${categoryId}`),
        ]);

        const questions = api1Response.data.body.questionList;
        const myAnswerList = api2Response.data.body.memberAnswerList.myAnswerList;
        const matchedUserName = api2Response.data.body.matchedMemberName;
        const matchedScore = api2Response.data.body.matchScore;
        const matchedUserAnswerList = api2Response.data.body.memberAnswerList.matchedMemberAnswerList;

        // Map the questions from API1 and update with selected_answer from API2
        const userSelectedQuestionAndAnswers = questions.map((question) => {
            const myAnswer = myAnswerList.find((myAnswer) => myAnswer.questionId === question.questionId);
            const matchedAnswer = matchedUserAnswerList.find(
                (matchedMemberAnswer) => matchedMemberAnswer.questionId === question.questionId
            );
            const result: Interface.MatchUserSelectResult = {
                questionId: question.questionId,
                title: question.title,
                answers: question.answerList,
                selectedMyAnswer: {
                    answerId: myAnswer?.answerId!,
                    questionId: myAnswer?.questionId!,
                },
                selectedMatchedUserAnswer: {
                    answerId: matchedAnswer?.answerId!,
                    questionId: matchedAnswer?.questionId!,
                },
            };
            return result;
        });

        console.log("userSelectedQuestionAndAnswers", matchedUserAnswerList);
        return {
            matchedUserName: matchedUserName,
            matchedScore: matchedScore,
            resultList: userSelectedQuestionAndAnswers,
        }; // Return the questions questions;
    } catch (error) {
        console.error("Error fetching APIs:", error);
        throw error;
    }
};
