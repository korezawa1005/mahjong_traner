import { useState, useEffect } from 'react';
import api from '../libs/api';

export const Comments = ({ userId, quizSessionId }) => {
  const [currentUser, setCurrentUser]   = useState(null);
  const [authLoading, setAuthLoading]   = useState(true);
  const [comments, setComments]         = useState([]);
  const [newComment, setNewComment]     = useState('');
  const [loading, setLoading]           = useState(true);
  const [posting, setPosting]           = useState(false);
  const [editId, setEditId]             = useState(null);
  const [editContent, setEditContent]   = useState('');

  const [isComposing, setIsComposing]   = useState(false);

  const startEdit = (comment) => {
    setEditId(comment.id);
    setEditContent(comment.content);
  };

  useEffect(() => {
    api.get('/api/v1/me')
      .then(res => setCurrentUser(res.data))
      .catch(() => setCurrentUser(null))
      .finally(() => setAuthLoading(false));
  }, []);

  const fetchComments = async () => {
    const res = await api.get(`/api/v1/users/${userId}/comments`, {
      params: { quiz_session_id: quizSessionId }
    });
    setComments(res.data);
  };

  useEffect(() => {
    setLoading(true);
    fetchComments().finally(() => setLoading(false));
  }, [userId, quizSessionId]);

  const submitNewComment = async () => {
    const content = newComment.trim();
    if (!content || posting) return;

    setPosting(true);
    try {
      const res = await api.post(`/api/v1/users/${userId}/comments`, {
        content,
        quiz_session_id: quizSessionId
      });
      setComments(prev => [res.data, ...prev]);
      setNewComment('');
    } catch (err) {
      console.error('コメント投稿失敗', err);
    } finally {
      setPosting(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await submitNewComment();
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editContent.trim()) return;
    const res = await api.patch(`/api/v1/users/${userId}/comments/${editId}`, {
      content: editContent,
    });
    setComments(prev => prev.map(c => (c.id === editId ? res.data : c)));
    setEditId(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('コメントを削除しますか？')) return;
    await api.delete(`/api/v1/users/${userId}/comments/${id}`);
    setComments(prev => prev.filter(c => c.id !== id));
  };

  if (loading) return <p className="text-sm text-gray-500">コメント読み込み中...</p>;

  return (
    <div className="border-t pt-3 mt-3 space-y-2">
      {currentUser?.role === 'reviewer' && (
        <form onSubmit={handleSubmit} className="flex gap-2">
          <textarea
            value={newComment}
            onChange={e => setNewComment(e.target.value)}
            className="flex-1 border rounded p-2 text-sm"
            placeholder="コメントを書く…（Enterで送信 / Shift+Enterで改行）"
            rows={2}
            onCompositionStart={() => setIsComposing(true)}
            onCompositionEnd={() => setIsComposing(false)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                if (isComposing || posting) return;
                e.preventDefault();
                submitNewComment();
              }
            }}
          />
          <button
            type="submit"
            disabled={posting}
            className="bg-blue-600 text-white px-3 py-1 rounded text-sm disabled:opacity-50"
            aria-label="コメント送信"
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
            <li key={c.id} className="relative text-sm bg-gray-50 rounded p-2 pr-20">
              {currentUser?.id === c.reviewer?.id && (
                <div className="absolute right-2 top-1 flex gap-1 text-xs">
                  <button onClick={() => startEdit(c)} className="text-blue-600">編集</button>
                  <button onClick={() => handleDelete(c.id)} className="text-red-600">削除</button>
                </div>
              )}

              {editId === c.id ? (
                <form onSubmit={handleUpdate}>
                  <textarea
                    value={editContent}
                    onChange={e => setEditContent(e.target.value)}
                    className="w-full border rounded p-1 text-sm mt-4"
                    rows={2}
                  />
                  <button type="submit" className="mt-1 bg-blue-600 text-white px-2 py-0.5 rounded">
                    保存
                  </button>
                </form>
              ) : (
                <>
                  <p className="whitespace-pre-wrap break-words">{c.content}</p>
                  <p className="text-[10px] text-gray-500 mt-1">
                    by {c.reviewer?.name ?? 'NEET'} / {c.created_at}
                  </p>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Comments;
