export const BASE_URL: any =
  "https://btteur8pu6.execute-api.ap-northeast-2.amazonaws.com/dev";


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

  setOffset = (offset: number) => {
    this.offset = offset;
  };
}

export type SituationAndQuestion = {
  question_id: number; // 문제 id
  situation: string; // 상황 설명
  situation_image: string; //상황 이미지
  title_image: string; // 문제 이미지
  title: string; // 문제 설명
  sub_title: string; // 추가 설명
  categoryId: number; //문제의 카테고리 id
  answers: [{ answer_id: number; answer_content: string; question_id: string }];
};

export type Answer = {
  question_id: number;
  answer_id: number;
};

export const getSituationAndQuestion = async (
  categoryId: string
): Promise<SituationAndQuestion[]> => {
  try {
    const response = await fetch(`${BASE_URL}/questions-answers/${categoryId}`);

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(`${error} 에러`);
    return [];
  }
};

export const postUserAnswers = async (answers: Answer[], userId: string) => {
  try {
    const response = await fetch(`${BASE_URL}/user-answers/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ answers: answers }),
    });

    const data = await response.json();

    return data;
  } catch (error) {
    return console.log(`${error} 에러`);
  }
};


