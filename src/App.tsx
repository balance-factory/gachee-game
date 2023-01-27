import { Route, Routes } from "react-router-dom";
import * as Pages from "./pages";

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Pages.MainView />} />
            <Route path="/login" element={<Pages.LoginView />} />
        </Routes>
    );
};

export default App;
