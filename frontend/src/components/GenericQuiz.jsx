import React, { useEffect, useState } from "react";
import { useLocation, useNavigate  } from "react-router-dom";
import api from "../libs/api";

const GenericQuiz = ({ category }) => {
  const { state } = useLocation();
  const { quizSessionId, quiz: initialQuiz, previous_ids: initialPreviousIds } = state || {};
  const [quiz, setQuiz] = useState(initialQuiz || null);
  const [previousIds] = useState(() =>
    Array.isArray(initialPreviousIds)
      ? initialPreviousIds.filter(id => typeof id === "number" && !isNaN(id))
      : []
  );
  
  const navigate = useNavigate(); 
  const currentCorrectCount = state?.correctCount || 0;
  useEffect(() => {
    console.log("カテゴリ:", category); 
    if (initialQuiz) return;

    api.get("/api/v1/quizzes", {
      params: { category },
    }).then((res) => {
      setQuiz(res.data);
    }).catch((err) => {
      console.error("クイズ取得失敗:", err);
    });
  },[]);

  if (!quiz) return <div>読み込み中...</div>;

  const handleTileClick = async (selectedUrl) => {
    const selectedTileObj = quiz.hand_tiles.find(tile => tile.image_url === selectedUrl);
    const selectedTileId = selectedTileObj?.id;

    if (!selectedTileId) {
      alert("牌IDが見つかりませんでした");
      return;
    }
    
    navigate("/quiz/answer",
      {
        state: {
          quiz,
          quizSessionId,
          selectedTileId,
          selectedTileUrl: selectedUrl,
          previous_ids: [...previousIds, quiz.id],
          correctCount: currentCorrectCount,
        }
      });
  };

  return (    
    <div className="min-h-screen bg-gradient-to-b from-white to-amber-50 text-black">
      <main className="flex-1 w-full mx-auto px-4 py-20 pb-24">
        <div className="flex justify-between items-center mb-4 gap-4 mt-4">
          <div className="ml-8">
            <div className="text-3xl font-bold mb-1">{quiz.category}</div>
            <div className="text-2xl text-gray-800">{quiz.round_info}</div>
          </div>

          <div className="mr-6 p-3 rounded-md bg-white shadow border w-fit">
            <div className="flex items-center">
              {[...Array(2)].map((_, i) => (
                <img key={`back-left-${i}`} src="/images/Back.png" alt="裏" className="w-14 h-18 rounded-sm" />
              ))}
              {quiz.discard_tile_urls.map((url, i) => (
                <img key={`dora-${url}-${i}`} src={url} alt="ドラ" className="w-14 h-18 border border-gray-400 rounded-sm" />
              ))}
              {[...Array(4)].map((_, i) => (
                <img key={`back-right-${i}`} src="/images/Back.png" alt="裏" className="w-14 h-18 rounded-sm" />
              ))}
            </div>
          </div>
        </div>

        <div className="p-3 bg-white rounded-md shadow border w-fit mx-auto mt-8">
          <div className="flex gap-1 justify-center">
            {quiz.hand_tile_urls.map((url, i) => (
              <img
                key={`${url}-${i}`}
                src={url}
                className="w-14 h-18 border border-gray-400 rounded-sm transition duration-150 active:shadow-lg active:border-yellow-400"
                onClick={() => handleTileClick(url)}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default GenericQuiz;
