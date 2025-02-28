import React, { useState, useEffect, useCallback } from 'react';
import { IoIosSearch } from "react-icons/io";

function CitySearch({ setCity }) {
  const [allCities, setAllCities] = useState([]);
  const [citySearchQuery, setCitySearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    fetch("/cities.json")
      .then((res) => res.json())
      .then((data) => {
        setAllCities(data.data || []);
      })
      .catch((error) => console.error("Error loading cities:", error));
  }, []);

  const getCitySuggestions = (query) => {
    if (!query) return [];
    return allCities
      .filter((cityObj) =>
        cityObj.city.toLowerCase().startsWith(query.toLowerCase())
      )
      .slice(0, 10);
  };

  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

  const debouncedFetch = useCallback(
    debounce((query) => {
      setSuggestions(getCitySuggestions(query));
    }, 300),
    [allCities]
  );

  useEffect(() => {
    debouncedFetch(citySearchQuery);
  }, [citySearchQuery, debouncedFetch]);

  const handleSelectCity = (selectedCityObj) => {
    setCity(selectedCityObj);
    setCitySearchQuery("");
    setSuggestions([]);
  };

  return (
    <div className="relative w-[22pc]">
      <input
        type="text"
        value={citySearchQuery}
        onChange={(e) => setCitySearchQuery(e.target.value)}
        placeholder="Search city..."
        className="rounded bg-slate-100 text-xs h-8 w-full pl-5 pr-3 py-2"
      />
      <button className="absolute inset-y-0 right-5 flex items-center">
        <IoIosSearch className="w-4 h-4 text-gray-500" />
      </button>
      {suggestions.length > 0 && (
        <ul className="absolute bg-white border border-gray-300 w-full mt-1 rounded shadow-lg max-h-60 z-50 overflow-y-auto custom-scrollbar">
          {suggestions.map((cityObj, index) => (
            <li
              key={index}
              className="p-2 text-sm hover:bg-gray-200 cursor-pointer"
              onClick={() => handleSelectCity(cityObj)}
            >
              {cityObj.city}, {cityObj.country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CitySearch;
