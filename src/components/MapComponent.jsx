import React, { useState } from "react";
import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import { BiTargetLock } from "react-icons/bi";
import "leaflet/dist/leaflet.css";

const LocationSelector = ({ onLocationSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState([20, 0]); // Default map center

  const handleSelect = (lat, lon) => {
    onLocationSelect(lat, lon);
    setIsOpen(false);
  };

  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setPosition([lat, lng]);
        handleSelect(lat, lng);
      },
    });
    return null;
  };

  return (
    <div>
      {/* Button to open the map modal */}
      <button
        className="bg-black/10 rounded-full p-1.5"
        onClick={() => setIsOpen(true)}
      >
        <BiTargetLock className="text-purple-900 text-lg" />
      </button>

      {/* Modal for the world map */}
      {isOpen && (
        <div className="absolute top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center z-[9999]">
          <div className="bg-white p-4 rounded-lg w-[80vw] h-[80vh] flex flex-col items-center">
            <h2 className="text-lg font-medium mb-3">Select a Location</h2>

            {/* Map Component */}
            <div className="w-full h-full">
              <MapContainer center={position} zoom={3} style={{ width: "100%", height: "100%" }}>
                <TileLayer
                    url="https://cartodb-basemaps-a.global.ssl.fastly.net/light_all/{z}/{x}/{y}{r}.png"
                />
                <LocationMarker />
              </MapContainer>
            </div>

            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md font-medium"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationSelector;