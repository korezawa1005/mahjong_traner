import React from "react";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-between items-center p-6">
      <div className="text-center mt-6">
        <h1 className="text-4xl font-bold text-green-800 mb-2">麻雀スカウター</h1>
      </div>

      <div className="grid grid-cols-2 gap-6 mt-10">
        <div className="bg-white shadow-md rounded-2xl p-6 text-center w-56">
          <h2 className="text-xl font-bold">牌効率</h2>
        </div>
        <div className="bg-white shadow-md rounded-2xl p-6 text-center w-56">
          <h2 className="text-xl font-bold">押し引き</h2>
        </div>
        <div className="bg-white shadow-md rounded-2xl p-6 text-center w-56">
          <h2 className="text-xl font-bold">立直判断</h2>
        </div>
        <div className="bg-white shadow-md rounded-2xl p-6 text-center w-56">
          <h2 className="text-xl font-bold">仕掛け</h2>
        </div>
        <div className="bg-white shadow-md rounded-2xl p-6 text-center col-span-2 w-72 mx-auto">
          <h2 className="text-xl font-bold">手役意識（構成力）</h2>
        </div>
      </div>

      <div className="flex justify-center gap-8 mt-2 mb-24">
        <button className="rounded-2xl bg-gray-300 p-8">
          <span role="img" aria-label="lock">
            🔒
          </span>
        </button>
        <button className="rounded-2xl bg-green-400 p-8">
          <span role="img" aria-label="profile">
            👤
          </span>
        </button>
        <button className="rounded-2xl bg-purple-300 p-8">
          <span role="img" aria-label="question">
            ❓
          </span>
        </button>
        <button className="rounded-2xl bg-gray-600 p-8">
          <span role="img" aria-label="notebook">
            📋
          </span>
        </button>
      </div>
    </div>
  );
};

export default Home;