// frontend/src/pages/ResetPassword.jsx
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [done, setDone] = useState(false);
  const location = useLocation();

  // トークンは URLパラメータ（例: ?reset_password_token=xxxx）から取得
  const params = new URLSearchParams(location.search);
  const token = params.get('reset_password_token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put('http://localhost:3000/users/password', {
        user: {
          reset_password_token: token,
          password: password,
          password_confirmation: password
        }
      }, { withCredentials: true });

      setDone(true);
    } catch (error) {
      console.error('再設定失敗:', error.response?.data || error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">パスワード再設定</h2>
      {done ? (
        <p className="text-green-600">パスワードを変更しました。ログインしてください。</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <label className="block mb-1">新しいパスワード</label>
          <input
            type="password"
            className="w-full p-2 border border-gray-300 rounded mb-3"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="w-full bg-emerald-700 text-white p-2 rounded">
            パスワードを変更
          </button>
        </form>
      )}
    </div>
  );
};

export default ResetPassword;
