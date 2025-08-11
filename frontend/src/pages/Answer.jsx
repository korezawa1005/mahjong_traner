import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../libs/api";

const normalize = (s) => (s ?? "").trim().toLowerCase();
const sameTile = (a, b) => !!a && !!b && normalize(a) === normalize(b);

const Answer = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { quizSessionId, quiz, previous_ids, selectedTileUrl, selectedTileId } = state || {};

  if (!quiz) return null;

  const isCorrect = sameTile(selectedTileUrl, quiz.correct_tile_url);
  const doraIndicators = quiz.dora_indicator_urls || quiz.discard_tile_urls || [];

  const handleSaveAnswer = async () => {
    try {
      await api.post("/api/v1/quiz_answers", {
        quiz_answer: {
          quiz_id: quiz.id,
          quiz_session_id: quizSessionId,
          selected_tile_id: selectedTileId, // 可能ならID比較/保存がベター
          correct: isCorrect,
        },
      });
    } catch (err) {
      alert("回答保存に失敗しました");
    }
  };

  const handleNext = async () => {
    await handleSaveAnswer();

    const excludeIds = Array.from(new Set([...(previous_ids || []), quiz.id].flat()))
      .filter((id) => typeof id === "number" && !isNaN(id));

    const correctCount = state?.correctCount || 0;
    const updatedCorrect = isCorrect ? correctCount + 1 : correctCount;

    if (excludeIds.length >= 3) {
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
      navigate(`/quiz?category=${encodeURIComponent(quiz.category)}`, {
        state: {
          quizSessionId,
          quiz: res.data,
          previous_ids: excludeIds,
          category: quiz.category,
          correctCount: updatedCorrect,
        },
      });
    } catch (err) {
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

  const userIsCorrect = sameTile(selectedTileUrl, quiz.correct_tile_url);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-amber-50 text-black">
      <main className="flex-1 w-full mx-auto px-4 pt-6 pb-24 pb-24">
        {/* 見出し（カテゴリ & 局面情報 + バッジ + ドラ表示牌） */}
        <div className="flex justify-between items-start mb-4 gap-4">
          <div className="ml-8">
            <div className="text-3xl font-bold mb-1">{quiz.category}</div>
            <div className="text-2xl text-gray-800">{quiz.round_info}</div>
            <span
              aria-live="polite"
              className={[
                "inline-flex items-center rounded-full px-6 py-2 text-sm font-semibold shadow border mt-4",
                isCorrect
                  ? "bg-green-50 text-green-700 border-green-200"
                  : "bg-red-50 text-red-700 border-red-200",
              ].join(" ")}
            >
              {isCorrect ? "正解" : "不正解"}
            </span>
          </div>

          <div className="mr-6 flex flex-col items-end gap-2">
            {doraIndicators.length > 0 && (
              <div className="p-2 rounded-md bg-white shadow border w-fit mt-16">
                <div className="flex items-center">
                  {[...Array(2)].map((_, i) => (
                    <img
                      key={`back-left-${i}`}
                      src="/images/Back.png"
                      alt="裏"
                      className="w-10 h-14 md:w-12 md:h-16 rounded-sm"
                    />
                  ))}
                  {doraIndicators.map((url, i) => (
                    <img
                      key={`dora-${url}-${i}`}
                      src={url}
                      alt="ドラ表示牌"
                      className="w-10 h-14 md:w-12 md:h-16 border border-gray-400 rounded-sm"
                    />
                  ))}
                  {[...Array(4)].map((_, i) => (
                    <img
                      key={`back-right-${i}`}
                      src="/images/Back.png"
                      alt="裏"
                      className="w-10 h-14 md:w-12 md:h-16 rounded-sm"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="p-3 bg-white rounded-md shadow border w-fit mx-auto mt-6">
          <div className="flex gap-1 justify-center">
            {quiz.hand_tile_urls.map((url, i) => {
              const isAnswerTile = sameTile(url, quiz.correct_tile_url);
              const isSelectedTile = sameTile(url, selectedTileUrl);

              let ringClass = "";
              if (isSelectedTile) {
                ringClass = userIsCorrect
                  ? "ring-2 ring-green-400 scale-105"
                  : "ring-2 ring-red-400"; 
              } else if (!userIsCorrect && isAnswerTile) {
                ringClass = "ring-2 ring-green-400";  
              }

              return (
                <img
                  key={`${url}-${i}`}
                  src={url}
                  alt={`手牌${i + 1}`}
                  className={[
                    "w-14 h-18 md:w-14 md:h-18 border border-gray-400 rounded-sm transition",
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

//TODO ・正解と不正解の音をたす　・進捗インジケータ　・“次へ”を下部に固定（モバイル親切）