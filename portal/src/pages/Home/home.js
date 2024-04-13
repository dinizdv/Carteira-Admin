// // BarChart.js
// import React, { useEffect } from 'react';
// import Chart from 'chart.js/auto';

// const BarChart = () => {
//     useEffect(() => {
//         const charts = document.querySelectorAll(".chart");

//         charts.forEach(function (chart) {
//             var ctx = chart.getContext("2d");
//             var myChart = new Chart(ctx, {
//                 type: "bar",
//                 data: {
//                     labels: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
//                     datasets: [
//                         {
//                             label: "% de frequência",
//                             data: [92, 90, 88, 94, 97, 99, 87, 91, 90, 89, 100],
//                             backgroundColor: [
//                                 "rgba(255, 99, 132, 0.2)",
//                                 "rgba(54, 162, 235, 0.2)",
//                                 "rgba(255, 206, 86, 0.2)",
//                                 "rgba(75, 192, 192, 0.2)",
//                                 "rgba(153, 102, 255, 0.2)",
//                                 "rgba(255, 159, 64, 0.2)",
//                                 "rgba(255, 99, 132, 0.2)",
//                                 "rgba(54, 162, 235, 0.2)",
//                                 "rgba(255, 206, 86, 0.2)",
//                                 "rgba(75, 192, 192, 0.2)",
//                                 "rgba(153, 102, 255, 0.2)",
//                                 "rgba(255, 159, 64, 0.2)",
//                             ],
//                             borderColor: [
//                                 "rgba(255, 99, 132, 1)",
//                                 "rgba(54, 162, 235, 1)",
//                                 "rgba(255, 206, 86, 1)",
//                                 "rgba(75, 192, 192, 1)",
//                                 "rgba(153, 102, 255, 1)",
//                                 "rgba(255, 159, 64, 1)",
//                                 "rgba(255, 99, 132, 1)",
//                                 "rgba(54, 162, 235, 1)",
//                                 "rgba(255, 206, 86, 1)",
//                                 "rgba(75, 192, 192, 1)",
//                                 "rgba(153, 102, 255, 1)",
//                                 "rgba(255, 159, 64, 1)",
//                             ],
//                             borderWidth: 2,
//                         },
//                     ],
//                 },
//                 options: {
//                     scales: {
//                         y: {
//                             beginAtZero: true,
//                         },
//                     },
//                 },
//             });
//         });
//     }, []);

//     return (
//         <div>
//             <canvas className="chart"></canvas>
//         </div>
//     );
// };

// export default BarChart;
