import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../libs/api";
import Footer from "../components/Footer";

const Result = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const total = state?.total || 0;
  const category = state?.category || "ノーマル/ランダム";
  const correct = state?.correctCount || 0;
  const quizSessionId = state?.quizSessionId;

  // 成績更新
  useEffect(() => {
    const update = async () => {
      if (!quizSessionId) return;
      try {
        await api.put(`/api/v1/quiz_sessions/${quizSessionId}`, { correct_count: correct });
      } catch (e) {
        console.error("Failed to update QuizSession:", e);
      }
    };
    if (quizSessionId && correct >= 0) update();
  }, [quizSessionId, correct]);

  // 日付
  const today = useMemo(() => {
    const d = new Date();
    const pad = (n) => String(n).padStart(2, "0");
    return `${d.getFullYear()}/${pad(d.getMonth() + 1)}/${pad(d.getDate())}`;
  }, []);

  // メッセージ（10問前提）
  const feedback = useMemo(() => {
    if (correct === 10) return "極めし者。";
    if (correct >= 8)  return "何切る上級者です！";
    if (correct >= 5)  return "中々ですね！";
    return "精進あるのみ！";
  }, [correct]);

  // ゲージ用パーセント & カウントアップ表示
  const percent = useMemo(() => (total > 0 ? Math.round((correct / total) * 100) : 0), [correct, total]);
  const [animPercent, setAnimPercent] = useState(0);
  useEffect(() => {
    let raf; 
    const start = performance.now();
    const dur = 700; // ms
    const tick = (t) => {
      const p = Math.min(1, (t - start) / dur);
      setAnimPercent(Math.round(percent * p));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [percent]);

  // スコアに応じて色味を変える（低/中/高/満点）
  const gaugeColor =
    correct === total ? "#f59e0b" : // amber-500
    correct >= Math.ceil(total * 0.7) ? "#22c55e" : // green-500
    correct >= Math.ceil(total * 0.4) ? "#3b82f6" : // blue-500
    "#ef4444"; // red-500

  const handleShare = async () => {
    const text = `「${category}」を${total}問中 ${correct}問 解きました！`;
    if (navigator.share) {
      try { await navigator.share({ text, title: "成績", url: location.origin }); } catch {}
    } else {
      await navigator.clipboard.writeText(text);
      alert("成績をコピーしました。お好きなアプリに貼り付けてください。");
    }
  };
  const handleHome = () => navigate("/");

  return (
    <div className="min-h-[100svh] bg-gradient-to-b from-white to-amber-50 text-black relative overflow-hidden">
      <style>{`
        @keyframes wind-fall {
          from { transform: translateY(0); }
          to   { transform: translateY(120vh); }
        }
        @keyframes wind-drift-left {
          0%,100% { transform: translateX(0); }
          50%     { transform: translateX(-18px); }
        }
        @keyframes wind-drift-right {
          0%,100% { transform: translateX(0); }
          50%     { transform: translateX(18px); }
        }
        @keyframes wind-rotate {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>

      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {Array.from({ length: 12 }).map((_, i) => {
          const left = (i * 8.5) % 100;           // 横位置（%）
          const delay = (i % 10) * 0.5;           // 開始ディレイ
          const fallDur = 7 + (i % 6) * 0.7;      // 落下時間（秒）
          const driftDur = 3.5 + (i % 4) * 0.5;   // 横ゆれ時間（秒）
          const drift = i % 2 === 0 ? "wind-drift-left" : "wind-drift-right";
          const sizeClass = i % 3 === 0 ? "text-7xl" : i % 3 === 1 ? "text-6xl" : "text-5xl";
          const char = ["東","南","西","北"][i % 4];

          return (
            // 1) 横ゆれ：translateX
            <span
              key={i}
              className={`absolute ${sizeClass} select-none`}
              style={{
                left: `${left}%`,
                top: `-10vh`, // 画面上からスタート
                animation: `${drift} ${driftDur}s ease-in-out ${delay}s infinite`,
              }}
            >
              {/* 2) 落下：translateY */}
              <span
                className="inline-block"
                style={{
                  animation: `wind-fall ${fallDur}s linear ${delay}s infinite`,
                }}
              >
                {/* 3) 回転：rotate */}
                <span
                  className="inline-block font-extrabold text-gray-800/10"
                  style={{
                    animation: `wind-rotate 6s linear infinite`,
                  }}
                >
                  {char}
                </span>
              </span>
            </span>
          );
        })}
      </div>


      <main className="relative z-10 px-4 pb-20 flex flex-col items-center justify-center">

        <h1 className="text-center text-4xl md:text-6xl font-extrabold tracking-widest mb-6">{category}</h1>

        <section className="w-[min(92vw,56rem)] bg-white/90 backdrop-blur rounded-2xl shadow-xl border p-6 md:p-8">
          {/* 上段：円形ゲージ + スコア */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center">
            {/* 円形プログレス（CSSのconic-gradientで描画） */}
            <div className="flex justify-center">
              <div
                className="relative w-36 h-36 md:w-44 md:h-44 rounded-full grid place-items-center"
                style={{
                  background: `conic-gradient(${gaugeColor} ${animPercent}%, #e5e7eb 0)`
                }}
                aria-hidden="true"
              >
                <div className="absolute inset-2 bg-white rounded-full grid place-items-center">
                  <div className="text-3xl md:text-4xl font-extrabold">{correct}</div>
                  <div className="text-xs md:text-sm text-gray-500">/ {total} 問</div>
                </div>
              </div>
            </div>

            {/* スコア文字 + フィードバック */}
            <div className="text-center md:text-left">
              <div className="text-[48px] md:text-[64px] font-extrabold leading-none">
                {correct}
                <span className="ml-2 text-2xl md:text-2xl font-bold">問 / {total}問中</span>
              </div>
              <div className="mt-3">
                <span className="inline-flex items-center rounded-2xl border-2 px-4 py-1.5 font-bold"
                  style={{ borderColor: gaugeColor, color: gaugeColor }}>
                  {feedback}
                </span>
              </div>
            </div>
          </div>

          {/* 仕切り */}
          <div className="mt-8 h-px w-full bg-gray-100" />

          {/* アクション */}
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={handleShare}
              className="bg-white border border-gray-300 px-6 py-2 rounded-full shadow hover:bg-gray-50 active:shadow-lg"
            >
              成績をシェア
            </button>
            <button
              onClick={handleHome}
              className="bg-white border border-gray-300 px-6 py-2 rounded-full shadow hover:bg-gray-50 active:shadow-lg"
            >
              トップページへ
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Result;
