// frontend/src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import LoginForm from './pages/LoginForm';
import SignupForm from './pages/SignupForm';
import RequestResetPassword from './pages/RequestResetPassword';
import ResetPassword from './pages/ResetPassword';
import Quiz from './pages/Quiz';
import Answer from './pages/Answer';


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
      </Routes>
    </BrowserRouter>
  );
};

export default App;
