import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import QuestionnairePage from "./pages/QuestionnairePage";
import SignUp from "./components/SignUp"; 
import QuestionList from "./components/QuestionList";
import LandingPage from "./components/LandingPage";
import SecureTransactions from "./components/SecureTransactions";
import UserFriendlyInterface from "./components/UserFriendlyInterface";
import GlobalAccess from "./components/GlobalAccess";
import Manager from "./components/Manager";
import Driver from "./components/Driver";

const App = () => {
    return (
        <Router>
            <Navbar /> {/* Only render Navbar once in the layout */}
            <Routes>
                <Route path="/" element={<LandingPage />} /> 
                <Route path="/login" element={<LoginPage />} />
                <Route path="/questionnaire" element={<QuestionnairePage />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/questions" element={<QuestionList />} />
                <Route path="/features/secure-transactions" element={<SecureTransactions />} />
                <Route path="/features/user-friendly-interface" element={<UserFriendlyInterface />} />
                <Route path="/features/global-access" element={<GlobalAccess />} />
                <Route path="/manager" element={<Manager />} />
                <Route path="/driver" element={<Driver />} />
            </Routes>
        </Router>
    );
};

export default App;
