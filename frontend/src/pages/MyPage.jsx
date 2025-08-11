import QuizHistory from "../components/QuizHistory";
import React, { useEffect, useState } from "react";
import RadarChart from "../components/RadarChart";
import api from "../libs/api";
import { useNavigate } from "react-router-dom";

const Mypage = () => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // ① 認証チェック
        const userResponse = await api.get("/api/v1/current_user");
        console.log("Current user:", userResponse.data);

        if (!userResponse.data.logged_in) {
          navigate("/login", { replace: true });
          return; // ログインしてない場合はここで終了
        }

        // ② チャートデータ取得
        const chartResponse = await api.get("/api/v1/charts");
        console.log("Chart data:", chartResponse.data);

        setChartData({
          labels: chartResponse.data.labels,
          datasets: [
            {
              label: "最新",
              data: chartResponse.data.current_data,
              backgroundColor: "rgba(54, 162, 235, 0.2)",
              borderColor: "rgba(54, 162, 235, 1)",
              pointBackgroundColor: "rgba(54, 162, 235, 1)",
            },
            {
              label: "前回",
              data: chartResponse.data.previous_data,
              backgroundColor: "rgba(255, 99, 132, 0.2)",
              borderColor: "rgba(255, 99, 132, 1)",
              pointBackgroundColor: "rgba(255, 99, 132, 1)",
            },
          ],
        });
      } catch (err) {
        console.error("Error fetching chart data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <div>
        {chartData ? (
          <RadarChart chartData={chartData} />
        ) : (
          <p>チャートデータがありません</p>
        )}
      </div>

      <div>
        <QuizHistory />
      </div>
    </>
  );
};

export default Mypage;
