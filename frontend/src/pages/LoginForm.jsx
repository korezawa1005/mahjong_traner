import React, { useState } from 'react';
import axios from 'axios';
import { FcGoogle } from 'react-icons/fc';
import { FaLine, FaXTwitter } from 'react-icons/fa6';
import { useNavigate, Link } from 'react-router-dom';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => { //asyncによって非同期関数であることを宣言
    e.preventDefault(); //フォームのデフォルト動作（ページのリロード）をキャンセル。ReactでAPI通信だけで完結させたいから必要
    try {
      const response = await axios.post( //axiosはHTTPクライアントライブラリ。awaitにより、リクエストの処理が完了するまで待機して次の行に進む
        'http://localhost:3000/users/sign_in', //第1引数としてRailsのAPIエンドポイントを指定
        {
          user: {
            email,
            password
          } //Rails（Devise）が期待するリクエスト形式。user[email]とuser[password]としてRails側が受け取る。
        },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        }
      );
      console.log('ログイン成功:', response.data); //response.dataによってRailsが返したJSON形式のデータを返す
      navigate('/');
    } catch (error) {
      console.error('ログイン失敗:', error.response?.data || error.message); //401 Unauthorized(Rails)かNetwork Error(JS)を返す
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f6f6f6]">
      <div className="max-w-xs w-full bg-[#fdf7ed] p-6 rounded-xl shadow-md space-y-4 mt-20">
        <form onSubmit={handleLogin} className="space-y-4">
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
          <button
            type="submit"
            className="w-full py-2 bg-emerald-700 text-white font-semibold rounded hover:bg-emerald-800"
          >
            ログイン
          </button>
        </form>

        <div className="text-center text-sm text-gray-500">または</div>

        <button className="flex items-center justify-center w-full py-2 border border-green-500 rounded hover:bg-green-100">
          <FaLine className="text-green-500 mr-2" />
          <span className="text-green-700 font-semibold">LINEでログイン</span>
        </button>

        <button className="flex items-center justify-center w-full py-2 border rounded hover:bg-gray-100">
          <FcGoogle className="mr-2" />
          <span className="text-gray-700 font-medium">Googleでログイン</span>
        </button>

        <button className="flex items-center justify-center w-full py-2 bg-black text-white font-semibold rounded hover:bg-gray-900">
          <FaXTwitter className="mr-2" />
          <span>X でログイン</span>
        </button>

        <div className="text-center text-sm text-gray-500 mt-4">
          アカウントをお持ちでないですか？ <Link to="/sign_up" className="underline">サインアップ</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
