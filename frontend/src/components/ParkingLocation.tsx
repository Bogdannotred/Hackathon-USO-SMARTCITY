import React, { useState } from "react";
import ParkingSpot from "./ParkingSpot";
import SpotDetails from "./SpotDetails";
import "./ParkingLocation.css";

interface Spot {
  id: number | string;
  number: string;
  status: "available" | "occupied";
  location?: string;
}

interface ParkingLocationProps {
  name: string;
  availableCount: number;
  totalCount: number;
  availableSpots: Spot[];
  occupiedSpots: Spot[];
  locationName: string;
}

const ParkingLocation: React.FC<ParkingLocationProps> = ({
  name,
  availableCount,
  totalCount,
  availableSpots,
  occupiedSpots,
  locationName,
}) => {
  const [selectedSpot, setSelectedSpot] = useState<Spot | null>(null);
  const [showSpotDetails, setShowSpotDetails] = useState(false);

  const toggleSpotDetails = (spot: Spot) => {
    setSelectedSpot({
      ...spot,
      location: locationName,
    });
    setShowSpotDetails(true);
  };

  const closeSpotDetails = () => {
    setShowSpotDetails(false);
    setSelectedSpot(null);
  };

  return (
    <div className="parking-location">
      <div className="location-header">
        <div className="location-name">{name}</div>
        <div className="location-count">
          {availableCount} / {totalCount} spots
        </div>
      </div>
      <div className="location-content">
        <div className="spots-container">
          <div className="available-spots-title">Available Spots</div>
          <div className="spots-grid">
            {availableSpots.map((spot) => (
              <ParkingSpot
                key={spot.id}
                id={spot.id}
                number={spot.number}
                status="available"
                onViewDetails={() => toggleSpotDetails(spot)}
              />
            ))}
          </div>
        </div>

        {showSpotDetails &&
          selectedSpot &&
          selectedSpot.location === locationName && (
            <SpotDetails
              location={locationName}
              number={selectedSpot.number}
              status="available"
              onClose={closeSpotDetails}
            />
          )}

        <div className="spots-container">
          <div className="occupied-spots-title">Occupied Spots</div>
          <div className="spots-grid">
            {occupiedSpots.map((spot) => (
              <ParkingSpot
                key={spot.id}
                id={spot.id}
                number={spot.number}
                status="occupied"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParkingLocation;
