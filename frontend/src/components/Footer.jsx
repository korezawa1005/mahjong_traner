
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
      <footer className="bg-black text-white py-4">
        <div className="max-w-[700px] px-4 mx-auto flex justify-between text-xs">
          {/* Home */}
          <Link to="/" className="flex flex-col items-center hover:opacity-80">
            <FaHome className="text-lg mb-1" />
            ホーム
          </Link>

          {/* マイページ（③の方針：常にリンクでOK） */}
          <Link to="/mypage" className="flex flex-col items-center hover:opacity-80">
            <FaUser className="text-lg mb-1" />
            マイページ
          </Link>

          {/*
          // もし未ログイン時は /login へ飛ばしたいなら、上のLinkを下記ボタンに差し替え
          <button onClick={goMyPage} className="flex flex-col items-center hover:opacity-80">
            <FaUser className="text-lg mb-1" />
            マイページ
          </button>
          */}

          {/* ログイン */}
          <Link to="/login" className="flex flex-col items-center hover:opacity-80">
            <FaPen className="text-lg mb-1" />
            ログイン
          </Link>

          {/* ヘルプ */}
          <Link to="/question" className="flex flex-col items-center hover:opacity-80">
            <FaBook className="text-lg mb-1" />
            ヘルプ
          </Link>

          {/* 問題一覧 */}
          <Link to="/problems" className="flex flex-col items-center hover:opacity-80">
            <FaBookOpen className="text-lg mb-1" />
            問題一覧
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
