import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaLine } from "react-icons/fa6";
import api from "../libs/api";
import Footer from "../components/Footer";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleGoogleLogin = () => {
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    if (!baseUrl) {
      alert("Googleログインの設定が完了していません。");
      return;
    }
    window.location.href = `${baseUrl}/users/auth/google_oauth2`;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrors([]);

    try {
      const res = await api.post("/users/sign_in", { user: { email, password } });
      const token = res.headers["authorization"];
      if (token) localStorage.setItem("jwt", token);

      navigate("/", { replace: true });
    } catch (error) {
      const resErrors = error.response?.data?.errors || ["ログインに失敗しました。"];
      setErrors(resErrors);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-amber-50 text-black">
      <main className="flex-1 w-full max-w-[700px] mx-auto px-2 pt-6 pb-20 flex flex-col justify-center items-center">
        <section className="w-full bg-[#fdf7ed] border border-gray-200 rounded-2xl shadow-sm p-6 sm:p-8">
          <div className="mb-6 text-center">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">ログイン</h1>
            <p className="text-sm sm:text-base text-gray-600 mt-1">
              メールアドレスとパスワードでサインイン
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <label className="block">
              <span className="block text-sm font-medium text-gray-700 mb-1">メールアドレス</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-gray-300 bg-white p-3 outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                placeholder="you@example.com"
                autoComplete="email"
                required
              />
            </label>

            <label className="block">
              <span className="block text-sm font-medium text-gray-700 mb-1">パスワード</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-gray-300 bg-white p-3 outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                placeholder="••••••••"
                autoComplete="current-password"
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
              className="w-full py-3 rounded-xl bg-emerald-700 text-white font-semibold hover:bg-emerald-800 transition"
            >
              ログイン
            </button>
            <p className="text-center text-sm text-gray-600 mt-6">
            <Link to="/password/forgot" className="underline hover:opacity-80">
              パスワード忘れた？
            </Link>
          </p>
          </form>

          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="px-3 text-sm text-gray-500">または</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          <div className="space-y-3">
            <button className="w-full py-3 rounded-xl border border-green-500 bg-white hover:bg-green-50 transition flex items-center justify-center gap-2">
              <FaLine className="text-green-500" />
              <span className="text-green-700 font-semibold">LINEでログイン</span>
            </button>

            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full py-3 rounded-xl border bg-white hover:bg-gray-50 transition flex items-center justify-center gap-2"
            >
              <FcGoogle />
              <span className="text-gray-700 font-medium">Googleでログイン</span>
            </button>
          </div>

          <p className="text-center text-sm text-gray-600 mt-6">
            アカウントをお持ちでないですか？{" "}
            <Link to="/sign_up" className="underline hover:opacity-80">
              サインアップ
            </Link>
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Login;
