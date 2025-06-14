// frontend/src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import LoginForm from './pages/LoginForm';
import RegisterForm from './pages/RegisterForm';
import RequestResetPassword from './pages/RequestResetPassword';
import ResetPassword from './pages/ResetPassword';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/sign_up" element={<RegisterForm />} />
        <Route path="/password/forgot" element={<RequestResetPassword />} />
        <Route path="/password/reset" element={<ResetPassword />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
