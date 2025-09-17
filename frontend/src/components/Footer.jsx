import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaPen, FaBook, FaBookOpen, FaHome } from "react-icons/fa";
import { useState, useEffect } from "react";
import api from "../libs/api";

const Footer = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = async () => {
    const confirmed = window.confirm("本当にログアウトしますか？");
    if (!confirmed) return;

    try {
      const token = localStorage.getItem("jwt");
      await api.delete("/users/sign_out", {
        headers: { Authorization: token },
      });
    } catch (err) {
      if (err?.response?.status !== 401) {
        console.error("ログアウト失敗:", err);
      }
    } finally {
      localStorage.removeItem("jwt");
      setIsLoggedIn(false);
      navigate("/");
    }
  };

  return (
    <div className="w-screen fixed bottom-0 left-0 z-30">
      <footer className="bg-black text-white sm:py-4 lg:py-3">
        <div className="sm:max-w-[700px] lg:max-w-[1100px] px-4 mx-auto flex justify-between text-xs">
          <Link to="/" className="flex flex-col items-center hover:opacity-80">
            <FaHome className="sm:text-xl lg:text-4xl mb-1" />
            ホーム
          </Link>

          <Link to="/mypage" className="flex flex-col items-center hover:opacity-80">
            <FaUser className="sm:text-xl lg:text-4xl mb-1" />
            マイページ
          </Link>

          {isLoggedIn ? (
            <button onClick={handleLogout} className="flex flex-col items-center hover:opacity-80">
              <FaPen className="sm:text-xl lg:text-4xl mb-1" />
              ログアウト
            </button>
          ) : (
            <Link to="/login" className="flex flex-col items-center hover:opacity-80">
              <FaPen className="sm:text-xl lg:text-4xl mb-1" />
              ログイン
            </Link>
          )}

          <Link to="/guide" className="flex flex-col items-center hover:opacity-80">
            <FaBook className="sm:text-xl lg:text-4xl mb-1" />
            ヘルプ
          </Link>

          <Link to="#" className="flex flex-col items-center hover:opacity-80">
            <FaBookOpen className="sm:text-xl lg:text-4xl mb-1" />
            問題一覧
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
