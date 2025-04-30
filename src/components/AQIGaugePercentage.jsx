import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const AQIGaugePercentage = ({ percentage = 0 }) => {
  console.log("📊 Rendering AQIGaugeChartJS with percentage:", percentage);

  if (typeof percentage !== "number" || percentage < 0 || percentage > 100) {
    console.error("⚠️ Invalid percentage value received:", percentage);
    percentage = 0; // Reset to 0 to prevent errors
  }

  // Set gauge color based on AQI levels (Purple Shades)
  const gaugeColor =
    percentage <= 20 ? '#D8BFD8' : // Light Purple (Lavender)
    percentage <= 40 ? '#edd8ff' : // Medium Purple (Orchid)
    percentage <= 60 ? '#a684ff' : // Dark Orchid
    percentage <= 80 ? '#800080' : // Dark Purple
    '#b585e8'; // Deep Purple (Indigo)

    const data = {
      datasets: [
        {
          data: [percentage, 100 - percentage],
          backgroundColor: [gaugeColor, '#c5c5d8'],
          color: "#000000", // ✅ Explicitly define white text color
          borderWidth: 0,
          circumference: 180,
          rotation: 270,
        },
      ],
    };    

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allow custom height
    cutout: '65%', // Adjust the cutout for gauge thickness
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
  };

  // ✅ Custom plugin to draw a curved needle
  const needlePlugin = {
    id: "needle",
    beforeDraw: (chart) => {
      const { ctx, chartArea: { width, height } } = chart;
      const centerX = width / 2;
      const centerY = height - 10; // Position at bottom for half-circle gauge
      const needleLength = height / 2.2; // Adjust needle length
      const needleWidth = 6; // Width of the needle's base

      // Convert percentage (0-100) to radians (0-180 degrees)
      const angle = Math.PI * (1 - (percentage / 100));

      // Calculate needle tip position
      const needleTipX = centerX + needleLength * Math.cos(angle);
      const needleTipY = centerY - needleLength * Math.sin(angle);

      // Calculate base left and right points (for arc)
      const baseLeftX = centerX + (needleWidth / 2) * Math.cos(angle + Math.PI / 2);
      const baseLeftY = centerY - (needleWidth / 2) * Math.sin(angle + Math.PI / 2);
      const baseRightX = centerX + (needleWidth / 2) * Math.cos(angle - Math.PI / 2);
      const baseRightY = centerY - (needleWidth / 2) * Math.sin(angle - Math.PI / 2);

      // ✅ Draw the needle with a curved base
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(needleTipX, needleTipY);  // Needle tip
      ctx.lineTo(baseLeftX, baseLeftY);    // Base left

      // Create a smooth arc at the base of the needle
      ctx.quadraticCurveTo(centerX, centerY + 8, baseRightX, baseRightY);

      ctx.closePath();
      ctx.fillStyle = "black"; // Needle color
      ctx.fill();
      ctx.restore();
    },
  };

  return (
    <div className="h-[150px] absolute right-12 bottom-9 w-[180px] flex items-center justify-center overflow-hidden">
      <Doughnut data={data} options={options} plugins={[needlePlugin]} />
    </div>
  );
};

export default AQIGaugePercentage;