export const calculateScore = (correctAnswers: number) => {
    console.log("correctAnswers", correctAnswers);
    const totalQuestions = 10;
    const maxScore = 100;

    // 각 문제당 점수 계산 (5점 단위로 계산)
    const scorePerQuestion = maxScore / totalQuestions;

    // 정확한 점수 계산 (5점 단위로 반올림)
    const exactScore = Math.round((correctAnswers * scorePerQuestion) / 5) * 5;

    // 최대 점수는 100점으로 제한
    const score = Math.min(maxScore, exactScore);

    return score;
};

// // 테스트
// const testCorrectAnswers = 8;
// const testScore = calculateScore(testCorrectAnswers);
// console.log("Score:", testScore); // 출력: Score: 80
