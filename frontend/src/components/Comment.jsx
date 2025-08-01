import { useState, useEffect } from 'react';
import api from '../libs/api';

export const Comments = ({ userId }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [posting, setPosting] = useState(false);

  /* ① 自分の情報を取得してロール判定用に保持 */
  useEffect(() => {
    api.get('/api/v1/me')
       .then(res => setCurrentUser(res.data))   // { id, name, role }
       .catch(() => setCurrentUser(null))       // 未ログイン
       .finally(() => setAuthLoading(false));
  }, []);
  
  /* ② コメント一覧取得 */
  const fetchComments = async () => {
    const res = await api.get(`/api/v1/users/${userId}/comments`);
    setComments(res.data);
  };

  useEffect(() => {
    setLoading(true);
    fetchComments().finally(() => setLoading(false));
  }, [userId]);

  /** 投稿 */
  const handleSubmit = async e => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setPosting(true);
    try {
      const res = await api.post(`/api/v1/users/${userId}/comments`, {
        content: newComment,
      });
      // 先頭に追加
      setComments(prev => [res.data, ...prev]);
      setNewComment('');
    } catch (err) {
      console.error('コメント投稿失敗', err);
    } finally {
      setPosting(false);
    }
  };

  if (loading) return <p className="text-sm text-gray-500">コメント読み込み中...</p>;

  return (
    <div className="border-t pt-3 mt-3 space-y-2">
      {/** 投稿フォーム（レビュワーのみ） */}
      {currentUser?.role === 'reviewer' && (
        <form onSubmit={handleSubmit} className="flex gap-2">
          <textarea
            value={newComment}
            onChange={e => setNewComment(e.target.value)}
            className="flex-1 border rounded p-2 text-sm"
            placeholder="コメントを書く..."
            rows={2}
          />
          <button
            type="submit"
            disabled={posting}
            className="bg-blue-600 text-white px-3 py-1 rounded text-sm disabled:opacity-50"
          >
            送信
          </button>
        </form>
      )}

      {comments.length === 0 ? (
        <p className="text-xs text-gray-500">コメントはまだありません。</p>
      ) : (
        <ul className="space-y-1">
          {comments.map(c => (
            <li key={c.id} className="text-sm bg-gray-50 rounded p-2">
              <p className="whitespace-pre-wrap">{c.content}</p>
              <p className="text-[10px] text-gray-500 mt-1">
                by {c.reviewer.name ?? 'Reviewer'} / {c.created_at}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Comments;