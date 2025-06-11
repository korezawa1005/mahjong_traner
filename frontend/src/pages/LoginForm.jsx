import React, { useState } from 'react';
import axios from 'axios';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
        { withCredentials: true } 
      );
      console.log('ログイン成功:', response.data); //response.dataによってRailsが返したJSON形式のデータを返す
    } catch (error) {
      console.error('ログイン失敗:', error.response?.data || error.message); //401 Unauthorized(Rails)かNetwork Error(JS)を返す
    }
  };

  return (
    <form onSubmit={handleLogin}> 
      <input
        type="email"
        placeholder="メールアドレス"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="パスワード"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">ログイン</button>
    </form>
  );
};

export default LoginForm;
