import React from "react";

const Terms = () => {
  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold mb-6">利用規約</h1>
      <p className="mb-4">
        本利用規約（以下、「本規約」といいます。）は、当サービスの利用条件を定めるものです。
        ユーザーの皆さま（以下、「ユーザー」といいます。）には、本規約に従ってサービスをご利用いただきます。
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">第1条（適用）</h2>
      <p className="mb-4">
        本規約は、ユーザーと当サービス運営者との間のサービス利用に関わる一切の関係に適用されます。
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">第2条（禁止事項）</h2>
      <ul className="list-disc pl-5 mb-4">
        <li>法令または公序良俗に違反する行為</li>
        <li>犯罪行為に関連する行為</li>
        <li>当サービスの運営を妨害する行為</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">第3条（免責事項）</h2>
      <p className="mb-4">
        当サービスの利用によって生じたいかなる損害についても、運営者は一切の責任を負いません。
      </p>

      <p className="text-sm text-gray-500 mt-10">2025年1月制定</p>
    </div>
  );
};

export default Terms;
