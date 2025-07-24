import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../libs/api";
import { FaUser, FaBook, FaPen, FaChartLine } from "react-icons/fa";

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
    
<div className="min-h-screen bg-gradient-to-b from-white to-amber-50 text-black">
{/* ヘッダー */}
  <header className="text-center mt-4 mb-2">
  <h1 className="text-4xl sm:text-6xl font-brush tracking-widest">雀力スカウター</h1>
</header>

  {/* メイン（高さ調整可能） */}
  <main className="flex-1 w-full max-w-[700px] mx-auto px-2 py-2 pb-20 flex flex-col justify-center items-center">

    {/* 上段：3列 */}
    <div className="grid grid-cols-3 gap-4 mb-4 w-full">
  {categories.slice(0, 3).map((c) => (
    <button
      key={c.id}
      onClick={() => handleStartQuiz(c)}
      className="bg-gray-100 hover:bg-gray-200 rounded-xl py-7 px-4 border border-gray-300 shadow-sm flex flex-col items-center justify-center transition duration-150"
    >
      <p className="font-semibold text-lg sm:text-xl">{c.name}</p>
      <p className="text-sm sm:text-base text-gray-500">全10問</p>
    </button>
  ))}
</div>

    {/* 下段：2列 */}
    <div className="grid grid-cols-2 gap-4 w-full">
  {categories.slice(3, 5).map((c) => (
    <button
      key={c.id}
      onClick={() => handleStartQuiz(c)}
      className="bg-gray-100 hover:bg-gray-200 rounded-xl py-7 px-4 border border-gray-300 shadow-sm flex flex-col items-center justify-center transition duration-150"
    >
      <p className="font-semibold text-lg sm:text-xl">{c.name}</p>
      <p className="text-sm sm:text-base text-gray-500">全10問</p>
    </button>
  ))}
</div>
  </main>

  {/* フッター */}
  <div className="w-screen fixed bottom-0 left-0">
  <footer className="bg-black text-white py-4">
    <div className="max-w-[700px] px-4 mx-auto flex justify-between text-xs">
      {isLoggedIn ? (
        <Link to="/mypage" className="flex flex-col items-center hover:opacity-80">
          <FaUser className="text-lg mb-1" />
          マイページ
        </Link>
      ) : (
        <div className="flex flex-col items-center text-gray-400 cursor-not-allowed">
          <FaUser className="text-lg mb-1" />
          マイページ
        </div>
      )}
      <Link to="/question" className="flex flex-col items-center hover:opacity-80">
        <FaBook className="text-lg mb-1" />
        ヘルプ
      </Link>
      <Link to="/login" className="flex flex-col items-center hover:opacity-80">
        <FaPen className="text-lg mb-1" />
        ログイン
      </Link>
      <Link to="/chart" className="flex flex-col items-center hover:opacity-80">
        <FaChartLine className="text-lg mb-1" />
        チャート
      </Link>
    </div>
  </footer>
      </div>
      </div>

  );
};



export default Home;