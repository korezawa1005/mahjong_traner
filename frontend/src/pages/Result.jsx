import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../libs/api";


const Result = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const total = state?.total || 0;
  const category = state?.category || "未分類";
  const correct = state?.correctCount || 0;
  const quizSessionId = state?.quizSessionId;

  useEffect(() => {
    const updateQuizSession = async () => {
      if (!quizSessionId) {
        console.error('QuizSessionId is missing');
        return;
      }

      try {
        console.log('Updating QuizSession:', { quizSessionId, correct });
        
        const response = await api.put(`/api/v1/quiz_sessions/${quizSessionId}`, {
          correct_count: correct
        });
        
        console.log('QuizSession updated successfully:', response.data);
      } catch (error) {
        console.error('Failed to update QuizSession:', error);
      }
    };

    // correctが0以上の場合にのみ更新
    if (quizSessionId && correct >= 0) {
      updateQuizSession();
    }
  }, [quizSessionId, correct]);
  
  
  const getMessage = () => {
    if (total === 0) return "問題が表示されませんでした。";
    const rate = correct / total;
    if (rate === 1) return "🎉 全問正解！完璧です！";
    if (rate >= 0.7) return "👍 よくできました！あと少し！";
    if (rate >= 0.4) return "📘 もう一歩！がんばろう！";
    return "😢 難しかった？もう一度チャレンジしよう！";
  };

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="text-center mt-10 space-y-6">
      <h2 className="text-2xl font-bold">結果発表！</h2>
      <p className="text-lg">{category} に挑戦した結果です 🎯</p>
      <p className="text-md">出題数: {total} 問</p>
      <p className="text-md">正解数: {correct} 問</p> 
      <p className="text-lg font-semibold mt-4">{getMessage()}</p>

      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={handleGoHome}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          トップへ戻る
        </button>
      </div>
    </div>
  );
};

export default Result;
