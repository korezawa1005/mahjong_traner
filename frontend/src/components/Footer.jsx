
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaPen, FaBook, FaBookOpen, FaHome } from "react-icons/fa";

const Footer = () => {
  const navigate = useNavigate();

  // ▼未ログイン時は /login に飛ばしたい場合は、この関数をボタンに使ってください
  const goMyPage = () => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      navigate("/mypage");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="w-screen fixed bottom-0 left-0 z-30">
      <footer className="bg-black text-white sm:py-4 lg:py-3">
        <div className="sm:max-w-[700px] lg:max-w-[1100px] px-4 mx-auto flex justify-between text-xs">
          {/* Home */}
          <Link to="/" className="flex flex-col items-center hover:opacity-80">
            <FaHome className="sm:text-xl lg:text-4xl mb-1" />
            ホーム
          </Link>

          {/* マイページ（③の方針：常にリンクでOK） */}
          <Link to="/mypage" className="flex flex-col items-center hover:opacity-80">
            <FaUser className="sm:text-xl lg:text-4xl mb-1" />
            マイページ
          </Link>

          {/* ログイン */}
          <Link to="/login" className="flex flex-col items-center hover:opacity-80">
            <FaPen className="sm:text-xl lg:text-4xl mb-1" />
            ログイン
          </Link>

          {/* ヘルプ */}
          <Link to="/question" className="flex flex-col items-center hover:opacity-80">
            <FaBook className="sm:text-xl lg:text-4xl mb-1" />
            ヘルプ
          </Link>

          {/* 問題一覧 */}
          <Link to="/problems" className="flex flex-col items-center hover:opacity-80">
            <FaBookOpen className="sm:text-xl lg:text-4xl mb-1" />
            問題一覧
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
