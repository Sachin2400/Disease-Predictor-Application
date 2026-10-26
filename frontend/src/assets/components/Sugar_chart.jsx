import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Sugar_chart({ chartData }) {
  const after = chartData?.after || [];
  const before = chartData?.before || [];
  const date = chartData?.date || [];

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index",
      intersect: false,
    },
    stacked: false,
    plugins: {
      title: {
        display: true,
        text: "Glucose Breakfast",
      },
    },
    scales: {
      y: {
        type: "linear",
        display: true,
        position: "left",
        grid: {
          display: false,
        },
      },
    },
    elements: {
      line: {
        tension: 0.4,
      },
    },
  };

  const data = {
    labels: date,
    datasets: [
      {
        label: "Before Breakfast",
        data: before,
        borderColor: "rgba(0, 205, 145, 0.8)",
        backgroundColor: "rgba(0, 205, 145, 0.1)",
        yAxisID: "y",
      },
      {
        label: "After Breakfast",
        data: after,
        borderColor: "rgba(84, 18, 255, 0.8)",
        backgroundColor: "rgba(84, 18, 255, 0.1)",
        yAxisID: "y",
      },
    ],
  };

  return <Line options={options} data={data} height={200} />;
}
