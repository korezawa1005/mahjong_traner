import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../libs/api";


const Home = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    api.get("/api/v1/categories")
      .then(res => setCategories(res.data))
      .catch(() => alert("カテゴリ一覧の取得に失敗しました"));
  }, []);

  useEffect(() => {
    api.get("/api/v1/current_user")
      .then(res => {
        console.log('current_user:', res.data);
        setIsLoggedIn(res.data.logged_in);
      })
      .catch(() => {
        setIsLoggedIn(false);
      });
  }, []);

  const handleStartQuiz = async (category) => {
    try
    {
      const res = await api.post("/api/v1/quiz_sessions", {
        category_id: category.id
      });
      const quizSessionId = res.data.id;
      navigate(`/quiz?category=${encodeURIComponent(category.name)}`, {
        state: { quizSessionId }
      });
    } catch (err)
    {
      alert("クイズ開始に失敗しました");
    }
  };

  return (
    
    <div className="relative min-h-screen bg-white text-black flex flex-col items-center">

      <header className="text-center pt-6 mb-6">
        <h1
          className="
            font-brush
            text-4xl sm:text-5xl
            text-black           /* 白背景なので黒文字 */
            tracking-widest
          "
        >
          雀力スカウター
        </h1>
      </header>

      <main className="grid grid-cols-2 gap-x-4 gap-y-6 px-4 w-full max-w-[760px] pb-16">

        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => handleStartQuiz(c)}
            className="relative w-full bg-white rounded-xl py-6 flex flex-col items-center
                      border border-black/15 hover:bg-neutral-100
                      transition-colors duration-150 group"
          >

            <p className="font-semibold">{c.name}</p>
            <p className="text-xs text-gray-500">全10問</p>

            <span className="pointer-events-none absolute top-0 left-0 right-0 h-[2px]
                            bg-gradient-to-r from-transparent via-black/20 to-transparent
                            opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        ))}


        <nav className="flex justify-around items-center h-full w-full text-sm text-black">
          {isLoggedIn && <Link className="dock-link" to="/mypage">成績・履歴</Link>}
          <Link className="dock-link" to="/login">ログイン</Link>
          <Link className="dock-link" to="/question">ヘルプ</Link>
          <Link className="dock-link" to="/">牌姿作成</Link>
        </nav>
      </main>
    </div>
  );
}

export default Home;