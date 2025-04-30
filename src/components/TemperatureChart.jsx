import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler, ChartDataLabels);

const FORECAST_URL = "https://api.openweathermap.org/data/2.5/forecast";
const API_KEY = "9059a8e2323b357c87efb2dfa85dc6ef";

const LineChartComponent = ({ city }) => {
  const [temperatureData, setTemperatureData] = useState([]);
  const [timeLabels, setTimeLabels] = useState([]);

  // Function to get the closest forecast entry to the current time
  const getClosestForecastIndex = (forecastList) => {
    const now = new Date();
    return forecastList.findIndex((entry) => {
      const entryTime = new Date(entry.dt * 1000);
      return entryTime > now;
    });
  };

  // Function to fetch weather forecast data
  const fetchForecastData = async () => {
    try {
      const forecastRes = await fetch(`${FORECAST_URL}?q=${city.city}&appid=${API_KEY}&units=metric`);
      if (!forecastRes.ok) throw new Error("Failed to fetch forecast data");

      const forecastData = await forecastRes.json();
      const forecastList = forecastData.list;

      if (!forecastList || forecastList.length === 0) {
        console.error("No forecast data available");
        return;
      }

      // Find the closest forecast index
      let startIndex = getClosestForecastIndex(forecastList);
      if (startIndex === -1) startIndex = 0; // Fallback if not found

      // Select 8 forecast entries at exact 3-hour intervals
      let selectedIndices = [];
      for (let i = 0; i < 8; i++) {
        const index = startIndex + i;
        if (index < forecastList.length) {
          selectedIndices.push(index);
        }
      }

      // Extract temperature and time labels
      const tempArray = selectedIndices.map((index) => forecastList[index]?.main.temp || null);
      const timeArray = selectedIndices.map((index) => {
        const entryDate = new Date(forecastList[index]?.dt * 1000);
        return entryDate.toLocaleTimeString("en-US", { hour: "numeric", hour12: true }); // Format as "8 PM"
      });

      setTemperatureData(tempArray);
      setTimeLabels(timeArray);
    } catch (error) {
      console.error("Error fetching forecast data:", error);
    }
  };

  // Fetch forecast data when city changes
  useEffect(() => {
    setTemperatureData([]); // Reset data when switching cities
    setTimeLabels([]);
    fetchForecastData();
  }, [city]); // Re-fetch when the city changes

  const data = {
    labels: timeLabels.length > 0 ? timeLabels : ["Loading..."],
    datasets: [
      {
        label: "Temp (°C)",
        data: temperatureData.length > 0 ? temperatureData : [0],
        fill: "start", // Ensures shading properly follows the curve
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
  
          if (!chartArea) return null;
  
          const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
          gradient.addColorStop(0, "rgba(136, 132, 216, 0.5)"); // Lighter near line
          gradient.addColorStop(1, "rgba(136, 132, 216, 0)"); // Fades out below
  
          return gradient;
        },
        borderColor: "#8884d8",
        tension: 0.4,
        pointBackgroundColor: "#8884d8",
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };
  
  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
      datalabels: {
        anchor: "end",
        align: "top",
        formatter: (value) => `${value.toFixed(0)}°C`,
        font: { size: 12 },
      },
    },
    scales: {
      y: {
        display: false,
        beginAtZero: false,
        ticks: { stepSize: 6 },
        grid: { display: false },
      },
      x: { grid: { display: false } },
    },
  };  

  return <Line data={data} options={options} />;
};

export default LineChartComponent;