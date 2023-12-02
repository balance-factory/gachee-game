import * as Interface from "interface";
import { api } from "api";

export const getCategories = async () => {
  const { data } = await api.get<{
    body: {
      categoryList: Interface.Category[];
    };
  }>(`/category/categoryList`);
  return data.body.categoryList;
};
