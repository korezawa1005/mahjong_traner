// src/components/QuizHistory.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../libs/api";

const PER = 10;

const QuizHistory = ({ userId = null }) => {
  const [histories, setHistories] = useState([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState(null);
  const [page, setPage]           = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  useEffect(() => { setPage(1); }, [userId]);

  useEffect(() => {
    let cancel = false;

    const fetchHistories = async () => {
      try {
        setLoading(true);
        setError(null);

        const base = userId
          ? `/api/v1/users/${userId}/quiz_histories`
          : `/api/v1/quiz_histories`;

        const res = await api.get(`${base}?page=${page}&per=${PER}`);
        if (cancel) return;

        setHistories(Array.isArray(res.data?.histories) ? res.data.histories : []);
        setTotalPages(res.data?.total_pages || 1);
      } catch (e) {
        if (!cancel) setError(e.message || "履歴の取得に失敗しました");
      } finally {
        if (!cancel) setLoading(false);
      }
    };

    fetchHistories();
    return () => { cancel = true; };
  }, [userId, page]);

  const handleDetailClick = (sessionId) => {
    if (userId) {
      navigate(`/quiz/history/${userId}/${sessionId}`);
    } else {
      navigate(`/quiz/history/${sessionId}`);           
    }
  };

  if (loading) return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="h-28 rounded-xl bg-gray-200/60 animate-pulse" />
    </div>
  );
  if (error) return (
    <div className="max-w-2xl mx-auto p-4">
      <p className="text-red-600 text-sm">Error: {error}</p>
    </div>
  );
  if (histories.length === 0) return (
    <div className="max-w-2xl mx-auto p-4">
      <p className="text-gray-600 text-sm">履歴がありません</p>
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="space-y-3">
        {histories.map((h) => (
          <div
            key={h.id}
            className="bg-white rounded-lg shadow p-4 cursor-pointer hover:bg-gray-50"
            onClick={() => handleDetailClick(h.id)}
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-600">{h.created_at}</p>
                <p className="font-semibold">{h.category_name}</p>
                <p className="text-sm">
                  {h.total_questions}問中 {h.correct_count}問正解
                </p>
              </div>
              <div className="text-right">
                <span className="text-gray-400">→</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      {totalPages > 1 && (
        <div className="mt-4 flex items-center justify-center gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-3 py-1.5 text-sm rounded-lg border border-gray-300 bg-white disabled:opacity-50"
          >
            前へ
          </button>

          <div className="text-sm">
            {page} / {totalPages}
          </div>

          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-3 py-1.5 text-sm rounded-lg border border-gray-300 bg-white disabled:opacity-50"
          >
            次へ
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizHistory;
