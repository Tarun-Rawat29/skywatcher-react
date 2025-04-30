import React from "react";
import { FaArrowUpLong, FaArrowDownLong } from "react-icons/fa6";
import { IoMdCloudOutline } from "react-icons/io";
import WeatherIcon from "./WeatherIcon";

const formatDay = (timestamp) =>
  new Date(timestamp * 1000).toLocaleDateString("en-US", { weekday: "long" });

const capitalizeWords = (str) =>
  str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

const shortenDescription = (desc) => 
    desc.length > 6 ? desc.slice(0, 6).trim() + "..." : desc;

const processForecastData = (forecastData) => {
    if (!forecastData || !forecastData.list) return [];
  
    console.log("Full Forecast Data:", forecastData); 
  
    const dailyData = {};
  
    forecastData.list.forEach((entry) => {
      const day = formatDay(entry.dt); 
      const description = capitalizeWords(entry.weather?.[0]?.description ?? "No data");
  
      console.log("Entry:", entry.dt_txt, "Description:", description);
  
      if (!dailyData[day]) {
        dailyData[day] = {
          minTemp: entry.main?.temp ?? 0,
          maxTemp: entry.main?.temp ?? 0,
          descriptions: {}, 
        };
      } else {
        dailyData[day].minTemp = Math.min(dailyData[day].minTemp, entry.main.temp);
        dailyData[day].maxTemp = Math.max(dailyData[day].maxTemp, entry.main.temp);
      }
  
      if (!dailyData[day].descriptions[description]) {
        dailyData[day].descriptions[description] = 1;
      } else {
        dailyData[day].descriptions[description]++;
      }
    });
  
    Object.keys(dailyData).forEach((day) => {
      const descriptions = dailyData[day].descriptions;
      dailyData[day].description = Object.keys(descriptions).reduce((a, b) =>
        descriptions[a] > descriptions[b] ? a : b
      );
    });
  
    return Object.entries(dailyData).slice(0, 3);
  };  

const ForeCast = ({ weatherData }) => {
  const forecastList = processForecastData(weatherData);

  return (
    <div>
        <h2 className="font-semibold pl-7 pt-8">3 Days Forecast</h2>
        <div className="pl-7 pr-4 h-[15%] w-[100%] flex items-center justify-between mt-3">
        {forecastList.length > 0 ? (
            forecastList.map(([day, data], index) => (
                <div
                    key={index}
                    className="flex w-[17pc] border border-gray-200 drop-shadow-md rounded-xl justify-between bg-purple-50"
                >
                    {/* Temperature Section */}
                    <div className="bg-[#c3b3fb] h-[10vh] w-[50%] flex items-center pl-1.5 pr-2 justify-evenly rounded-xl">
                        <FaArrowUpLong className="text-purple-950" />
                        <p className="text-white font-medium">{Math.round(data.maxTemp)}</p>
                        <FaArrowDownLong className="text-purple-950" />
                        <p className="text-white font-medium">{Math.round(data.minTemp)}</p>
                    </div>
                    <div className="flex items-center justify-center photo">
                        <WeatherIcon description={data.description} />
                    </div>

                    {/* Weather & Date Section */}
                    <div className="flex items-center justify-center flex-col pr-4">
                        <p className="text-purple-950 text-xs font-medium">{day}</p>
                        <p className="text-purple-950 font-normal text-xs"> {shortenDescription(data.description)}</p>
                    </div>
                </div>
            ))
        ) : (
          <p className="text-gray-500">No forecast data available.</p>
        )}
      </div>
    </div>
  );
};

export default ForeCast;