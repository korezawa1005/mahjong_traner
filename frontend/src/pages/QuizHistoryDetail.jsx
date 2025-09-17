import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../libs/api";
import Comment from "../components/Comment";
import Footer from "../components/Footer";

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

  const tileRingClass = (tileId, correctId, selectedId) => {
    if (tileId === correctId) return "ring-2 ring-green-500";
    if (tileId === selectedId) return "ring-2 ring-red-500";
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
              {details.map((detail, index) => (
                <div key={index} className="bg-white rounded-2xl shadow p-4 border border-gray-200">
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
                      <img
                        key={idx}
                        src={tile.image_url}
                        alt={tile.name || `tile-${tile.id}`}
                        className={`w-8 h-12 rounded-sm ${tileRingClass(
                          tile.id,
                          detail.correct_tile_id,
                          detail.selected_tile_id
                        )}`}
                      />
                    ))}
                  </div>

                  <div className="text-sm text-gray-700 space-y-1">
                    <p>
                      選択した牌:{" "}
                      <span className="font-medium">{detail.selected_tile_name}</span>
                    </p>
                    <p>
                      正解牌:{" "}
                      <span className="font-medium">{detail.correct_tile_name}</span>
                    </p>
                    {detail.explanation && (
                      <p className="text-gray-600">解説: {detail.explanation}</p>
                    )}
                  </div>
                </div>
              ))}
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
