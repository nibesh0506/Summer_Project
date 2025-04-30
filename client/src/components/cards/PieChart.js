import React, { useRef, useEffect } from "react";
import Chart from "chart.js/auto";

const PieChart = ({ available, sold }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");
    new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["Available", "Sold"],
        datasets: [
          {
            data: [available, sold],
            backgroundColor: ["#36A2EB", "#FF6384"],
            hoverBackgroundColor: ["#36A2EB", "#FF6384"],
          },
        ],
      },
    });
  }, [available, sold]);

  return <canvas ref={chartRef} />;
};

export default PieChart;
