import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import BackArrow from "../../assets/icon/back_arrow_icon.svg";
import Button from "assets/icon/main_button_icon.svg";
import Error from "assets/image/error.png";

const NotFoundView: React.FC = () => {
  const navigate = useNavigate();

  return (
    <NotFoundViewLayout>
      <ContentLayout>
        <Content>
          <ErrorImageLayout>
            <ErrorImage src={Error} />
          </ErrorImageLayout>
          주소가 잘못 입력되거나
          <br />
          변경 혹은 삭제되어 페이지를 찾을 수 없어요.
          <ButtonIconLayout onClick={() => navigate(`/`)}>
            <ButtonText>메인으로</ButtonText>
            <Button />
          </ButtonIconLayout>
        </Content>
      </ContentLayout>
    </NotFoundViewLayout>
  );
};

export default NotFoundView;

const NotFoundViewLayout = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
`;

const ContentLayout = styled.div`
  width: 740px;
  height: 100%;
  background: linear-gradient(#010614, #171a5f);
  padding: 0 38px;
  display: flex;
  align-items: center;
`;
const ErrorImageLayout = styled.div`
  width: 100%;
`;

const ErrorImage = styled.img`
  width: 242px;
  height: 166px;
`;

const Content = styled.div`
  width: 100%;
  height: fit-content;
  text-align: center;
`;

const ButtonIconLayout = styled.div`
  position: relative;
  margin-top: 51px;
`;

const ButtonText = styled.div`
  font-size: 16px;
  font-weight: 700;
  position: absolute;
  right: calc(50% - 30px);
  top: calc(50% - 15px);
  color: #000;
`;
