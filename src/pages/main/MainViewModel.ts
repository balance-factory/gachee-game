import { UserInfo } from "interface";
import * as Interface from "interface";
import { api } from "api";

export const BASE_URL: any =
  "https://btteur8pu6.execute-api.ap-northeast-2.amazonaws.com/dev";

export const getUserInfo = async (
  matchedUserId: string
): Promise<UserInfo | null> => {
  try {
    const response = await fetch(`${BASE_URL}/user/${matchedUserId}`);
    const data: UserInfo[] = await response.json();
    return data[0];
  } catch (error) {
    return null;
  }
};
