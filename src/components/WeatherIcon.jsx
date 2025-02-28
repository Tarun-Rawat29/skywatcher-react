import React from "react";
import { FaSun, FaCloudSun, FaCloud, FaCloudShowersHeavy, FaSnowflake, FaBolt, FaSmog } from "react-icons/fa";

// Function to return the appropriate weather icon
const getWeatherIcon = (description) => {
  const lowerDesc = description.toLowerCase();

  if (lowerDesc.includes("clear sky")) return <FaSun className="text-2xl text-yellow-500" />;
  if (lowerDesc.includes("few clouds")) return <FaCloudSun className="text-2xl text-yellow-400" />;
  if (lowerDesc.includes("scattered clouds") || lowerDesc.includes("broken clouds")) return <FaCloud className="text-2xl text-gray-500" />;
  if (lowerDesc.includes("overcast clouds")) return <FaCloud className="text-2xl text-gray-700" />;
  if (lowerDesc.includes("rain") || lowerDesc.includes("drizzle")) return <FaCloudShowersHeavy className="text-2xl text-blue-500" />;
  if (lowerDesc.includes("thunderstorm")) return <FaBolt className="text-2xl text-yellow-600" />;
  if (lowerDesc.includes("snow")) return <FaSnowflake className="text-2xl text-blue-300" />;
  if (lowerDesc.includes("mist") || lowerDesc.includes("fog") || lowerDesc.includes("haze") || lowerDesc.includes("smoke")) return <FaSmog className="text-2xl text-gray-400" />;

  return <FaCloud className="text-2xl text-gray-500" />; // Default icon
};

const WeatherIcon = ({ description }) => {
  return getWeatherIcon(description);
};

export default WeatherIcon;