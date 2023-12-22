import styled from "styled-components";
import React from "react";
import { REST_API_KEY, REDIRECT_URI } from "KakaoOAuth";

interface LoginModalProps {
  cancelButton: () => void;
}

const LoginModal: React.FC<LoginModalProps> = (props) => {
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code `;
  return (
    <LoginModalViewLayout>
      <LoginContentLayout>
        <Title>
          가치게임을 시작하려면
          <br />
          로그인이 필요합니다.
        </Title>

        <ButtonLayout>
          <LoginButton onClick={() => (window.location.href = KAKAO_AUTH_URL)}>
            로그인하기
          </LoginButton>
          <CancelButton onClick={props.cancelButton}>취소</CancelButton>
        </ButtonLayout>
      </LoginContentLayout>
    </LoginModalViewLayout>
  );
};

export default LoginModal;

const LoginModalViewLayout = styled.div`
  position: absolute;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(3, 3, 3, 0.76);
`;

const LoginContentLayout = styled.div`
  width: 300px;
  padding: 30px 28px 14px 28px;
  border-radius: 15px;
  background: #fff;
`;

const Title = styled.div`
  color: #000;
  text-align: center;
  font-size: 18px;
  font-weight: 700;
  line-height: 140%;
  letter-spacing: 0.18px;
`;

const ButtonLayout = styled.div`
  margin-top: 28px;
`;

const LoginButton = styled.div`
  display: flex;
  height: 48px;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  background: #171a5f;
  color: white;
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 10px;
`;

const CancelButton = styled.div`
  display: flex;
  height: 48px;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  background-color: none;
`;
