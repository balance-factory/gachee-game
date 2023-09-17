export const BASE_URL: any =
  "https://btteur8pu6.execute-api.ap-northeast-2.amazonaws.com/dev";

export type Category = {
  category_id: number;
  name: string;
};

export const getCategories = async (): Promise<Category[]> => {
  try {
    const response = await fetch(`${BASE_URL}/categories`);

    const data: Category[] = await response.json();

    return data;
  } catch (error) {
    return [];
  }
};
