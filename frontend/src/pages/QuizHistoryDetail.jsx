import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../libs/api';
import Comment from '../components/Comment'

const QuizHistoryDetail = () => {
  const { userId, sessionId } = useParams();
  const [details, setDetails] = useState([]);
  const [sessionInfo, setSessionInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showComments, setShowComments] = useState({});
  const navigate = useNavigate();

  const endpoint = userId
  ? `/api/v1/users/${userId}/quiz_histories/${sessionId}`
  : `/api/v1/quiz_histories/${sessionId}`;  
  
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await api.get(endpoint);
        setDetails(response.data.details);
        setSessionInfo(response.data.session_info);
      } catch (err) {
        console.error('詳細取得エラー:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [sessionId]);

  if (loading) return <div>読み込み中...</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <button 
        onClick={() => navigate('/mypage')}
        className="mb-4 text-blue-600 hover:underline"
      >
        ← 履歴一覧に戻る
      </button>
      
      {sessionInfo && (
        <div className="mb-6">
          <h2 className="text-xl font-bold">{sessionInfo.category_name}</h2>
          <p className="text-gray-600">{sessionInfo.created_at}</p>
          <p>正解数: {sessionInfo.correct_count}/{sessionInfo.total_questions}</p>
        </div>
      )}

      <div className="space-y-4">
        {details.map((detail, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold">問題 {index + 1}</h3>
              <span className={`px-2 py-1 rounded text-sm ${
                detail.correct ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {detail.correct ? '正解' : '不正解'}
              </span>
            </div>
            
            {/* 手牌表示 */}
            <div className="flex items-center gap-2 mb-2">
              {detail.hand_tiles.map((tile, idx) => (
                <img 
                  key={idx}
                  src={tile.image_url} 
                  alt={tile.name}
                  className={`w-8 h-12 ${
                    tile.id === detail.selected_tile_id ? 'ring-2 ring-blue-500' : ''
                  } ${
                    tile.id === detail.correct_tile_id ? 'ring-2 ring-green-500' : ''
                  }`}
                />
              ))}
            </div>
            
            <div className="text-sm text-gray-600">
              <p>選択した牌: {detail.selected_tile_name}</p>
              <p>正解牌: {detail.correct_tile_name}</p>
              <p>解説: {detail.explanation}</p>
            </div>
            {showComments[index] && (
              <div className="px-4 pb-4">
                <CommentSection 
                  sessionId={sessionId} 
                  questionIndex={index}
                />
              </div>
            )}
          </div>
        ))}
        <Comment userId={userId || currentUser.id} />
      </div>
    </div>
  );
};

export default QuizHistoryDetail;