import React, { useState } from 'react';
import axios from 'axios';

const RequestResetPassword = () => {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/users/password', {
        user: { email }
      }, { withCredentials: true });

      setSent(true);
    } catch (error) {
      console.error('メール送信失敗:', error.response?.data || error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">パスワード再設定</h2>
      {sent ? (
        <p className="text-green-600">メールを送信しました。ご確認ください。</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <label className="block mb-1">メールアドレス</label>
          <input
            type="email"
            className="w-full p-2 border border-gray-300 rounded mb-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button className="w-full bg-emerald-700 text-white p-2 rounded">
            送信
          </button>
        </form>
      )}
    </div>
  );
};

export default RequestResetPassword;