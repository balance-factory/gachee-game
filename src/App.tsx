import { Route, Routes } from "react-router-dom";
import * as Pages from "./pages";

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Pages.MainView />} />
            <Route path="/login" element={<Pages.LoginView />} />
            <Route path="/guide" element={<Pages.GuideView />} />
            <Route path="/category" element={<Pages.CategoryView />} />
            <Route path="/question" element={<Pages.QuestionView />} /> // 카테고리Id, 문제Id는 쿼리로
            <Route path="/match-list/:userId" element={<Pages.MatchListView />} />
            <Route path="/result/:userAId/:userBId" element={<Pages.ResultView />} />
            <Route path="/answer/:userId" element={<Pages.ResultView />} />
        </Routes>
    );
};

export default App;
