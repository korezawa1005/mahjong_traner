import React, { useEffect, useState } from "react";
import RadarChart from "../components/RadarChart";

const Mypage = ({ userId, sessionId }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    fetch(`/api/v1/radar_chart?user_id=${userId}&session_id=${sessionId}`)
      .then(res => res.json())
      .then(data => {
        setChartData({
          labels: data.labels,
          datasets: [{
            label: "ステータス",
            data: data.data,
          }]
        });
      });
  }, [userId, sessionId]);

  return (
    <div>
      {/* 他のマイページ要素 */}
      {chartData ? <RadarChart chartData={chartData} /> : <p>Loading...</p>}
    </div>
  );
};

export default Mypage;
