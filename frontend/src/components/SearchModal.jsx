import { FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

const SearchModal = ({
  searchTerm,
  setSearchTerm,
  searchResults,
  setShowReviewerSearch,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-xl p-4 w-80 border border-gray-200 relative">
      {/* モーダルヘッダー */}
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-semibold text-gray-800 text-sm">ユーザー検索</h3>
        <button
          onClick={() => {
            setShowReviewerSearch(false);
            setSearchTerm("");
          }}
          className="text-gray-500 hover:text-gray-700 p-1"
        >
          <FaTimes className="text-sm" />
        </button>
      </div>

      {/* 入力欄 */}
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="メールアドレスで検索..."
        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
        autoFocus
      />

      {/* 検索結果リスト */}
      <div className="mt-3 pt-3 border-t border-gray-100">
        {searchResults.length > 0 ? (
          <ul className="max-h-60 overflow-y-auto text-sm">
            {searchResults.map((user) => (
              <li
                key={user.id}
                className="py-1 px-2 hover:bg-gray-100 cursor-pointer rounded"
                style={{ position: "relative", zIndex: 9999 }}
              >
                <Link
                  to={`/users/${user.id}`}
                  className="block w-full h-full text-sm text-gray-700"
                  onClick={() => {
                    console.log("クリックされた", user.email);
                    alert(`${user.email} をクリック`);
                  }}
                >
                  {user.email}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          searchTerm.trim() && (
            <div className="text-gray-500 text-sm">該当ユーザーが見つかりません</div>
          )
        )}
      </div>
    </div>
  );
};

export default SearchModal;
