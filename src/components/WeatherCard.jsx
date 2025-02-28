import React from "react";
import WeatherHighlights from "./WeatherHighlights";
import ForeCast from "./ForeCast";
import WeatherIcon from "./WeatherIcon";
import MapComponent from "./MapComponent"

const capitalizeWords = (str) =>
  str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

const formatDayTime = (timestamp) =>
  new Date(timestamp * 1000).toLocaleString("en-US", {
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true, 
  });

const WeatherCard = ({ city, cityImage, weatherData, onLocationSelect }) => {
  return (
    <div className="bg-white h-full w-full">
      {/* Location Info */}
      <h5 className="text-black/40 text-xs pt-4 pl-7">Current Location</h5>
      <div className="pl-7 pr-7 flex justify-between">
        <h3 className="font-semibold">
          {capitalizeWords(city.city)}, {capitalizeWords(city.country)}
        </h3>
        <MapComponent onLocationSelect={onLocationSelect} />
      </div>

      {/* Weather Card with Background Image & Backdrop */}
      <div
        className="relative rounded-xl z-10 overflow-hidden mt-2 ml-7 w-[60vh] h-[35vh]"
        style={{
          backgroundImage: `url(${cityImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Backdrop Overlay */}
        <div className="absolute inset-0 bg-black/20"></div>

        {/* Content */}
        <div className="relative z-10 flex justify-between text-white p-6">
          {/* Temperature */}
          <div>
            <p className="text-5xl font-semibold drop-shadow-xl">
              {weatherData?.main?.temp ? Math.round(weatherData.main.temp) + "°C" : "..."}
            </p>
          </div>

          {/* Date & Weather Info */}
          <div className="flex flex-col items-end">
            <p className="font-semibold">
              {weatherData?.dt ? formatDayTime(weatherData.dt) : "..."}
            </p>
            <div className="flex items-center gap-2">
              <WeatherIcon description={weatherData?.weather ? weatherData.weather[0].description : ""} />
              <p className="font-light text-sm">
                {weatherData?.weather ? capitalizeWords(weatherData.weather[0].description) : "..."}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Weather Highlights */}
      <WeatherHighlights
        weatherData={weatherData}
        humidity={weatherData?.main?.humidity ?? "..."}
        pressure={weatherData?.main?.pressure ?? "..."}
      />
      <ForeCast weatherData={weatherData?.forecast} />
    </div>
  );
};

export default WeatherCard;