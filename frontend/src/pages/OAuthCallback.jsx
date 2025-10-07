import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const OAuthCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");
    const error = params.get("error");

    if (token) {
      localStorage.setItem("jwt", token);
      navigate("/", { replace: true });
    } else {
      const message = error ? decodeURIComponent(error) : "認証に失敗しました。";
      alert(message);
      navigate("/login", { replace: true });
    }
  }, [location.search, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-amber-50 text-gray-700">
      <span className="text-sm">ログイン処理中...</span>
    </div>
  );
};

export default OAuthCallback;
