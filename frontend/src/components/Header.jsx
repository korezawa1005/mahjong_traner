import { FaSearch, FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";
import SearchModal from "./SearchModal";
import MahjongModal from "./MahjongModal";

const Header = ({
  isReviewer,
  showReviewerSearch,
  setShowReviewerSearch,
  searchTerm,
  setSearchTerm,
  searchResults,
}) => {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <header className="relative text-center mt-4 mb-2 relative">
      <button
          onClick={() => setOpenMenu(true)}
          className="absolute top-1/2 -translate-y-1/2 left-16 sm:left-8 md:left-12 w-12 h-12 md:w-14 md:h-14 bg-white/80 hover:bg-white text-amber-800 p-3 rounded-full border border-amber-300 shadow-lg transition-all duration-200 flex items-center justify-center"
          title="メニュー"
          aria-label="メニュー"
        >
          <FaBars className="text-base" />
      </button>
      
      <h1 className="text-4xl sm:text-6xl lg:text-8xl font-brush tracking-widest lg:mb-4">
        雀力スカウター
      </h1>

      <div className="absolute top-1/2 -translate-y-1/2 right-16 sm:right-8 md:right-12 w-18 h-24 flex items-center gap-2">
        {isReviewer && (
          !showReviewerSearch ? (
            <button
              onClick={() => setShowReviewerSearch(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all duration-200 flex items-center justify-center"
              title="ユーザー検索"
              aria-label="ユーザー検索"
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
          )
        )}

      </div>

      <MahjongModal open={openMenu} onClose={() => setOpenMenu(false)} title="メニュー">
        <nav className="flex flex-col divide-y divide-amber-200">
          <MenuLink to="/help" label="使い方" onSelect={() => setOpenMenu(false)} />
          <MenuLink to="/terms" label="利用規約" onSelect={() => setOpenMenu(false)} />
          <MenuLink to="/privacy" label="プライバシー" onSelect={() => setOpenMenu(false)} />
        </nav>
      </MahjongModal>
    </header>
  );
};

function MenuLink({ to, label, onSelect }) {
  return (
    <Link
      to={to}
      onClick={onSelect}
      className="block px-5 py-3 text-center hover:bg-amber-50 active:bg-amber-100 text-[15px]"
    >
      {label}
    </Link>
  );
}

export default Header;
