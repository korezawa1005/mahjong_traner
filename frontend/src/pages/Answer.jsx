import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../libs/api";

const normalize = (s) => (s ?? "").trim().toLowerCase();
const sameTile = (a, b) => !!a && !!b && normalize(a) === normalize(b);

const Answer = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { quizSessionId, quiz, previous_ids, selectedTileUrl, selectedTileId } = state;
  const isCorrect = sameTile(selectedTileUrl, quiz.correct_tile_url);

  const handleSaveAnswer = async () => {
    
    try {
      await api.post("/api/v1/quiz_answers", {
        quiz_answer: {
          quiz_id: quiz.id,
          quiz_session_id: quizSessionId,
          selected_tile_id: selectedTileId,
          correct: isCorrect,
        },        
      });
    } catch (err) {
      alert("回答保存に失敗しました");
    }
  };

  const handleNext = async () => {
    await handleSaveAnswer();

    const excludeIds = Array.from(
      new Set([...(previous_ids || []), quiz.id].flat())
    ).filter((id) => typeof id === "number" && !isNaN(id));

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
    <div className="min-h-screen bg-gradient-to-b from-white to-amber-50 text-black">
      <main className="flex-1 w-full mx-auto px-4 py-20 pb-24">
        {/* 見出し（カテゴリ & 局面情報 + 結果バッジ） */}
        <div className="flex justify-between items-start mb-4 gap-4 mt-4">
          <div className="ml-8">
            <div className="text-3xl font-bold mb-1">{quiz.category}</div>
            <div className="text-2xl text-gray-800">{quiz.round_info}</div>
          </div>

          <div className="mr-6">
            <span
              aria-live="polite"
              className={[
                "inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold shadow border",
                isCorrect
                  ? "bg-green-50 text-green-700 border-green-200"
                  : "bg-red-50 text-red-700 border-red-200",
              ].join(" ")}
            >
              {isCorrect ? "正解！" : "不正解"}
            </span>
          </div>
        </div>

        {/* 手牌（正解＆選択をハイライト） */}
        <div className="p-3 bg-white rounded-md shadow border w-fit mx-auto mt-6">
          <div className="flex gap-1 justify-center">
            {quiz.hand_tile_urls.map((url,i) => {
              const isAnswer = sameTile(url, quiz.correct_tile_url);
              const isSelected = sameTile(url, selectedTileUrl);

              // 優先度: 正解かつ選択(=正解) → 緑、選択だけ(不正解) → 赤、正解だけ → アンバー
              const ringClass = isSelected && isAnswer
                ? "ring-2 ring-green-400 scale-105"
                : isSelected && !isAnswer
                ? "ring-2 ring-red-400"
                : isAnswer
                ? "ring-2 ring-amber-400"
                : "";

              return (
                <img
                  key={`${url}-${i}`}
                  src={url}
                  alt={`手牌${i + 1}`}
                  className={[
                    "w-12 h-16 md:w-14 md:h-18 border border-gray-400 rounded-sm transition",
                    ringClass,
                  ].join(" ")}
                />
              );
            })}
          </div>
        </div>         

        <div className="mt-6 bg-white p-4 rounded-md shadow border max-w-3xl mx-auto">
          <div className="text-base leading-relaxed text-gray-800 whitespace-pre-wrap">
            {quiz.explanation}
          </div>
        </div>

        <div className="mt-8 flex justify-center gap-3">
          <button
            onClick={handleNext}
            className="bg-white border border-gray-400 px-6 py-2 rounded shadow hover:bg-gray-100 active:shadow-lg"
          >
            次へ
          </button>
        </div>
      </main>
    </div>
  );
};

export default Answer;
