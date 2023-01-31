import { Route, Routes } from "react-router-dom";
import * as Pages from "./pages";
import { useEffect } from "react";




const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Pages.MainView />} />
            <Route path="/login" element={<Pages.LoginView />} />
            <Route path="/guide" element={<Pages.GuideView />} />
            <Route path="/category" element={<Pages.CategoryView />} />
            <Route path="/question/:categoryId" element={<Pages.QuestionView />} /> // 카테고리Id, 문제Id는 쿼리로
            <Route path="/match-list" element={<Pages.MatchListView />} />
            <Route path="/result" element={<Pages.ResultView />} />
            <Route path="/answer" element={<Pages.ResultView />} />
            {/* 링크 공유주소 "?requester-id=&participater-id=" */}
        </Routes>
    );
};

export default App;
