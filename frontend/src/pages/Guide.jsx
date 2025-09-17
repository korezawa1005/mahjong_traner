import React from "react";
import Footer from "../components/Footer";

const Guide = () => {
  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold mb-6">サービスの利用方法</h1>

      <h2 className="text-xl font-semibold mt-6 mb-2">クイズの始め方</h2>
      <ul className="list-disc pl-5 mb-4">
        <li>ホームページからお好きなジャンルのクイズをクリックしてください。</li>
        <li>表示された問題に対し、選択肢の牌をクリックして解答してください。</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">解答後の表示</h2>
      <p className="mb-4">
        解答後は正解・解説が表示されます。続けて次の問題に進むことができます。（トータルで10問）
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">成績確認</h2>
      <p className="mb-4">
        マイページから過去の成績を確認できます。正解数や履歴をもとに自分の学習進捗を把握することが可能です。
      </p>

      <p className="text-sm text-gray-500 mt-10">2025年09月16日 制定</p>
      <Footer />
    </div>
  );
};

export default Guide;
