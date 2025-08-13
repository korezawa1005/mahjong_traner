// src/pages/ResetPassword.jsx
import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import api from "../libs/api";
import Footer from "../components/Footer";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errors, setErrors] = useState([]);
  const [done, setDone] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  // クエリからトークン取得
  const token = useMemo(() => {
    const params = new URLSearchParams(location.search);
    return params.get("reset_password_token");
  }, [location.search]);

  useEffect(() => {
    if (done) navigate("/", { replace: true });
  }, [done, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    if (!token) {
      setErrors(["トークンが見つかりません。もう一度メールのリンクからアクセスしてください。"]);
      return;
    }
    if (password !== passwordConfirmation) {
      setErrors(["パスワードが一致しません。"]);
      return;
    }

    try {
      await api.put("/users/password", {
        user: {
          reset_password_token: token,
          password,
          password_confirmation: passwordConfirmation,
        },
      });
      setDone(true);
    } catch (error) {
      const resErrors = error.response?.data?.errors || ["パスワード変更に失敗しました。"];
      setErrors(resErrors);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-amber-50 text-black">
      <main className="flex-1 w-full max-w-[700px] mx-auto px-2 pt-6 pb-20 flex flex-col justify-center items-center">
        <section className="w-full bg-[#fdf7ed] border border-gray-200 rounded-2xl shadow-sm p-6 sm:p-8">
          <div className="mb-6 text-center">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">パスワード再設定</h1>
            <p className="text-sm sm:text-base text-gray-600 mt-1">
              新しいパスワードを入力してください
            </p>
          </div>

          {!token && (
            <div className="mb-6 text-sm text-red-600">
              トークンが無効です。<Link to="/forgot_password" className="underline">再送信</Link>してください。
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block">
              <span className="block text-sm font-medium text-gray-700 mb-1">新しいパスワード</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-gray-300 bg-white p-3 outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                placeholder="8文字以上を推奨"
                autoComplete="new-password"
                required
              />
            </label>

            <label className="block">
              <span className="block text-sm font-medium text-gray-700 mb-1">パスワード確認</span>
              <input
                type="password"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                className="w-full rounded-xl border border-gray-300 bg-white p-3 outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                placeholder="もう一度入力"
                autoComplete="new-password"
                required
              />
            </label>

            {errors.length > 0 && (
              <ul className="text-red-600 text-sm" aria-live="polite">
                {errors.map((err, i) => (
                  <li key={i}>・{err}</li>
                ))}
              </ul>
            )}

            <button
              type="submit"
              disabled={!token}
              className="w-full py-3 rounded-xl bg-emerald-700 text-white font-semibold hover:bg-emerald-800 disabled:opacity-60 disabled:cursor-not-allowed transition"
            >
              パスワードを変更
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-6">
            うまくいかない場合は <Link to="/login" className="underline hover:opacity-80">ログイン</Link> に戻る
          </p>
        </section>
      </main>

      <Footer isLoggedIn={false} />
    </div>
  );
};

export default ResetPassword;
