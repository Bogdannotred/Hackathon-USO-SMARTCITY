import React from "react";
import "./ParkingSpot.css";
import { useParkingSpotsStore } from "../storage/parking-storage";

interface ParkingSpotProps {
  id: number;
  number: string;
  status: "available" | "occupied";
  onViewDetails?: () => void;
}

const ParkingSpot: React.FC<ParkingSpotProps> = ({
  id,
  number,
  status,
  onViewDetails,
}) => {
    const setParkingSpotStatus = useParkingSpotsStore(
      (state) => state.setParkingSpotStatus,
    );
  
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
      <button onClick={() => setParkingSpotStatus(id, status === "available" ? "occupied" : "available")}>Toggle Status</button>
    </div>
  );
};

export default ParkingSpot;
