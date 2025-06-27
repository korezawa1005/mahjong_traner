import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Result = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { total, category } = state || {};

  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-bold mb-4">クイズ終了！</h1>
      <p className="mb-2">カテゴリ: {category}</p>
      <p className="mb-4">出題数: {total-1}問</p>

      <button
        onClick={() => navigate("/")}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        ホームに戻る
      </button>
    </div>
  );
};

export default Result;
