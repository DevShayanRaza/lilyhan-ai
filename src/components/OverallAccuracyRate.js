import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const OverallAccuracyRate = () => {
  const data = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Product 1",
        data: [4, 6, 3, 5, 8, 9, 4, 6, 5, 7, 6, 8],
        backgroundColor: "#0056B3", // Blue color for Product 1
        barPercentage: 0.3, // Adjust bar width
      },
      {
        label: "Product 2",
        data: [2, 4, 5, 6, 7, 8, 3, 5, 6, 8, 7, 5],
        backgroundColor: "#90BE6D", // Green color for Product 2
        barPercentage: 0.3, // Adjust bar width
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom", // Position the legend below the chart
        align: "start",

        labels: {
          usePointStyle: true, // Use circles for legend markers
        },
      },
      tooltip: {
        callbacks: {
          // Customize tooltips if needed
          label: function (context) {
            return `${context.dataset.label}: ${context.raw}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: true, // Hide vertical grid lines
        },
        border: {
          display: false,
          dash: [2, 2],
        },

        ticks: {
          //   align: "end",
          font: {
            size: 12,
          },

          //   align: "",
        },
      },
      y: {
        grid: {
          display: true, // Hide vertical grid lines
        },
        border: {
          display: false,
          dash: [2, 2],
        },
        beginAtZero: true,
        max: 10, // Set the maximum Y-axis value

        ticks: {
          //   padding: 10, // Add padding to space out the labels
          //   align: "start",

          stepSize: 1.25, // Adjust step size
          callback: function (value) {
            return value.toFixed(2); // Display values with 2 decimal places
          },

          font: {
            size: 12,
          },
        },
      },
    },
    layout: {
      padding: {
        left: 0, // Remove padding on the left
        right: 0,
        top: 0,
        bottom: 0,
      },
    },
  };

  return (
    <div className="bg-gray-100 rounded-lg shadow-md p-6 w-full">
      <h2 className="text-xl font-bold text-gray-700 mb-2">
        Overall Accuracy Rate
      </h2>
      <p className="text-gray-500 mb-4">Secondary text</p>
      <div className="h-full w-full">
        <Bar data={data} options={options} className="w-full" />
      </div>
    </div>
  );
};

export default OverallAccuracyRate;
