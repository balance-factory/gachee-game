import * as Interface from "interface";
import { api } from "api";

export const getKakaoLoginToUserInfo = async (code: string) => {
  const { data } = await api.get<{
    body: {
      jwtToken: Interface.TokenInfo;
      memberInfo: Interface.MemberInfo;
    };
  }>(`/member/oauth?code=${code}`);
  return data.body;
};
