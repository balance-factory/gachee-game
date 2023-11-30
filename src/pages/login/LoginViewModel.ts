import { REST_API_KEY, REDIRECT_URI } from "KakaoOAuth";
import uuid from "react-uuid";
import * as Interface from "interface";
import { api } from "api";

export const BASE_URL: any =
  "https://btteur8pu6.execute-api.ap-northeast-2.amazonaws.com/dev";

export type KakaoToken = {
  access_token: string;
  token_type: string;
  refresh_token: string;
  expires_in: number;
  scope: string;
  refresh_token_expires_in: number;
};

export type KakaoUserInfo = {
  social: string;
  gender: string;
  name: string;
  email: string;
  userId: string;
  profile_image: string | null;
};

export type UserInfo = {
  profile_image: string | null;
  gachee_id: string;
  name: string;
  email: string;
  isFirstTime: boolean;
};

export const getKakaoToken = async (KAKAO_CODE: string): Promise<UserInfo> => {
  try {
    const response = await fetch(`https://kauth.kakao.com/oauth/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      },
      body: `grant_type=authorization_code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${KAKAO_CODE}`,
    });

    const data: KakaoToken = await response.json();
    return getKakaoUserInfo(data.access_token);
  } catch (error) {
    const userInfo = {} as UserInfo;
    return userInfo;
  }
};

export const getKakaoUserInfo = async (
  accessToken: string
): Promise<UserInfo> => {
  try {
    const response = await fetch(`https://kapi.kakao.com/v2/user/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    });

    const data = await response.json();

    const userInfo: KakaoUserInfo = {
      social: "kakao",
      userId: data.id,
      email: data.kakao_account.email,
      gender: data.kakao_account.gender,
      name: data.kakao_account.profile.nickname,
      profile_image: data.kakao_account.profile.profile_image,
    };
    return getUserInfo(userInfo);
  } catch (error) {
    const userInfo = {} as UserInfo;
    return userInfo;
  }
};

export const getUserInfo = async (user: KakaoUserInfo): Promise<UserInfo> => {
  try {
    const response = await fetch(`${BASE_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        social: user.social,
        userId: user.userId,
        email: user.email,
        gender: user.gender,
        name: user.name,
        profile_image: user.profile_image ?? "",
      }),
    });

    const data = await response.json();
    const userInfo: UserInfo = {
      profile_image: data.user.profile_image ?? "",
      gachee_id: data.user.gachee_id,
      name: data.user.name,
      email: data.user.email,
      isFirstTime: data.user.is_first === 1 ? true : false,
    };

    return userInfo;
  } catch (error) {
    const userInfo = {} as UserInfo;
    return userInfo;
  }
};
