import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../libs/api";


const Answer = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { quizSessionId, quiz, previous_ids, selectedTileUrl, selectedTileId } = state;
  const isCorrect = selectedTileUrl === quiz.correct_tile_url;

  const handleSaveAnswer = async () => {
    try {
      await api.post("/api/v1/quiz_answers", {
        quiz_answer: {
          quiz_id: quiz.id,
          quiz_session_id: quizSessionId,
          selected_tile_id: selectedTileId,
          correct: isCorrect,
        //   user_id: userId, 
        //   quiz_session_id: quizSessionId 
        },        
      });
    } catch (err) {
      alert("回答保存に失敗しました");
    }
  };

  const handleNext = async () => {
    await handleSaveAnswer();
    const excludeIds = Array.from(new Set(
      [...(previous_ids || []), quiz.id].flat()
    )).filter(id => typeof id === "number" && !isNaN(id));
    const correctCount = state?.correctCount || 0;
    const updatedCorrect = isCorrect ? correctCount + 1 : correctCount;

    if (excludeIds.length >= 3)
    {           
      navigate("/quiz/result", {
        state: {
          quizSessionId,
          total: excludeIds.length,
          category: quiz.category,
          correctCount: updatedCorrect,
        },
      });
      return;
    }

  try {
    const res = await api.get("/api/v1/quizzes", {
      params: {
        category: quiz.category,
        exclude_ids: excludeIds.join(","),
      },
    });
    navigate(`/quiz?category=${encodeURIComponent(quiz.category)}`,
      {
        state: {
          quizSessionId,
          quiz: res.data,
          previous_ids: excludeIds,
          category: quiz.category,
          correctCount: updatedCorrect,
        }
      });
  } catch (err)
  {
    console.log(err.response?.status)
    if (err.response?.status === 404) {
      navigate("/quiz/result", {
        state: {
          quizSessionId,
          total: excludeIds.length, 
          category: quiz.category,
          correctCount: updatedCorrect,
        },
      });
    } else {
      console.error("クイズ取得失敗:", err);
    }
  }
};

  return (
    <div className="max-w-md mx-auto bg-yellow-50 p-4 rounded-md shadow">
      <p className="text-center font-semibold text-lg mb-2">{quiz.round_info}</p>

      <div className="flex justify-center gap-1 bg-white p-2 rounded">
        {quiz.hand_tile_urls.map((url, i) => (
          <img
            key={`${url}-${i}`}
            src={url}
            className="w-8 border border-gray-300 rounded"
          />
        ))}
      </div>

      <div className="text-center mt-4">
        <p className="text-sm">答え：</p>
          <div className="inline-block text-xl font-bold border border-gray-400 bg-white px-3 py-1 mt-1 rounded">
            <img
              src={quiz.correct_tile_url.trim()}
              className="w-8 inline"
            />
          </div>
      </div>

      <div className="mt-4 bg-white p-3 text-center rounded border border-gray-200">
        <p className="text-sm text-gray-700">{quiz.explanation}</p>
      </div>

      <div className="mt-6 text-center">
        <button
          onClick={handleNext}
          className="bg-white border border-gray-400 px-6 py-2 rounded shadow hover:bg-gray-100"
        >
          次へ
        </button>
      </div>
    </div>
  );
};

export default Answer;
