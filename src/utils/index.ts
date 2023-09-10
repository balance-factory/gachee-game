export const calculateScore = (correctAnswers: number) => {
    const totalQuestions = 20;
    const maxScore = 100;
    const minScore = 0;
    const scoreIncrement = (maxScore - minScore) / (totalQuestions / 5); // 5점 단위로 총 20개의 항목이므로

    const score = minScore + correctAnswers * scoreIncrement;

    return score;
};
