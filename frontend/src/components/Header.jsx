import { FaSearch } from "react-icons/fa";
import SearchModal from "./SearchModal";

const Header = ({
  isReviewer,
  showReviewerSearch,
  setShowReviewerSearch,
  searchTerm,
  setSearchTerm,
  searchResults,
}) => {
  return (
    <header className="text-center mt-4 mb-2 relative">
      <h1 className="text-4xl sm:text-6xl lg:text-8xl font-brush tracking-widest lg:mb-4">
        雀力スカウター
      </h1>

      {isReviewer && (
        <div className="absolute top-0 right-4">
          {!showReviewerSearch ? (
            <button
              onClick={() => setShowReviewerSearch(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all duration-200 flex items-center justify-center"
              title="ユーザー検索"
            >
              <FaSearch className="text-sm" />
            </button>
          ) : (
            <SearchModal
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              searchResults={searchResults}
              setShowReviewerSearch={setShowReviewerSearch}
            />
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
