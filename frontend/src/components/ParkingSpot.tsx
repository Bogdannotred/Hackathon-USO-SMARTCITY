import React from "react";
import "./ParkingSpot.css";

interface ParkingSpotProps {
  number: string;
  status: "available" | "occupied";
  onViewDetails?: () => void;
}

const ParkingSpot: React.FC<ParkingSpotProps> = ({
  number,
  status,
  onViewDetails,
}) => {
  return (
    <div className={`parking-spot ${status}`}>
      <div className="spot-number">{number}</div>
      <div className="spot-status">
        {status === "available" ? "Available" : "Occupied"}
      </div>
      {status === "available" && onViewDetails && (
        <button onClick={onViewDetails} className="view-details-button">
          View Details
        </button>
      )}
    </div>
  );
};

export default ParkingSpot;
