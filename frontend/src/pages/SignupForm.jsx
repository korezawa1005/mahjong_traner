import React, { useState } from 'react';
import api from "../libs/api";  
import { FcGoogle } from 'react-icons/fc';
import { FaLine, FaXTwitter } from 'react-icons/fa6';
import { useNavigate, Link } from 'react-router-dom';


const SignupForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);


  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post(
        `${import.meta.env.VITE_API_BASE_URL}/users`,
        {
          user: {
            email,
            password,
            password_confirmation: passwordConfirmation
          }
        },
      );
      console.log('サインアップ成功:', response.data);
      navigate('/', { replace: true });
    } catch (error) {
      console.error('サインアップ失敗:', error.response?.data || error.message);
      const resErrors = error.response?.data?.errors || ['アカウント作成に失敗しました。'];
      setErrors(resErrors);
    }
    
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f6f6f6]">
      <div className="max-w-xs w-full bg-[#fdf7ed] p-6 rounded-xl shadow-md space-y-4 mt-20">
        <form onSubmit={handleSignup} className="space-y-4">
          <input
            type="email"
            placeholder="メールアドレス"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="password"
            placeholder="パスワード"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="password"
            placeholder="パスワード確認"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.length > 0 && (
            <ul className="text-red-600 mb-3 text-sm">
              {errors.map((error, idx) => (
                <li key={idx}>・{error}</li>
              ))}
            </ul>
          )}
          <button
            type="submit"
            className="w-full py-2 bg-emerald-700 text-white font-semibold rounded hover:bg-emerald-800"
          >
            サインアップ
          </button>
        </form>

        <div className="text-center text-sm text-gray-500">または</div>

        <button className="flex items-center justify-center w-full py-2 border border-green-500 rounded hover:bg-green-100">
          <FaLine className="text-green-500 mr-2" />
          <span className="text-green-700 font-semibold">LINEで登録</span>
        </button>

        <button className="flex items-center justify-center w-full py-2 border rounded hover:bg-gray-100">
          <FcGoogle className="mr-2" />
          <span className="text-gray-700 font-medium">Googleで登録</span>
        </button>

        <button className="flex items-center justify-center w-full py-2 bg-black text-white font-semibold rounded hover:bg-gray-900">
          <FaXTwitter className="mr-2" />
          <span>X で登録</span>
        </button>

        <div className="text-center text-sm text-gray-500 mt-4">
          すでにアカウントをお持ちですか？ <Link to="/login" className="underline">ログイン</Link>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
