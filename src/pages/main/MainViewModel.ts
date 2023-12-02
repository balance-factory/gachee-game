import * as Interface from "interface";
import { api } from "api";

export const getMemberInfo = async (memberId: string) => {
  const { data } = await api.get<{
    body: {
      memberInfo: Interface.MemberInfo;
    };
  }>(`/member/info?memberId=${memberId}`);
  return data.body.memberInfo;
};
