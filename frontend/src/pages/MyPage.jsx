import React, { useEffect, useState } from "react";
import RadarChart from "../components/RadarChart";
import api from "../libs/api";

const Mypage = () => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        setLoading(true);
        
        // 現在のユーザー確認（デバッグ用）
        const userResponse = await api.get('/api/v1/current_user');
        console.log('Current user:', userResponse.data);
        
        // チャートデータ取得
        const chartResponse = await api.get('/api/v1/charts');
        console.log('Chart data:', chartResponse.data);
        
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

    fetchChartData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>マイページ</h2>
      {chartData ? (
        <RadarChart chartData={chartData} />
      ) : (
        <p>チャートデータがありません</p>
      )}
    </div>
  );
};

export default Mypage;