import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../libs/api";
import Comment from "../components/Comment";
import Footer from "../components/Footer";
import { DECISION_LABELS } from "../components/DecisionButtons";

const normalizeCallOptions = (options = []) => {
  return (Array.isArray(options) ? options : [])
    .map((option, index) => {
      if (typeof option === "string") {
        const key = option;
        return { key, label: option };
      }
      if (Array.isArray(option)) {
        const key = option.join(",");
        return { key, label: option.join(" ") };
      }
      if (option && typeof option === "object") {
        const key = option.key ?? String(index);
        const label = option.label
          ?? (Array.isArray(option.tiles) ? option.tiles.join(" ") : String(option.value ?? key));
        return { key, label };
      }
      return null;
    })
    .filter(Boolean);
};

const QuizHistoryDetail = () => {
  const { userId, sessionId } = useParams();
  const navigate = useNavigate();

  const [details, setDetails] = useState([]);
  const [sessionInfo, setSessionInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  const endpoint = userId
    ? `/api/v1/users/${userId}/quiz_histories/${sessionId}`
    : `/api/v1/quiz_histories/${sessionId}`;

  useEffect(() => {
    let cancel = false;
    api
      .get("/api/v1/me")
      .then((res) => !cancel && setCurrentUser(res.data))
      .catch(() => !cancel && setCurrentUser(null));
    return () => {
      cancel = true;
    };
  }, []);

  useEffect(() => {
    let cancel = false;
    const fetchDetails = async () => {
      try {
        setLoading(true);
        const res = await api.get(endpoint);
        if (cancel) return;
        setDetails(res.data.details || []);
        setSessionInfo(res.data.session_info || null);
      } catch (err) {
        console.error("詳細取得エラー:", err);
      } finally {
        if (!cancel) setLoading(false);
      }
    };
    fetchDetails();
  }, [endpoint]);

  const tileRingClass = (detail, tileId) => {
    const isDecision = Array.isArray(detail.decision_options) && detail.decision_options.length > 0;
    const isCallQuiz = Array.isArray(detail.call_options) && detail.call_options.length > 0;
    if (isDecision || isCallQuiz) return "";
    if (tileId === detail.correct_tile_id) return "ring-2 ring-green-500";
    if (tileId === detail.selected_tile_id) return "ring-2 ring-red-500";
    return "";

  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-amber-50 text-black">
      <main className="flex-1 w-full max-w-[700px] mx-auto px-2 pt-6 pb-24 flex flex-col gap-6">
        <div className="w-full">
          <button
            onClick={() => navigate(-1)}
            className="text-sm text-gray-600 hover:underline"
          >
            ← 戻る
          </button>
        </div>

        <section className="w-full bg-[#fdf7ed] border border-gray-200 rounded-2xl shadow-sm p-6 sm:p-8">
          {loading ? (
            <div className="h-24 rounded-xl bg-gray-200/60 animate-pulse" />
          ) : sessionInfo ? (
            <div className="grid gap-2">
              <div className="text-lg font-semibold">{sessionInfo.category_name}</div>
              <div className="text-sm text-gray-600">{sessionInfo.created_at}</div>
              <div className="text-sm">
                正解数:{" "}
                <span className="font-semibold">
                  {sessionInfo.correct_count}
                </span>
                / {sessionInfo.total_questions}
              </div>
            </div>
          ) : (
            <p className="text-sm text-gray-600">セッション情報が見つかりませんでした。</p>
          )}
        </section>

        <section className="w-full">
          {loading ? (
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-28 rounded-xl bg-gray-200/60 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {details.map((detail, index) => {
                const callOptions = normalizeCallOptions(detail.call_options);
                const callOptionMap = new Map();
                callOptions.forEach(({ key, label }) => {
                  callOptionMap.set(String(key), label);
                });

                const formatCallList = (keys = []) => {
                  if (!Array.isArray(keys) || keys.length === 0) return "ー";
                  return keys
                    .map((key) => {
                      const normalized = String(key);
                      return callOptionMap.get(normalized) || normalized;
                    })
                    .join("、");
                };

                const isDecisionQuiz = Array.isArray(detail.decision_options) && detail.decision_options.length > 0;
                const isCallQuiz = callOptions.length > 0;

                return (
                <div
                  key={index}
                  className="rounded-2xl border border-amber-200 bg-white p-4 shadow"
                >
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-semibold">問題 {index + 1}</h3>
                    <span
                      className={`px-2 py-1 rounded text-xs sm:text-sm ${
                        detail.correct
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {detail.correct ? "正解" : "不正解"}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    {detail.hand_tiles.map((tile, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center justify-center rounded-sm border border-black/40 bg-white p-0.5"
                      >
                        <img
                          src={tile.image_url}
                          alt={tile.name || `tile-${tile.id}`}
                          className={`w-8 h-12 rounded-sm ${tileRingClass(detail, tile.id)}`}
                        />
                      </span>
                    ))}
                  </div>

                  <div className="text-sm text-gray-700 space-y-1">
                    {isDecisionQuiz ? (
                      <>
                        <p>
                          選択: <span className="font-medium">
                            {detail.selected_decision ? (DECISION_LABELS[detail.selected_decision] || detail.selected_decision) : "ー"}
                          </span>
                        </p>
                        <p>
                          正解: <span className="font-medium">
                            {detail.correct_decision ? (DECISION_LABELS[detail.correct_decision] || detail.correct_decision) : "ー"}
                          </span>
                        </p>
                      </>
                    ) : (
                      isCallQuiz ? (
                        <>
                          <p>
                            選択: <span className="font-medium">{formatCallList(detail.selected_calls)}</span>
                          </p>
                          <p>
                            正解: <span className="font-medium">{formatCallList(detail.correct_calls)}</span>
                          </p>
                        </>
                      ) : (
                        <>
                          <p>
                            選択した牌:{" "}
                            <span className="font-medium">{detail.selected_tile_name}</span>
                          </p>
                          <p>
                            正解牌:{" "}
                            <span className="font-medium">{detail.correct_tile_name}</span>
                          </p>
                        </>
                      )
                    )}
                    {detail.explanation && (
                      <p className="text-gray-600">解説: {detail.explanation}</p>
                    )}
                  </div>
                </div>
                );
              })}
            </div>
          )}
        </section>

        {!loading && (userId || currentUser?.id) && (
          <section className="w-full bg-white/70 backdrop-blur rounded-2xl border border-gray-200 p-4 sm:p-6">
            <h2 className="text-lg font-semibold mb-3">コメント</h2>
            <Comment userId={userId || currentUser.id} quizSessionId={sessionId} />
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default QuizHistoryDetail;
