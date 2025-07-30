import QuizHistory from "../components/QuizHistory";
import RadarChart from "../components/RadarChart";
import api from "../libs/api";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";

const UserPage = () => {
  const { id } = useParams(); // URLからユーザーIDを取得
  const [chartData, setChartData] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  

  useEffect(() => {
    const fetchUserChartData = async () => {
      try {
        setLoading(true);

        // ユーザー情報取得
        const userResponse = await api.get(`/api/v1/users/${id}`);
        setUser(userResponse.data);

        // チャートデータ取得
        const chartResponse = await api.get(`/api/v1/charts/${id}`);
        setChartData({
          labels: chartResponse.data.labels,
          datasets: [
            {
              label: "最新",
              data: chartResponse.data.current_data,
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              borderColor: 'rgba(54, 162, 235, 1)',
              pointBackgroundColor: 'rgba(54, 162, 235, 1)',
            },
            {
              label: "前回", 
              data: chartResponse.data.previous_data,
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgba(255, 99, 132, 1)',
              pointBackgroundColor: 'rgba(255, 99, 132, 1)',
            }
          ]
        });
      } catch (err) {
        console.error('Error fetching chart data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserChartData();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <h1>{user?.email ?? "ユーザー"} さんのマイページ</h1>

      <div>
        {chartData ? (
          <RadarChart chartData={chartData} />
        ) : (
          <p>チャートデータがありません</p>
        )}
      </div>

      <div>
        <QuizHistory userId={id} />
      </div>
    </>
  );
};

export default UserPage;
