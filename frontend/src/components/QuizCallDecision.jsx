import React, { useEffect, useState } from "react";
import { useLocation, useNavigate  } from "react-router-dom";
import axios from "axios";

const QuizCallDecision = (props) => {
  const { state } = useLocation();
  const { quiz: initialQuiz, previous_ids: initialPreviousIds } = state || {};
  const [quiz, setQuiz] = useState(initialQuiz || null);
  const [previousIds] = useState(() =>
    Array.isArray(initialPreviousIds)
      ? initialPreviousIds.filter(id => typeof id === "number" && !isNaN(id))
      : []
  );
  const { category } = props;
  
  const navigate = useNavigate(); //navigateさせたいなら一旦定義しないと使えない
  const currentCorrectCount = state?.correctCount || 0;
  useEffect(() => {
    console.log("カテゴリ:", category); 
    if (initialQuiz) return;

    axios.get("http://localhost:3000/api/v1/quizzes", {
      params: { category },
      withCredentials: true
    }).then((res) => {
      setQuiz(res.data);
    }).catch((err) => {
      console.error("クイズ取得失敗:", err);
    });
  },[]);

  if (!quiz) return <div>読み込み中...</div>;

  const handleTileClick = (selectedUrl) => {
    navigate("/quiz/answer",
      {
        state: {
          quiz,
          selectedTileUrl: selectedUrl,
          previous_ids: [...previousIds, quiz.id],
          correctCount: currentCorrectCount,
        }
      });
  };

  return (
    
    <div className="p-4">
      <div className="text-lg font-bold">{quiz.category}</div>
      <div className="text-md mt-2">{quiz.round_info}</div>

      <div className="mt-4 flex items-center gap-2 bg-neutral-200 p-2 rounded-md">
        <span className="text-black font-medium">ドラ：</span>
        {quiz.discard_tile_urls.map((url, i) => (
          <img
            key={`${url}-${i}`}
            src={url}
            className="w-10 border border-white rounded-sm bg-white"
          />
        ))}
      </div>
  
      <div className="mt-4 flex gap-1 bg-neutral-200 p-2 rounded-md">
        {quiz.hand_tile_urls.map((url, i) => (
          <img
            key={`${url}-${i}`} //key={i}はアンチパターン Reactの性質上、順番が変わると誤認識する可能性あり　url + index　で一意のkeyを作成
            src={url}
            className="w-10 border border-white hover:border-red-500 rounded-sm bg-white cursor-pointer"
            onClick={() => handleTileClick(url)} 
          />
        ))}
      </div>
    </div>
  );
};

export default QuizCallDecision;