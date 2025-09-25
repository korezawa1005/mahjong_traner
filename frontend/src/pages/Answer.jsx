import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../libs/api";
import AcceptTilesList from "../components/AcceptTilesList";
import TableStateCard from "../components/TableStateCard";
import { DECISION_LABELS } from "../components/DecisionButtons";


const normalize = (s) => (s ?? "").trim().toLowerCase();
const sameTile = (a, b) => !!a && !!b && normalize(a) === normalize(b);

const Answer = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { quizSessionId, quiz, previous_ids, selectedTileUrl, selectedTileId, selectedDecision } = state || {};
  const [detail, setDetail] = useState(null); 

  const acceptItems = (() => {
    if (!detail) return [];
    if (Array.isArray(detail.accept_tiles_expanded)) return detail.accept_tiles_expanded;
    if (detail.accept_tiles && typeof detail.accept_tiles === "object") {
      return Object.entries(detail.accept_tiles).map(([name, count]) => ({
        name,
        count: Number(count) || 0,
        image_url: undefined
      }));
    }
    return [];
  })();


  useEffect(() => {
    if (!quiz) {
      navigate('/', { replace: true });
      return;
    }
    (async () => {
      try {
        const res = await api.get(`/api/v1/quizzes/${quiz.id}`);
        setDetail(res.data);
      } catch (e) {
        console.error("詳細取得に失敗:", e);
      }
    })();
  }, [quiz?.id, navigate]);

  if (!quiz) return null;
  const doraIndicators = quiz.dora_indicator_urls || quiz.discard_tile_urls || [];
  const tableState = detail?.table_state || quiz.table_state;

  const decisionOptions = useMemo(() => {
    const source = detail?.decision_options ?? quiz.decision_options;
    return Array.isArray(source) ? source.filter(Boolean) : [];
  }, [detail?.decision_options, quiz.decision_options]);
  const isDecisionQuiz = decisionOptions.length > 0;
  const correctDecision = detail?.correct_decision;
  const displaySelectedDecision = selectedDecision ? (DECISION_LABELS[selectedDecision] || selectedDecision) : null;
  const displayCorrectDecision = correctDecision ? (DECISION_LABELS[correctDecision] || correctDecision) : null;

  const decisionResult = isDecisionQuiz
    ? (correctDecision ? selectedDecision === correctDecision : null)
    : sameTile(selectedTileUrl, quiz.correct_tile_url);

  const isCorrect = decisionResult === null ? false : decisionResult;
  const hasResult = !isDecisionQuiz || decisionResult !== null;
  const badgeLabel = hasResult ? (isCorrect ? "正解" : "不正解") : "判定中";
  const badgeTone = hasResult
    ? (isCorrect
        ? "bg-green-50 text-green-700 border-green-200"
        : "bg-red-50 text-red-700 border-red-200")
    : "bg-gray-50 text-gray-500 border-gray-200";

  const handleSaveAnswer = async () => {
    const payload = {
      quiz_id: quiz.id,
      quiz_session_id: quizSessionId,
      correct: isCorrect,
    };

    if (isDecisionQuiz) {
      payload.selected_decision = selectedDecision;
    } else {
      payload.selected_tile_id = selectedTileId;
      payload.selected_tile_url = selectedTileUrl;
    }

    try {
      await api.post("/api/v1/quiz_answers", {
        quiz_answer: payload,
      });
    } catch (err) {
      alert("回答保存に失敗しました");
    }
  };

  const handleNext = async () => {
    if (!hasResult) return;
    await handleSaveAnswer();

    const excludeIds = Array.from(new Set([...(previous_ids || []), quiz.id].flat()))
      .filter((id) => typeof id === "number" && !isNaN(id));

    const correctCount = state?.correctCount || 0;
    const updatedCorrect = isCorrect ? correctCount + 1 : correctCount;

    if (excludeIds.length >= 10) {
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

  const userIsCorrect = isDecisionQuiz ? (hasResult ? isCorrect : false) : sameTile(selectedTileUrl, quiz.correct_tile_url);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-amber-50 text-black">
      <main className="flex-1 w-full mx-auto px-4 pt-6 lg:pt-12 lg:pl-8 pb-24">
        <div className="max-w-[1200px] mx-auto
                 grid grid-cols-[1fr_auto] items-center
                 gap-x-6 sm:gap-x-8 lg:gap-x-10
                 mt-12 mb-10">
          <div>
            <div className="text-3xl lg:text-5xl font-bold mb-1">{quiz.category}</div>
            <div className="text-2xl lg:text-4xl text-gray-800">{quiz.round_info}</div>
            <TableStateCard text={tableState} className="mt-6" />
            <span
              aria-live="polite"
              className={[
                "inline-flex items-center rounded-full px-6 py-2 text-sm lg:text-base font-semibold shadow border mt-4",
                badgeTone,
              ].join(" ")}
            >
              {badgeLabel}
            </span>
          </div>

          <div className="justify-self-start flex flex-col items-end gap-2">
            {doraIndicators.length > 0 && (
              <div className="p-2 lg:p-3 rounded-md bg-white shadow border w-fit mt-6 lg:mt-10">
                <div className="flex items-center">
                  {[...Array(2)].map((_, i) => (
                    <img
                      key={`back-left-${i}`}
                      src="/images/Back.png"
                      alt="裏"
                      className="w-10 h-14 md:w-12 md:h-16 lg:w-16 lg:h-20 rounded-sm"
                    />
                  ))}
                  {doraIndicators.map((url, i) => (
                    <img
                      key={`dora-${url}-${i}`}
                      src={url}
                      alt="ドラ表示牌"
                      className="w-10 h-14 md:w-12 md:h-16 lg:w-16 lg:h-20 border border-gray-400 rounded-sm"
                    />
                  ))}
                  {[...Array(4)].map((_, i) => (
                    <img
                      key={`back-right-${i}`}
                      src="/images/Back.png"
                      alt="裏"
                      className="w-10 h-14 md:w-12 md:h-16 lg:w-16 lg:h-20 rounded-sm"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="p-3 bg-white rounded-md shadow border w-fit mx-auto mt-5 lg:mt-12">
          <div className="flex justify-center gap-1 sm:gap-1.5 lg:gap-2">
            {quiz.hand_tile_urls.map((url, i) => {
              const isAnswerTile = sameTile(url, quiz.correct_tile_url);
              const isSelectedTile = sameTile(url, selectedTileUrl);

              let ringClass = "";
              if (!isDecisionQuiz && isSelectedTile) {
                ringClass = userIsCorrect
                  ? "ring-2 ring-green-400 scale-105"
                  : "ring-2 ring-red-400"; 
              } else if (!isDecisionQuiz && !userIsCorrect && isAnswerTile) {
                ringClass = "ring-2 ring-green-400";  
              }

              return (
                <img
                  key={`${url}-${i}`}
                  src={url}
                  alt={`手牌${i + 1}`}
                  className={[
                    "w-14 h-18 md:w-14 md:h-18 lg:w-20 lg:h-28 border border-gray-400 rounded-sm transition",
                    ringClass,
                  ].join(" ")}
                />
              );
            })}
          </div>
        </div>

        {isDecisionQuiz && (
          <div className="mt-6 bg-white p-4 lg:p-6 rounded-md shadow border max-w-3xl lg:max-w-4xl mx-auto">
            <div className="text-sm text-gray-600">あなたの選択</div>
            <div className="text-lg font-semibold text-gray-900">
              {displaySelectedDecision || "-"}
            </div>
            {displayCorrectDecision && (
              <div className="mt-3 text-sm text-gray-600">正解</div>
            )}
            {displayCorrectDecision && (
              <div className="text-lg font-semibold text-gray-900">
                {displayCorrectDecision}
              </div>
            )}
          </div>
        )}

        <div className="mt-6 bg-white p-4 lg:p-6 rounded-md shadow border max-w-3xl lg:max-w-4xl mx-auto">
          <div className="text-base leading-relaxed text-gray-800 whitespace-pre-wrap">
            {quiz.explanation}
          </div>
          {acceptItems.length > 0 && (
          <div className="mt-6 bg-white p-4 lg:p-6 rounded-md shadow border max-w-3xl lg:max-w-4xl mx-auto">
            <div className="font-medium mb-3">受け入れ枚数</div>
            <AcceptTilesList items={acceptItems} />
          </div>
        )}

        </div>

        <div className="mt-8 lg:mt-10 flex justify-center gap-3">
          <button
            onClick={handleNext}
            disabled={!hasResult}
            className="bg-white border border-gray-400 px-6 py-2 rounded shadow hover:bg-gray-100 active:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
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
