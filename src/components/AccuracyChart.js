import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import top from "../assets/topSale.svg";

// Register Chart.js components
ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  Filler
);

const AccuracyRateChart = (ctx) => {
  const data = {
    // labels: Array.from({ length: 20 }, (_, i) => `${(i + 1) * 1000}`), // Example X-axis labels
    labels: [
      "5k",
      "10k",
      "15k",
      "20k",
      "25k",
      "30k",
      "35k",
      "40k",
      "45k",
      "50k",
      "55k",
      "60k",
    ], // X-axis labels
    datasets: [
      {
        label: "Accuracy Rate",
        pointBackgroundColor: "#0056B3", // Point color

        pointBorderColor: "#ffffff", // White border around points
        pointStyle: "circle", // Point shape (circle)
        pointRadius: 6, // Point size
        pointHoverRadius: 8, // Hover size of points
        borderWidth: 1, // Line width,
        fill: true,
        tension: 0,
        pointRadius: 5,

        data: [20, 30, 40, 50, 80, 60, 70, 40, 60, 50, 70, 80], // Y-axis values

        fill: "start",
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 200);
          gradient.addColorStop(0, "rgba(120, 159, 245, 1.16)");
          gradient.addColorStop(1, "rgba(255, 255, 255, 0.18)");
          return gradient;
        },
        borderColor: "rgba(0, 86, 179, 1)",
      },
    ],
    // pointBackgroundColor: "#2563eb", // Point color
  };

  // Find the highest point for the arrow
  const maxValue = Math.max(...data.datasets[0].data);
  const maxIndex = data.datasets[0].data.indexOf(maxValue);

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // Hide legend
      },

      tooltip: {
        enabled: false, // Disable default tooltips
        external: (context) => {
          // Custom tooltip rendering
          let tooltipEl = document.getElementById("chartjs-tooltip");
          if (!tooltipEl) {
            tooltipEl = document.createElement("div");
            tooltipEl.id = "chartjs-tooltip";
            tooltipEl.style.position = "absolute";
            // tooltipEl.style.background = "white";
            tooltipEl.style.padding = "10px";
            // tooltipEl.style.bsorderRadius = "5px";
            // tooltipEl.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.2)";
            tooltipEl.style.pointerEvents = "none";
            tooltipEl.style.transform = "translate(-50%, -100%)";
            document.body.appendChild(tooltipEl);
          }

          const { tooltip } = context;
          if (tooltip.opacity === 0) {
            tooltipEl.style.opacity = 0;
            return;
          }

          // Set content for the tooltip
          const imageURL = top; // Example image URL
          tooltipEl.innerHTML = `
              <img src="${imageURL}" alt="Tooltip Image" />
          `;

          // Position the tooltip
          const position = context.chart.canvas.getBoundingClientRect();
          tooltipEl.style.left =
            position.left + window.pageXOffset + tooltip.caretX + "px";
          tooltipEl.style.top =
            position.top + window.pageYOffset + tooltip.caretY + "px";
          tooltipEl.style.opacity = 1;
        },
      },
    },
    scales: {
      x: {
        border: {
          display: false,
        },
        // display: false,

        grid: {
          drawBorder: false, // Remove X-axis line
          display: false, // Hide vertical grid lines
        },
        ticks: {
          display: true, // Show labels

          font: {
            size: 12,
            weight: "bold",
          },
          color: "#2B303466", // Set the color of the X-axis labels (example: red)
        },
      },
      y: {
        border: {
          display: false,
        },
        grid: {
          drawBorder: false, // Remove Y-axis line
          color: "#EAEAEA",

          // display: false, // Hide vertical grid lines

          // color: "#e5e7eb", // Light gray grid lines
        },
        ticks: {
          display: true, // Show labels
          stepSize: 20, // Define steps for Y-axis
          callback: function (value) {
            return value + "%"; // Add % symbol to Y-axis labels
          },
          color: "#2B303466", // Set the color of the X-axis labels (example: red)

          font: {
            size: 12,
            weight: "bold",
          },
        },
        beginAtZero: true,
        max: 100, // Set maximum Y-axis value to 100%
      },
    },
  };

  return (
    <div className="bg-gray-100 rounded-lg shadow-md p-6 mr-5 w-[60%]">
      {/* Header */}
      <div className="flex justify-between my-5">
        <h2 className="text-[24px] font-[700] text-gray-700 ">Accuracy Rate</h2>
        <select className="border border-gray-300 rounded-md p-2 text-[#2B303466] font-[600]">
          <option>November</option>
          <option>October</option>
        </select>
      </div>
      {/* Chart */}
      <div className="h-full ">
        <Line
          id="linechart"
          data={data}
          options={options}
          style={{ height: "100%", width: "100%" }}
        />
      </div>
    </div>
  );
};

export default AccuracyRateChart;
