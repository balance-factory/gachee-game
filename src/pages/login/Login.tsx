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
        if (res) {
          localStorage.setItem("accessToken", res.jwtToken.accessToken);
          localStorage.setItem("refreshToken", res.jwtToken.refreshToken);
          localStorage.setItem(
            "accessTokenExpiresIn",
            res.jwtToken.accessTokenExpiresIn.toString()
          );
          window.localStorage.setItem("myUserId", res.memberInfo.memberId);

          if (
            localStorage.getItem("categoryId") &&
            localStorage.getItem("matchUserId")
          ) {
            navigate(
              `/category/${localStorage.getItem("categoryId")}/question`
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
        <Components.ErrorPopup
          cancelButton={() => {
            setOpenError(false);
            navigate(`/`);
          }}
        />
      )}
    </>
  );
};
export default Login;
