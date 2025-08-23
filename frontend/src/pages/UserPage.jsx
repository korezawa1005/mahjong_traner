import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../libs/api";
import RadarChart from "../components/RadarChart";
import QuizHistory from "../components/QuizHistory";
import Footer from "../components/Footer";

const UserPage = () => {
  const { id } = useParams();
  const [chartData, setChartData] = useState(null);
  const [user, setUser] = useState(null);
  const [uLoading, setULoading] = useState(true);
  const [uError, setUError] = useState(null);
  const [cLoading, setCLoading] = useState(true);
  const [cError, setCError] = useState(null);

  useEffect(() => {
    let cancel = false;

    const fetchUser = async () => {
      try {
        setULoading(true);
        const res = await api.get(`/api/v1/users/${id}`);
        if (!cancel) setUser(res.data);
      } catch (e) {
        if (!cancel) setUError(e.message || "ユーザー取得に失敗しました");
      } finally {
        if (!cancel) setULoading(false);
      }
    };

    const fetchChart = async () => {
      try {
        setCLoading(true);
        const res = await api.get(`/api/v1/charts/${id}`);
        if (cancel) return;
        setChartData({
          labels: res.data.labels,
          datasets: [
            {
              label: "最新",
              data: res.data.current_data,
              backgroundColor: "rgba(54, 162, 235, 0.2)",
              borderColor: "rgba(54, 162, 235, 1)",
              pointBackgroundColor: "rgba(54, 162, 235, 1)",
            },
            {
              label: "前回",
              data: res.data.previous_data,
              backgroundColor: "rgba(255, 99, 132, 0.2)",
              borderColor: "rgba(255, 99, 132, 1)",
              pointBackgroundColor: "rgba(255, 99, 132, 1)",
            },
          ],
        });
      } catch (e) {
        if (!cancel) setCError(e.message || "チャート取得に失敗しました");
      } finally {
        if (!cancel) setCLoading(false);
      }
    };

    fetchUser();
    fetchChart();
    return () => { cancel = true; };
  }, [id]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-amber-50 text-black">
      <main className="flex-1 w-full max-w-[700px] mx-auto px-2 pt-6 pb-20 flex flex-col gap-6">

        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-center">
          {uLoading ? "ユーザー" : (user?.email || "ユーザー")} さんのページ
        </h1>
        {uError && (
          <p className="text-center text-red-600 text-sm">Error: {uError}</p>
        )}

        <section className="w-full bg-white/70 backdrop-blur rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8">
          <h2 className="text-lg font-semibold mb-3">成績レーダーチャート</h2>
          {cLoading ? (
            <div className="h-56 rounded-xl bg-gray-200/60 animate-pulse" />
          ) : cError ? (
            <p className="text-red-600 text-sm">Error: {cError}</p>
          ) : chartData ? (
            <RadarChart chartData={chartData} />
          ) : (
            <p className="text-gray-600 text-sm">チャートデータがありません</p>
          )}
        </section>

        <section className="w-full bg-[#fdf7ed] border border-gray-200 rounded-2xl shadow-sm p-6 sm:p-8">
          <h2 className="text-lg font-semibold mb-4">クイズ履歴</h2>
          <QuizHistory userId={id} />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default UserPage;
