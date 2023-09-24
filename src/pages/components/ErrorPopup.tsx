import styled from "styled-components";
import React from "react";

interface ErrorPopupProps {
  cancelButton: () => void;
}

const ErrorPopup: React.FC<ErrorPopupProps> = (props) => {
  return (
    <ErrorPopupViewLayout>
      <LoginContentLayout>
        <Title>
          일시적인 네트워크 문제로
          <br />
          서비스가 원활하지 않습니다.
          <br />
          잠시 후 다시 시도해주세요.
        </Title>

        <ConfirmButton onClick={props.cancelButton}>확인</ConfirmButton>
      </LoginContentLayout>
    </ErrorPopupViewLayout>
  );
};

export default ErrorPopup;

const ErrorPopupViewLayout = styled.div`
  position: absolute;
  z-index: 1;
  top: 0;
  right: 0;
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
  font-family: Pretendard;
`;

const ConfirmButton = styled.div`
  display: flex;
  height: 48px;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  background-color: none;
  background: #171a5f;
  color: white;
  margin-top: 28px;
`;
