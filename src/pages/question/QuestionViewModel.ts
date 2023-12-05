import * as Interface from "interface";
import { api } from "api";

export const getCategories = async (categoryId: number) => {
  const { data } = await api.get<{
    body: {
      questionList: Interface.Question[];
    };
  }>(`/question/questionList?categoryId=${categoryId}`);
  return data.body.questionList;
};

export const postUserAnswers = async (
  answers: Interface.Answer[],
  categoryId: number,
  matchedMemberId: number | null
) => {
  const res = await api.post(
    `/memberAnswer/saveAnswerList`,
    matchedMemberId
      ? {
          answerList: answers,
          categoryId: categoryId,
          matchedMemberId: matchedMemberId,
        }
      : {
          answerList: answers,
          categoryId: categoryId,
        }
  );
  return res;
};

// export const postUserAnswers = async (
//   answers: Answer[],
//   userId: string,
//   categoryId: number
// ) => {
//   try {
//     const response = await fetch(
//       `${BASE_URL}/category/${categoryId}/user-answer/user/${userId}`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ answers: answers }),
//       }
//     );

//     const data = await response.json();

//     return data;
//   } catch (error) {
//     return console.log(`${error} 에러`);
//   }
// };

// export const postMatchedUsers = async (
//   categoryId: number,
//   userId: string,
//   matchUserId: string
// ) => {
//   try {
//     const response = await fetch(
//       `${BASE_URL}/category/${categoryId}/my-user-id/${userId}/match-user-id/${matchUserId}`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     const data = await response.json();

//     return data;
//   } catch (error) {
//     return console.log(`${error} 에러`);
//   }
// };
