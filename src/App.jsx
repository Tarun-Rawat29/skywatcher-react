import React, { useState, useEffect } from 'react';
import Topbar from './components/TopBar';
import WeatherCard from './components/WeatherCard';
import fetchCityImage from './utils/fetchCityImage';
import TemperatureCard from './components/TemperatureChart';
import AQIComponent from './components/AQIComponent'; 
import './App.css';
import DewPoint from './components/DewPoint';
import Visibility from './components/Visibility';
import AQIGaugePercentage from "./components/AQIGaugePercentage";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [city, setCity] = useState({ city: 'Bhopal', country: 'India' });
  const [cityImage, setCityImage] = useState("");
  const [percentageValue, setPercentageValue] = useState(null);

  const API_URL = "https://api.openweathermap.org/data/2.5/weather";
  const FORECAST_URL = "https://api.openweathermap.org/data/2.5/forecast";
  const GEO_URL = "https://api.openweathermap.org/geo/1.0/reverse";
  const API_KEY = '9059a8e2323b357c87efb2dfa85dc6ef';

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const [weatherRes, forecastRes] = await Promise.all([
          fetch(`${API_URL}?q=${city.city}&appid=${API_KEY}&units=metric`),
          fetch(`${FORECAST_URL}?q=${city.city}&appid=${API_KEY}&units=metric`)
        ]);

        if (!weatherRes.ok || !forecastRes.ok) {
          throw new Error('Failed to fetch data');
        }

        const weatherData = await weatherRes.json();
        const forecastData = await forecastRes.json();

        setWeatherData({ ...weatherData, forecast: forecastData });
        setError(null);
      } catch (err) {
        console.error(err);
        setError(err.message);
      }
    };

    const fetchImage = async () => {
      const imageUrl = await fetchCityImage(city.city);
      setCityImage(imageUrl || "https://via.placeholder.com/600");
    };

    fetchWeather();
    fetchImage();
  }, [city, API_KEY]);

  const handleLocationSelect = async (lat, lon) => {
    try {
      const response = await fetch(`${GEO_URL}?lat=${lat}&lon=${lon}&limit=1&appid=${API_KEY}`);
      const locationData = await response.json();

      if (locationData.length > 0) {
        setCity({ city: locationData[0].name, country: locationData[0].country });
      }
    } catch (err) {
      console.error("Error fetching location:", err);
    }
  };

  const handleAQIChange = (percentage) => {
    setPercentageValue(percentage);
  };

  return (
    <div className="container flex flex-col h-[100%] w-[100%] items-center gap-1 relative">
      <Topbar setCity={setCity} />
      {error && <p className="text-red-600">Error: {error}</p>}
      <div className='lower flex w-[100%] h-[100%] gap-1'>
        <div className='left w-[60%] flex flex-col h-[100%]'>
          <WeatherCard city={city} weatherData={weatherData} cityImage={cityImage} onLocationSelect={handleLocationSelect} />
        </div>
        <div className='right w-[40%] h-[100%]'>
          <div className='top bg-white h-[52%] w-[100%] flex flex-col items-center'>
            <p className='font-semibold pt-3 pb-2'>Today's Temperature</p>
            <div className='h-[87%] w-[95%] border-2 drop-shadow-md border-gray-200 rounded-2xl flex items-center pb-4 justify-center bg-white'>
              <TemperatureCard city={city} />
            </div>
          </div>
          <div className='lower flex flex-col bg-white h-[48%] w-[100%]'>
            <div className='flex justify-between mt-4'>
                {/* Visibility Component */}
                {weatherData && weatherData.visibility && (
                  <Visibility visibility={weatherData.visibility} />
                )}

              {/* Dew Point Component */}
              {weatherData && weatherData.main && (
                <DewPoint temperature={weatherData.main.temp} humidity={weatherData.main.humidity} />
              )}
            </div>
            <div className='mt-4'>
              {/* AQI Component */}
              {weatherData && weatherData.coord && (
                  <AQIComponent lat={weatherData.coord.lat} lon={weatherData.coord.lon} />
                )}
              <div>
              {/* {percentageValue !== null && (
                <div className="flex justify-center mt-4">
                  <AQIGaugePercentage percentage={percentageValue} />
                </div>
              )} */}
            </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;