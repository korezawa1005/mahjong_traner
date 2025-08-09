import { FaUser, FaPen, FaBook, FaBookOpen } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = ({ isLoggedIn }) => {
  return (
    <div className="w-screen fixed bottom-0 left-0">
      <footer className="bg-black text-white py-4">
        <div className="max-w-[700px] px-4 mx-auto flex justify-between text-xs">
          {isLoggedIn ? (
            <Link to="/mypage" className="flex flex-col items-center hover:opacity-80">
              <FaUser className="text-lg mb-1" />
              マイページ
            </Link>
          ) : (
            <div className="flex flex-col items-center text-gray-400 cursor-not-allowed">
              <FaUser className="text-lg mb-1" />
              マイページ
            </div>
          )}
          <Link to="/login" className="flex flex-col items-center hover:opacity-80">
            <FaPen className="text-lg mb-1" />
            ログイン
          </Link>
          <Link to="/question" className="flex flex-col items-center hover:opacity-80">
            <FaBook className="text-lg mb-1" />
            ヘルプ
          </Link>
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
