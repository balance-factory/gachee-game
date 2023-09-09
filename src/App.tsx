import * as Pages from "./pages";
import GlobalStyle from "./style/GlobalStyle";
import { BrowserRouter, Router, Route, Routes } from "react-router-dom";

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <GlobalStyle />
            <Routes>
                <Route path="/" element={<Pages.MainView />} />
                <Route path="/login" element={<Pages.LoginView />} />
                <Route path="/menual" element={<Pages.MenualView />} />
                <Route path="/category" element={<Pages.CategoryView />} />
                {/* 하위 페이지가 있을때 부모 Route에 '/*' 을 추가해줌 (exact가 대체된 것)*/}
                <Route path="/question/*" element={<Pages.QuestionView />} />

                <Route path="/match-list" element={<Pages.MatchListView />} />
                <Route path="/result" element={<Pages.ResultView />} />
                <Route path="/my-answer" element={<Pages.MyAnswerView />} />
                <Route path="*" element={<>NotFound</>} />
                {/* 링크 공유주소 "?requester-id=&participater-id=" */}
            </Routes>
        </BrowserRouter>
    );
};

export default App;
