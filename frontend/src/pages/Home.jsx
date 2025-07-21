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
    
    <div className="relative min-h-screen bg-black text-white flex flex-col items-center">
      <header className="text-center pt-6 mb-6">
        <h1
          className="
            font-brush      
            text-4xl sm:text-5xl
            text-white
            tracking-widest
            drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]
          "
        >
          雀力スカウター
        </h1>
      </header>

      <main className="grid grid-cols-2 gap-x-4 gap-y-6 px-4 w-full max-w-[760px] pb-4">
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => handleStartQuiz(c)}
            className="relative w-full bg-neutral-900 rounded-xl py-6 flex flex-col items-center
                      hover:bg-neutral-800 transition group"
          >
            {/* 牌アイコン＆テキスト */}
            <span className="text-3xl mb-1 select-none"></span>
            <p className="font-semibold">{c.name}</p>
            <p className="text-xs text-gray-400">全10問</p>

            {/* 赤レーザーライン（hover）*/}
            <span className="pointer-events-none absolute top-0 left-0 right-0 h-[2px]
                            bg-gradient-to-r from-transparent via-red-600 to-transparent
                            opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
          ))}

        {/* ── ここが右列最下段に入る ── */}
        <nav className="flex justify-around items-center h-full w-full text-sm text-gray-300">
          {isLoggedIn && (
            <Link to="/mypage" className="dock-link">成績・履歴</Link>
          )}
          <Link to="/login"  className="dock-link">ログイン</Link>
          <Link to="/question" className="dock-link">ヘルプ</Link>
          <Link to="/stats" className="dock-link"></Link>
        </nav>
      </main>
    </div>
  );
}

export default Home;