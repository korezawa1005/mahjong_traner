// frontend/src/pages/ResetPassword.jsx
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [done, setDone] = useState(false);
  const [errors, setErrors] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (done) {
      navigate('/', { replace: true });
    }
  }, [done]);

  const params = new URLSearchParams(location.search);
  const token = params.get('reset_password_token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${import.meta.env.VITE_API_BASE_URL}/users/password`, {
        user: {
          reset_password_token: token,
          password: password,
          password_confirmation: password
        }
      }, { withCredentials: true });

      setDone(true);
      setErrors([]);
    } catch (error) {
      console.error('再設定失敗:', error.response?.data || error.message);
      const resErrors = error.response?.data?.errors || ['パスワード変更に失敗しました。'];
      setErrors(resErrors);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">パスワード再設定</h2>
        <form onSubmit={handleSubmit}>
          <label className="block mb-1">新しいパスワード</label>
          <input
            type="password"
            className="w-full p-2 border border-gray-300 rounded mb-3"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {/* エラーメッセージ表示 */}
          {errors.length > 0 && (
            <ul className="text-red-600 mb-3 text-sm">
              {errors.map((error, idx) => (
                <li key={idx}>・{error}</li>
              ))}
            </ul>
          )}
          <button className="w-full bg-emerald-700 text-white p-2 rounded">
            パスワードを変更
          </button>
        </form>
    </div>
  );
};

export default ResetPassword;
