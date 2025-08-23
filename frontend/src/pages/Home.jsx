import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../libs/api";
import Header from '../components/Header';
import Footer from '../components/Footer';

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
      .then(res => {
        setSearchResults(res.data);
      })
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

    <div className="min-h-screen bg-gradient-to-b from-white to-amber-50 text-black flex flex-col lg:mt-14">

      <Header
        isReviewer={isReviewer}
        showReviewerSearch={showReviewerSearch}
        setShowReviewerSearch={setShowReviewerSearch}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        searchResults={searchResults}
      />

      <main
        className="
          flex-1 w-full max-w-[700px] lg:max-w-[1200px]  /* PCで横幅少し広げる */
          mx-auto px-2 py-2 pb-20
          flex flex-col items-center justify-center
          lg:justify-start lg:mt-8 lg:pb-8
        "
      >
        <div className="grid grid-cols-2 gap-4 lg:gap-8 w-full">
          {categories.slice(0, 2).map((c) => (
            <button
              key={c.id}
              onClick={() => handleStartQuiz(c)}
              className="bg-gray-100 hover:bg-gray-200 rounded-xl border border-gray-300 shadow-sm
                transition duration-150
                flex flex-col items-center justify-center
                py-7 px-4
                lg:py-10 lg:px-6 lg:h-[200px] lg:rounded-2xl lg:shadow-md lg:gap-1
              "
            >
              <p className="font-semibold text-lg sm:text-xl lg:text-4xl">{c.name}</p>
              <p className="text-sm sm:text-base lg:text-2xl text-gray-500 mt-1">全10問</p>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-2 lg:gap-4 mb-4 w-full mt-6">
          {categories.slice(2, 5).map((c) => (
            <button
              key={c.id}
              // onClick={() => handleStartQuiz(c)}
              className="
              bg-gray-100 hover:bg-gray-200 rounded-xl border border-gray-300 shadow-sm
                transition duration-150
                flex flex-col items-center justify-center
                py-7 px-4
                lg:py-14 lg:px-10 lg:h-[200px] lg:rounded-3xl lg:shadow-lg lg:gap-1
              "
            >
              <p className="font-semibold text-lg sm:text-xl lg:text-4xl">{c.name} 準備中</p>
              <p className="text-sm sm:text-base lg:text-2xl text-gray-500 mt-1">全10問</p>
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
      <Footer />
    </div>
  );
};

export default Home;