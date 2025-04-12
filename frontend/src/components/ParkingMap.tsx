import React from "react";
import "./ParkingMap.css";

const ParkingMap: React.FC = () => {
  return (
    <div className="parking-map">
      <img
        loading="lazy"
        alt="Parking locations map"
        src="https://images.pexels.com/photos/681335/pexels-photo-681335.jpeg"
        className="map-image"
      />
      <div className="map-location primarie">
        <div className="location-label">Primarie</div>
        <div className="location-spots">3 spots available</div>
      </div>
      <div className="map-location lotus">
        <div className="location-label">Lotus</div>
        <div className="location-spots">3 spots available</div>
      </div>
    </div>
  );
};

export default ParkingMap;
