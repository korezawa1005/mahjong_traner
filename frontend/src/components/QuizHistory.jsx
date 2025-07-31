import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../libs/api';

const QuizHistory = ({ userId = null }) => {
  const [histories, setHistories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHistories = async () => {
      try {
        const endpoint = userId
          ? `/api/v1/users/${userId}/quiz_histories` // 他人のマイページ
          : `/api/v1/quiz_histories`;               // 自分のマイページ

        const response = await api.get(endpoint);
        setHistories(response.data.histories);
      } catch (err) {
        console.error('履歴取得エラー:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchHistories();
  }, [userId]);

  const handleDetailClick = (sessionId) => {
    if (userId) {
      // 他ユーザー
      navigate(`/quiz/history/${userId}/${sessionId}`);
    } else {
      // 自分
      navigate(`/quiz/history/${sessionId}`);
    }
  };

  if (loading) return <div>読み込み中...</div>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">クイズ履歴</h2>
      
      <div className="space-y-3">
        {histories.map((history) => (
          <div 
            key={history.id}
            className="bg-white rounded-lg shadow p-4 cursor-pointer hover:bg-gray-50"
            onClick={() => handleDetailClick(history.id)}
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-600">{history.created_at}</p>
                <p className="font-semibold">{history.category_name}</p>
                <p className="text-sm">
                  {history.total_questions}問中 {history.correct_count}問正解
                </p>
              </div>
              <div className="text-right">
                <span className="text-gray-400">→</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizHistory;