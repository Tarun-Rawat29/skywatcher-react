import React from "react";
import { FaArrowUpLong, FaArrowDownLong } from "react-icons/fa6";

const formatTimeOnly = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString("en-US", {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true, 
    });
};

const WeatherHighlights = ({ weatherData, humidity, pressure }) => {
  return (
    <div>
      <h3 className="font-semibold pl-7 pt-7">Today's Highlights</h3>
      <div className="flex pl-7 pt-3 pr-4 items-center justify-between">
        {/* Humidity Card */}
        <div className="flex flex-col items-center h-[12vh] w-[18%] border border-gray-200 bg-purple-50 rounded-[15px] drop-shadow-md">
          <h5 className="text-xs pt-3 text-black/50">Humidity</h5>
          <h2 className="text-lg pt-3">{humidity} %</h2>
        </div>
        {/* Pressure Card */}
        <div className="flex flex-col items-center h-[12vh] w-[18%] border border-gray-200 bg-purple-50 rounded-[15px] drop-shadow-md">
          <h5 className="text-xs pt-3 text-black/50">Pressure</h5>
          <h2 className="text-lg pt-3">{pressure} hPa</h2>
        </div>
        {/* Wind Card */}
        <div className="flex flex-col items-center h-[12vh] w-[18%] border border-gray-200 bg-purple-50 rounded-[15px] drop-shadow-md">
          <h5 className="text-xs pt-3 text-black/50">Wind</h5>
          <h2 className="text-lg pt-3">{weatherData?.wind?.speed ?? "..."} km/h</h2>
        </div>
        {/* Sunrise & Sunset Card */}
        <div className="flex items-center flex-col h-[12vh] w-[38%] border border-gray-200 bg-purple-50 rounded-[15px] drop-shadow-md">
          <h5 className="text-xs pt-3 text-black/50">Sunrise & Sunset</h5>
          <div className="flex w-[86%] items-center justify-around pt-3.5">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-purple-300 rounded-full">
                <FaArrowUpLong className="text-xs text-white" />
              </div>
              <p className="text-lg">{weatherData ? formatTimeOnly(weatherData.sys.sunrise) : "..."}</p>
            </div>
            <div className="flex items-center gap-2 justify-between">
              <div className="p-2 bg-purple-300 rounded-full">
                <FaArrowDownLong className="text-xs text-white" />
              </div>
              <p className="text-lg">{weatherData ? formatTimeOnly(weatherData.sys.sunset) : "..."}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherHighlights;