import styled from "styled-components";
import { REST_API_KEY, REDIRECT_URI } from "../../KakaoOAuth";

const Main = () => {
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code `;

    const kakao = () => {
        window.location.href = KAKAO_AUTH_URL;
    };

    return (
        <Header>
            메인 페이지
            <button onClick={kakao}>카카오톡으로 로그인 하기</button>
        </Header>
    );
};
export default Main;

const Header = styled.h1`
    color: blue;
    font-family: Galmuri;
`;
