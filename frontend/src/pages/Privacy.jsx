import React from "react";

const Privacy = () => {
  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold mb-6">プライバシーポリシー</h1>
      <p className="mb-4">
        本プライバシーポリシーは、当サービスにおけるユーザーの個人情報の取扱いについて定めるものです。
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">第1条（個人情報の収集方法）</h2>
      <p className="mb-4">
        当サービスでは、ユーザー登録の際にメールアドレス等の情報を収集する場合があります。
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">第2条（個人情報の利用目的）</h2>
      <ul className="list-disc pl-5 mb-4">
        <li>サービスの提供・運営のため</li>
        <li>ユーザーからのお問い合わせ対応のため</li>
        <li>不正利用防止のため</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">第3条（第三者提供）</h2>
      <p className="mb-4">
        当サービスは、法令に基づく場合を除き、本人の同意なく第三者に個人情報を提供することはありません。
      </p>

      <p className="text-sm text-gray-500 mt-10">2025年1月制定</p>
    </div>
  );
};

export default Privacy;
