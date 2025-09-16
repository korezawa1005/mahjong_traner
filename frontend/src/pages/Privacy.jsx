import React from "react";
import Footer from '../components/Footer'

const Privacy = () => {
  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold mb-6">プライバシーポリシー</h1>

      <h2 className="text-xl font-semibold mt-6 mb-2">お客様から取得する情報</h2>
      <ul className="list-disc pl-5 mb-4">
        <li>メールアドレス</li>
        <li>
          外部サービスでお客様が利用するID、その他外部サービスのプライバシー設定によりお客様が連携先に開示を認めた情報
        </li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">お客様の情報を利用する目的</h2>
      <ul className="list-disc pl-5 mb-4">
        <li>当社サービスに関する登録の受付、お客様の本人確認、認証のため</li>
        <li>お客様の当社サービスの利用履歴を管理するため</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">安全管理のために講じた措置</h2>
      <p className="mb-4">
        当社が、お客様から取得した情報に関して安全管理のために講じた措置につきましては、
        お問い合わせ先にご連絡いただけましたら、法令の定めに従い個別にご回答させていただきます。
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">第三者提供</h2>
      <p className="mb-4">
        当社は、お客様から取得する情報のうち、個人データ（個人情報保護法第16条第3項に該当するもの）を、
        あらかじめお客様の同意を得ずに、第三者（日本国外にある者を含みます。）に提供しません。
        ただし、以下の場合を除きます。
      </p>
      <ul className="list-disc pl-5 mb-4">
        <li>個人データの取扱いを外部に委託する場合</li>
        <li>当社が当社サービスを買収された場合</li>
        <li>
          事業パートナーと共同利用する場合（その場合の利用目的や範囲については別途公表します）
        </li>
        <li>その他、法令により合法的に第三者提供が許されている場合</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">プライバシーポリシーの変更</h2>
      <p className="mb-4">
        当社は、必要に応じてこのプライバシーポリシーの内容を変更します。
        変更後のプライバシーポリシーについては、適切な方法で周知または通知いたします。
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">お問い合わせ</h2>
      <p className="mb-2">
        お客様の情報の開示、訂正、利用停止、削除をご希望の場合は、以下のメールアドレスにご連絡ください。
      </p>
      <p className="mb-4">e-mail: t.k.oshihiki@gmail.com</p>
      <p className="mb-4 text-sm">
        ご本人確認のため、運転免許証等のご提示をお願いする場合があります。<br />
        また、情報開示請求については1件あたり1,000円の事務手数料をいただきます。
      </p>

      <p className="text-sm text-gray-500 mt-10">2025年09月16日 制定</p>
      <Footer />
    </div>
    
  );
};

export default Privacy;
