// components/Comment/CommentSection.jsx
import React, { useState, useEffect } from 'react';
import api from '../libs/api';

const Comment = ({ sessionId, questionIndex, isReviewer = false }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // コメント取得
  useEffect(() => {
    const fetchComments = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/api/v1/quiz_histories/${sessionId}/questions/${questionIndex}/comments`);
        setComments(response.data.comments || []);
      } catch (err) {
        console.error('コメント取得エラー:', err);
      } finally {
        setLoading(false);
      }
    };

    if (sessionId && questionIndex !== undefined) {
      fetchComments();
    }
  }, [sessionId, questionIndex]);

  // コメント投稿
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setSubmitting(true);
    try {
      const response = await api.post(`/api/v1/quiz_histories/${sessionId}/questions/${questionIndex}/comments`, {
        content: newComment.trim()
      });
      
      // 新しいコメントを追加
      setComments([...comments, response.data.comment]);
      setNewComment('');
    } catch (err) {
      console.error('コメント投稿エラー:', err);
      alert('コメントの投稿に失敗しました');
    } finally {
      setSubmitting(false);
    }
  };

  // コメント削除（自分のコメントのみ）
  const handleDelete = async (commentId) => {
    if (!window.confirm('このコメントを削除しますか？')) return;

    try {
      await api.delete(`/api/v1/quiz_histories/${sessionId}/questions/${questionIndex}/comments/${commentId}`);
      setComments(comments.filter(comment => comment.id !== commentId));
    } catch (err) {
      console.error('コメント削除エラー:', err);
      alert('コメントの削除に失敗しました');
    }
  };

  return (
    <div className="mt-4 border-t pt-4">
      <h4 className="font-semibold mb-3 flex items-center">
        <span className="mr-2">💬</span>
        コメント ({comments.length})
      </h4>

      {/* コメント投稿フォーム */}
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="flex gap-2">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="この問題についてのコメントを書く..."
            className="flex-1 p-2 border rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={2}
            maxLength={500}
          />
          <button
            type="submit"
            disabled={submitting || !newComment.trim()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? '投稿中...' : '投稿'}
          </button>
        </div>
        <div className="text-xs text-gray-500 mt-1">
          {newComment.length}/500文字
        </div>
      </form>

      {/* コメント一覧 */}
      <div className="space-y-3">
        {loading ? (
          <div className="text-center py-4 text-gray-500">読み込み中...</div>
        ) : comments.length === 0 ? (
          <div className="text-center py-4 text-gray-500">
            まだコメントがありません。最初のコメントを投稿してみましょう！
          </div>
        ) : (
          comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>
    </div>
  );
};

const CommentItem = ({ comment, onDelete }) => {
  const isOwner = comment.is_owner; // APIから返される想定

  return (
    <div className="bg-gray-50 p-3 rounded-lg">
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs">
            {comment.user_name ? comment.user_name[0].toUpperCase() : 'U'}
          </div>
          <span className="font-medium text-sm">{comment.user_name || 'ユーザー'}</span>
          <span className="text-xs text-gray-500">{formatDate(comment.created_at)}</span>
        </div>
        {isOwner && (
          <button
            onClick={() => onDelete(comment.id)}
            className="text-red-500 hover:text-red-700 text-xs"
            title="削除"
          >
            削除
          </button>
        )}
      </div>
      <p className="text-sm whitespace-pre-wrap">{comment.content}</p>
    </div>
  );
};

// 日付フォーマット関数
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diff = now - date;
  
  if (diff < 60000) return 'たった今';
  if (diff < 3600000) return `${Math.floor(diff / 60000)}分前`;
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}時間前`;
  
  return date.toLocaleDateString('ja-JP', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export default Comment;