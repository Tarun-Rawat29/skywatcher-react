import React, { useState, useEffect } from "react";
import AQIGaugePercentage from "./AQIGaugePercentage";

const AQIComponent = ({ lat, lon }) => {
  const [aqiData, setAqiData] = useState(null);
  const [percentageValue, setPercentageValue] = useState(null);
  const API_KEY = '9059a8e2323b357c87efb2dfa85dc6ef';

  useEffect(() => {
    if (lat && lon) {
      fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
        .then(response => response.json())
        .then(data => {
          if (data.list && data.list.length > 0) {
            const aqi = data.list[0].main.aqi;
            setAqiData(data.list[0]);
            const percentage = calculatePercentage(aqi);
            setPercentageValue(percentage);
          } else {
            setAqiData(null);
            setPercentageValue(null);
          }
        })
        .catch(error => {
          console.error("❌ Error fetching AQI:", error);
          setAqiData(null);
          setPercentageValue(null);
        });
    }
  }, [lat, lon]);

  const calculatePercentage = (aqi) => {
    switch (aqi) {
      case 1: return 10;  // Good
      case 2: return 30;  // Moderate
      case 3: return 50;  // Unhealthy for Sensitive Groups
      case 4: return 70;  // Unhealthy
      case 5: return 90;  // Very Unhealthy
      default: return null;
    }
  };

  const getAQIColor = (aqi) => {
    switch (aqi) {
      case 1: return "bg-purple-200";    // Good
      case 2: return "bg-violet-300";   // Moderate
      case 3: return "bg-purple-500";   // Unhealthy for Sensitive Groups
      case 4: return "bg-violet-600";      // Unhealthy
      case 5: return "bg-purple-700";   // Very Unhealthy
      default: return "bg-violet-800";    // Unknown
    }
  };

  return (
    <div className="mt-5 border ml-4 mr-4 border-gray-200 rounded-lg shadow-md bg-white flex items-center justify-around h-[21vh]">
      {/* ✅ AQI Information */}
      <div className="flex flex-col items-center mr-4">
        <h3 className="text-lg font-semibold">Air Quality Index</h3>
        {aqiData ? (
          <>
            <p className="text-xs text-gray-500">
              PM2.5: {aqiData.components?.pm2_5 || "N/A"}, PM10: {aqiData.components?.pm10 || "N/A"}
            </p>
            <div className={`mt-3 p-2 text-white w-[50px] h-[50px] flex items-center justify-center text-xl rounded-lg ${getAQIColor(aqiData.main.aqi)}`}>
              {aqiData.main.aqi}
            </div>
          </>
        ) : (
          <p className="text-red-500 mt-2">AQI data unavailable</p>
        )}
      </div>

      {/* ✅ AQI Gauge Chart (Moved to the Right) */}
      {percentageValue !== null && (
        <div className="h-[100px]">
          <AQIGaugePercentage percentage={percentageValue} />
        </div>
      )}
    </div>
  );
};

export default AQIComponent;