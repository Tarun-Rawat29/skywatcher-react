import React from "react";

const calculateDewPoint = (temperature, humidity) => {
  // Magnus-Tetens Approximation Formula
  const a = 17.27;
  const b = 237.7;
  const alpha = ((a * temperature) / (b + temperature)) + Math.log(humidity / 100);
  const dewPoint = (b * alpha) / (a - alpha);

  return dewPoint.toFixed(0);
};

const getDewPointDescription = (dewPoint) => {
  if (dewPoint < 10) return { text: "Very dry and comfortable.", color: "bg-blue-200" };
  if (dewPoint < 15) return { text: "Comfortable.", color: "bg-blue-300" };
  if (dewPoint < 20) return { text: "Becoming noticeable.", color: "bg-blue-400" };
  if (dewPoint < 23) return { text: "Uncomfortable for many.", color: "bg-blue-500" };
  return { text: "Very uncomfortable.", color: "bg-blue-600" };
};

const DewPoint = ({ temperature, humidity }) => {
  if (!temperature || !humidity) {
    return <p className="text-gray-500">Dew Point data unavailable.</p>;
  }

  const dewPoint = calculateDewPoint(temperature, humidity);
  const { text, color } = getDewPointDescription(dewPoint);

  return (
    <div className={`mt-5 border mr-4 border-gray-200 rounded-lg shadow-md flex justify-between h-[9vh] items-center w-[44%] bg-blue-50`}> 
      <div className="flex flex-col items-center ml-7">
        <h3 className={`text-md font-medium`}>Dew Point (°C)</h3>
        <p className="text-xs text-black/50">{text}</p>
      </div>
        <p className={`p-2 text-white h-[100%] w-[20%] text-center text-3xl flex items-center justify-center rounded-r-lg ${color}`}>{dewPoint}</p>
      </div>
  );
};

export default DewPoint;