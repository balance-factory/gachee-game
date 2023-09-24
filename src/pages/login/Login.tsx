import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as VM from "./LoginViewModel";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const KAKAO_CODE = new URL(location.href).searchParams.get("code");

  const goToLogin = async (KAKAO_CODE: string) => {
    try {
      const userInfo = await VM.getKakaoToken(KAKAO_CODE);

    

      if (userInfo.gachee_id) {
        window.sessionStorage.setItem("my-user-id", userInfo.gachee_id);
        navigate(`/category`);
      } else {
        navigate(`/`);
      }
    } catch (error) {
      console.error("Error fetching matched users:", error);
    }
  };

  useEffect(() => {
    KAKAO_CODE ? goToLogin(KAKAO_CODE) : navigate(`/login`);
  }, [KAKAO_CODE]);

  return <></>;
};
export default Login;
