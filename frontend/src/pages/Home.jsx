import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-between items-center p-6">
      <div className="text-center mt-6">
        <Link to="/" className="text-4xl font-bold text-green-800 mb-2">麻雀スカウター</Link>
      </div>

      <div className="grid grid-cols-2 gap-6 mt-10">
        <div className="bg-white shadow-md rounded-2xl p-6 text-center w-56">
          <Link to={`/quiz?category=${encodeURIComponent("牌効率")}`} className="underline text-xl font-bold">牌効率</Link>
        </div>
        <div className="bg-white shadow-md rounded-2xl p-6 text-center w-56">
          <Link to={`/quiz?category=${encodeURIComponent("押し引き")}`} className="underline text-xl font-bold">押し引き</Link>
        </div>
        <div className="bg-white shadow-md rounded-2xl p-6 text-center w-56">
          <Link to={`/quiz?category=${encodeURIComponent("リーチ判断")}`} className="underline text-xl font-bold">リーチ判断</Link>
        </div>
        <div className="bg-white shadow-md rounded-2xl p-6 text-center w-56">
          <Link to={`/quiz?category=${encodeURIComponent("仕掛け判断")}`} className="underline text-xl font-bold">仕掛け判断</Link>
        </div>
        <div className="bg-white shadow-md rounded-2xl p-6 text-center col-span-2 w-72 mx-auto">
          <Link to={`/quiz?category=${encodeURIComponent("手役/構成力")}`} className="underline text-xl font-bold">手役/構成力</Link>
        </div>
      </div>

      <div className="flex justify-center gap-8 mt-2 mb-24">
        <button className="rounded-2xl bg-gray-300 p-8">
          <Link to="/mypage">🔒</Link>
        </button>
        <button className="rounded-2xl bg-green-400 p-8">
          <Link to="/login">👤</Link>
        </button>
        <button className="rounded-2xl bg-purple-300 p-8">
          <Link to="/question">❓</Link>
        </button>
        <button className="rounded-2xl bg-gray-600 p-8">
          <Link to="/privacy">📋</Link>
        </button>
      </div>
    </div>
  );
};

export default Home;