import * as Pages from "./pages";
import { BrowserRouter, Router, Route, Routes } from "react-router-dom";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Pages.MainView />} />
                <Route path="/login" element={<Pages.LoginView />} />
                <Route path="/menual" element={<Pages.MenualView />} />
                <Route path="/category" element={<Pages.CategoryView />} />

                <Route path="/question/*" element={<Pages.QuestionView />} />

                <Route path="/match-list" element={<Pages.MatchListView />} />
                <Route path="/result" element={<Pages.ResultView />} />
                <Route path="/answer" element={<Pages.ResultView />} />
                {/* 링크 공유주소 "?requester-id=&participater-id=" */}
            </Routes>
        </BrowserRouter>
    );
};

export default App;
