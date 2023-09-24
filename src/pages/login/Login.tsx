import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as VM from "./LoginViewModel";
import * as Components from "pages/components/index";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const KAKAO_CODE = new URL(location.href).searchParams.get("code");
  const [openError, setOpenError] = useState<boolean>(false);

  const goToLogin = async (KAKAO_CODE: string) => {
    try {
      const userInfo = await VM.getKakaoToken(KAKAO_CODE);

      if (userInfo.gachee_id) {
        window.sessionStorage.setItem("my-user-id", userInfo.gachee_id);

        if (
          sessionStorage.getItem("category-id") &&
          sessionStorage.getItem("match-user-id")
        ) {
          navigate(
            `/category/${sessionStorage.getItem("category-id")}/question`
          );
        } else {
          navigate(`/category`);
        }
      } else {
        navigate(`/`);
      }
    } catch (error) {
      setOpenError(true);
    }
  };

  useEffect(() => {
    KAKAO_CODE ? goToLogin(KAKAO_CODE) : navigate(`/login`);
  }, [KAKAO_CODE]);

  return (
    <>
      {openError && (
        <Components.ErrorPopup cancelButton={() => setOpenError(false)} />
      )}
    </>
  );
};
export default Login;
