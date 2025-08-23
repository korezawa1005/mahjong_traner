import React, { useState } from "react";
import { Link } from "react-router-dom";
import api from "../libs/api";
import Footer from "../components/Footer";

const RequestResetPassword = () => {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    try {
      await api.post("/users/password", { user: { email } });
      setSent(true);
    } catch (error) {
      if (error.response) {
        setSent(true);
      } else {
        const resErrors = error.message ? [error.message] : ["メール送信に失敗しました。"];
        setErrors(resErrors);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-amber-50 text-black">
      <main className="flex-1 w-full max-w-[700px] mx-auto px-2 pt-6 pb-20 flex flex-col justify-center items-center">
        <section className="w-full bg-[#fdf7ed] border border-gray-200 rounded-2xl shadow-sm p-6 sm:p-8">
          {!sent ? (
            <>
              <div className="mb-6 text-center">
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">パスワード再設定</h1>
                <p className="text-sm sm:text-base text-gray-600 mt-1">
                  登録メールアドレスを入力してください。再設定用リンクを送信します。
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
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
                  送信
                </button>
              </form>

              <p className="text-center text-sm text-gray-600 mt-6">
                <Link to="/" className="underline hover:opacity-80">
                  ホームに戻る
                </Link>
              </p>
              <p className="text-center text-sm text-gray-600 mt-6">
                アカウントをお持ちでないですか？{" "}
                <Link to="/sign_up" className="underline hover:opacity-80">
                  サインアップ
                </Link>
              </p>
            </>
          ) : (
            <div className="text-center">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">メールを送信しました</h2>
              <p className="text-sm sm:text-base text-gray-700">
                入力されたアドレス宛にパスワード再設定の手順を送信しました。
                受信トレイに見当たらない場合は、迷惑メールフォルダもご確認ください。
              </p>
              <div className="mt-6">
                <Link
                  to="/login"
                  className="inline-block px-5 py-3 rounded-xl bg-emerald-700 text-white font-semibold hover:bg-emerald-800 transition"
                >
                  ログイン画面へ戻る
                </Link>
              </div>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default RequestResetPassword;

// TODO パスワードリセットした後にそのままログインした方がUX的には良さそう