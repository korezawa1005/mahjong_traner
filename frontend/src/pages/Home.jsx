import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../libs/api";
import { FaUser, FaBook, FaPen, FaBookOpen, FaSearch, FaTimes } from "react-icons/fa";

const Home = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const isReviewer = user && ['reviewer', 'admin'].includes(user.role);
  const [showReviewerSearch, setShowReviewerSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

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
      if (res.data.logged_in) {
        setUser(res.data.user); 
      } else {
        setUser(null);
      }
      })
      .catch(() => {
        setIsLoggedIn(false);
        setUser(null);
      });
  }, []);

  useEffect(() => {
    if (!showReviewerSearch || searchTerm.trim() === '') {
      setSearchResults([]);
      return;
    }
  
    const delayDebounce = setTimeout(() => {
      api.get(`/api/v1/users/search?query=${encodeURIComponent(searchTerm)}`)
        .then(res => setSearchResults(res.data))
        .catch(() => setSearchResults([]));
    }, 400);
  
    return () => clearTimeout(delayDebounce);
  }, [searchTerm, showReviewerSearch]);

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
      <header className="text-center mt-4 mb-2">
  <h1 className="text-4xl sm:text-6xl font-brush tracking-widest">雀力スカウター</h1>

  {isReviewer && (
    <div className="absolute top-0 right-4">
      {/* 🔸 検索ボタン (showReviewerSearch=false のとき) */}
      {!showReviewerSearch ? (
        <button
          onClick={() => setShowReviewerSearch(true)}   
          className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all duration-200 flex items-center justify-center"
          title="ユーザー検索"
        >
          <FaSearch className="text-sm" />
        </button>
      ) : (
        /* 🔸 検索モーダル (showReviewerSearch=true のとき) */
        <div className="bg-white rounded-lg shadow-xl p-4 w-80 border border-gray-200 relative">
          {/* モーダルヘッダー */}
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold text-gray-800 text-sm">ユーザー検索</h3>
            <button
              onClick={() => { setShowReviewerSearch(false); setSearchTerm(''); }}
              className="text-gray-500 hover:text-gray-700 p-1"
            >
              <FaTimes className="text-sm" />
            </button>
          </div>

          {/* 入力欄 */}
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="メールアドレスで検索..."
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            autoFocus
          />

          {/* 検索結果リスト */}
          <div className="mt-3 pt-3 border-t border-gray-100">
            {searchResults.length > 0 ? (
              <ul className="max-h-60 overflow-y-auto text-sm">
                {searchResults.map(user => (
                  <li
                    key={user.email}
                    className="py-1 px-2 hover:bg-gray-100 cursor-pointer rounded"
                    onClick={() => {
                      console.log("クリックされた", user.email);
                      alert(`${user.email} をクリック`);
                    }}
                    style={{
                      position: "relative",
                      zIndex: 9999
                    }}
                  >
                    {user.email}
                  </li>
                ))}
              </ul>
            ) : (
              searchTerm.trim() && (
                <div className="text-gray-500 text-sm">該当ユーザーが見つかりません</div>
              )
            )}
          </div>
        </div>
      )}
    </div>
  )}
</header>

      <main className="flex-1 w-full max-w-[700px] mx-auto px-2 py-2 pb-20 flex flex-col justify-center items-center">
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

      {showReviewerSearch && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-25 z-40"
          onClick={() => setShowReviewerSearch(false)}
        />
      )}

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
            <Link to="/login" className="flex flex-col items-center hover:opacity-80">
              <FaPen className="text-lg mb-1" />
              ログイン
            </Link>
            <Link to="/question" className="flex flex-col items-center hover:opacity-80">
              <FaBook className="text-lg mb-1" />
              ヘルプ
            </Link>
            <Link to="" className="flex flex-col items-center hover:opacity-80">
              <FaBookOpen className="text-lg mb-1" />
              問題一覧
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
};



export default Home;