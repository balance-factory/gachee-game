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
                <Route path="category" element={<Pages.CategoryView />} />
                <Route path="/category/:id/question/*" element={<Pages.QuestionView />} />
                <Route path="/category/:id/question/*/answer" element={<Pages.QuestionView />} />
                <Route path="/match-list/:categoryId" element={<Pages.MatchListView />} />
                <Route path="/result/:userId" element={<Pages.ResultView />} />
                {/* <Route path="/result/:userId/:matchedUserId" element={<Pages.MatchedResultView />} /> */}
                <Route path="/matched-user" element={<Pages.MatchedResultView />} />
                <Route path="/my-answer" element={<Pages.MyAnswerView />} />
                <Route path="*" element={<Pages.NotFoundView />} />
                {/* a가 b한테 공유할 링크 주소 "?category-id=1&match-user-id=" */}
                {/* a,b 모두 테스트 완료했을때 결과 url"?category-id=1?my-user-id=&match-user-id= */}
            </Routes>
        </BrowserRouter>
    );
};

export default App;
