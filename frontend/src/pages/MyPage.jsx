// src/pages/Mypage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../libs/api";
import RadarChart from "../components/RadarChart";
import QuizHistory from "../components/QuizHistory";
import Footer from "../components/Footer";

const Mypage = () => {
  const navigate = useNavigate();
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);

  useEffect(() => {
    const run = async () => {
      try {
        setLoading(true);

        // ① 認証チェック
        const userRes = await api.get("/api/v1/current_user");
        if (!userRes.data?.logged_in) {
          navigate("/login", { replace: true });
          return;
        }

        // ② チャートデータ取得
        const chartRes = await api.get("/api/v1/charts");
        setChartData({
          labels: chartRes.data.labels,
          datasets: [
            {
              label: "最新",
              data: chartRes.data.current_data,
              backgroundColor: "rgba(54, 162, 235, 0.2)",
              borderColor: "rgba(54, 162, 235, 1)",
              pointBackgroundColor: "rgba(54, 162, 235, 1)",
            },
            {
              label: "前回",
              data: chartRes.data.previous_data,
              backgroundColor: "rgba(255, 99, 132, 0.2)",
              borderColor: "rgba(255, 99, 132, 1)",
              pointBackgroundColor: "rgba(255, 99, 132, 1)",
            },
          ],
        });
      } catch (err) {
        setError(err.message || "取得に失敗しました");
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-amber-50 text-black">
      {/* Home と同じセンター幅 */}
      <main className="flex-1 w-full max-w-[700px] mx-auto px-2 pt-6 pb-20 flex flex-col gap-6">
        {/* タイトル */}
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-center">マイページ</h1>

        {/* レーダーチャート：前の見せ方（カードで囲わない・フル幅に近い） */}
        <section className="w-full">
          <h2 className="text-lg font-semibold mb-3">直近の成績</h2>
          {loading ? (
            <div className="h-56 rounded-xl bg-gray-200/60 animate-pulse" />
          ) : error ? (
            <p className="text-red-600 text-sm">Error: {error}</p>
          ) : chartData ? (
            <div className="bg-white/70 backdrop-blur rounded-xl border border-gray-200 p-4 sm:p-6">
              <RadarChart chartData={chartData} />
            </div>
          ) : (
            <p className="text-gray-600 text-sm">チャートデータがありません</p>
          )}
        </section>

        {/* 履歴：読みやすさ優先で軽めのカード */}
        <section className="w-full bg-[#fdf7ed] border border-gray-200 rounded-2xl shadow-sm p-6 sm:p-8">
          <h2 className="text-lg font-semibold mb-4">クイズ履歴</h2>
          <QuizHistory />
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Mypage;
