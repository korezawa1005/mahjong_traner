import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import LoginForm from './pages/LoginForm';
import SignupForm from './pages/SignupForm';
import RequestResetPassword from './pages/RequestResetPassword';
import ResetPassword from './pages/ResetPassword';
import Quiz from './pages/Quiz';
import Answer from './pages/Answer';
import Result from "./pages/Result";
import Mypage from "./pages/MyPage";
import QuizHistoryDetail from "./pages/QuizHistoryDetail";
import UserPage from "./pages/UserPage";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/sign_up" element={<SignupForm />} />
        <Route path="/password/forgot" element={<RequestResetPassword />} />
        <Route path="/password/reset" element={<ResetPassword />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/quiz/answer" element={<Answer />} />
        <Route path="/quiz/result" element={<Result />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/users/:id" element={<UserPage />} />
        <Route path="/quiz/history/:sessionId" element={<QuizHistoryDetail />} />
        <Route path="/quiz/history/:userId/:sessionId" element={<QuizHistoryDetail />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
