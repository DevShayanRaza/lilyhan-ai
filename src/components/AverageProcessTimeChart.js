import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const AverageProcessingTimeChart = () => {
  // Data for the chart
  const data = {
    labels: [
      "First quarter of the year",
      "Second quarter of the year",
      "Third quarter of the year",
      "Fourth quarter of the year",
    ],
    datasets: [
      {
        label: "Detail 1",
        data: [5000, 4000, 8000, 6000],
        backgroundColor: "#0056B3", // Blue color
        barPercentage: 0.5, // Adjust bar width
        categoryPercentage: 0.5,
      },
      {
        label: "Detail 2",
        data: [3000, 2000, 4000, 3000],
        backgroundColor: "#19BA92", // Green color
        barPercentage: 0.5, // Adjust bar width
        categoryPercentage: 0.5,
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom", // Position of the legend
        align: "start",

        labels: {
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${
              tooltipItem.dataset.label
            }: ${tooltipItem.raw.toLocaleString()}`;
          },
        },
      },
    },
    scales: {
      // xAxes: [
      //   {
      //     categoryPercentage: 1.0,
      //     barPercentage: 1.0,
      //   },
      // ],
      x: {
        grid: {
          display: true, // Hide vertical grid lines
        },

        categoryPercentage: 0.2,
        barPercentage: 0.2,
        border: {
          display: false,
          dash: [2, 2],
        },
        ticks: {
          maxRotation: 0, // Prevent X-axis labels from curving
          minRotation: 0, // Prevent X-axis labels from curving
          font: {
            size: 8,
          },
        },
      },
      y: {
        grid: {
          // color: "#e5e7eb", // Light gray grid lines
        },
        border: {
          display: false,
          dash: [2, 2],
        },
        ticks: {
          stepSize: 1000,
          callback: function (value) {
            return value.toLocaleString(); // Format Y-axis values
          },
        },
      },
    },
  };

  return (
    <div className="bg-gray-100 rounded-lg shadow-md w-[50%] py-10 px-4">
      {/* Header */}
      <h2 className="text-xl font-bold text-gray-700 mb-2">
        Average Processing Time
      </h2>
      <p className="text-gray-500 mb-4">Secondary text</p>

      {/* Chart */}
      <div className="flex items-center justify-center w-full h-full">
        <Bar
          data={data}
          options={options}
          style={{ width: "100%", height: "100%" }}
        />
      </div>
    </div>
  );
};

export default AverageProcessingTimeChart;
