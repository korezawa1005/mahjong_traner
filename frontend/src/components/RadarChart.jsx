import React from 'react';
import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const RadarChart = ({ chartData }) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      r: {
        beginAtZero: true,
        max: 100,
        ticks: {
          stepSize: 20
        }
      },
    },
  };

  return (
    <div className="w-full h-96">
      <h3 className="text-xl font-bold mb-4 text-center">スキルレーダーチャート</h3>
      <Radar data={chartData} options={options} />
    </div>
  );
};

export default RadarChart;


// // frontend/src/components/RadarChart.js
// import React, { useEffect, useState } from 'react';
// import { Radar } from 'react-chartjs-2';
// import {
//   Chart,
//   RadialLinearScale,
//   PointElement,
//   LineElement,
//   Filler,
//   Tooltip,
//   Legend
// } from 'chart.js';

// Chart.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

// const RadarChart = () => {
//   const [chartData, setChartData] = useState(null);

//   useEffect(() => {
//     fetch('http://localhost:3000/api/v1/chart_data')
//       .then(res => res.json())
//       .then(data => {
//         console.log("取得したデータ：", data); // ← 追加！
//         setChartData({
//           labels: data.labels,
//           datasets: [
//             {
//               label: 'ステータス',
//               data: data.data,
//               backgroundColor: 'rgba(34, 202, 236, 0.2)',
//               borderColor: 'rgba(34, 202, 236, 1)',
//               borderWidth: 2,
//             },
//           ],
//         });
//       });
//   }, []);

//   return chartData ? (
//     <div style={{ width: '50%', maxWidth: 400, marginLeft: 'auto' }}>
//       <Radar
//         data={chartData}
//         options={{
//           scales: {
//             r: {
//               min: 0,
//               max: 100,
//               ticks: {
//                 stepSize: 10,
//                 beginAtZero: true,
//               },
//               pointLabels: {
//                 font: {
//                   size: 14,
//                 },
//               },
//             },
//           },
//           responsive: true,
//           maintainAspectRatio: true, // ← 比率維持（true）または false にして自由サイズ
//         }}
//       />
//     </div>
//   ) : (
//     <p>Loading...</p>
//   );
  
// };

// export default RadarChart;
