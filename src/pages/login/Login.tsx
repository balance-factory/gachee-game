import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as VM from "./LoginViewModel";
import * as Components from "pages/components/index";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const KAKAO_CODE = new URL(location.href).searchParams.get("code");
  const [openError, setOpenError] = useState<boolean>(false);

  const fetchKakaoLogin = (KAKAO_CODE: string) => {
    VM.getKakaoLoginToUserInfo(KAKAO_CODE)
      .then((res) => {
        if (res.memberInfo.memberId) {
          window.sessionStorage.setItem("my-user-id", res.memberInfo.memberId);

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
      })
      .catch((err) => {
        if (err.status) {
          setOpenError(true);
        }
      });
  };

  useEffect(() => {
    KAKAO_CODE ? fetchKakaoLogin(KAKAO_CODE) : navigate(`/login`);
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
