import React from "react";

const getVisibilityDescription = (visibility) => {
  if (visibility >= 10000) return { text: "Good Visibility", color: "bg-teal-200" };
  if (visibility >= 5000) return { text: "Moderate Visibility", color: "bg-teal-400" };
  if (visibility >= 1000) return { text: "Poor Visibility", color: "bg-teal-600" };
  return { text: "Very Poor Visibility", color: "bg-teal-800" };
};

const VisibilityComponent = ({ visibility }) => {
  if (visibility === undefined || visibility === null) {
    return <p className="text-gray-500">Visibility data unavailable.</p>;
  }

  const visibilityKm = (visibility / 1000).toFixed(0);
  const { text, color } = getVisibilityDescription(visibility);

  return (
    <div className={`mt-5 border border-gray-200 rounded-lg shadow-md flex justify-between h-[9vh] items-center w-[47%] ml-4 bg-blue-50`}>
      <div className="flex flex-col items-center">
        <h3 className="text-md font-medium ml-12 pb-0.5">Visibility (km)</h3>
        <p className="text-xs text-black/50 ml-12">{text}</p>
      </div>
      <p className={`p-2 text-white h-[100%] w-[20%] text-center text-3xl flex items-center justify-center rounded-r-lg ${color}`}>{visibilityKm}</p>
    </div>
  );
};

export default VisibilityComponent;