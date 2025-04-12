import React from "react";
import "./SpotDetails.css";

interface SpotDetailsProps {
  location: string;
  number: string;
  status: "available" | "occupied";
  onClose: () => void;
}

const SpotDetails: React.FC<SpotDetailsProps> = ({
  location,
  number,
  status,
  onClose,
}) => {
  return (
    <div className="spot-details">
      <div className="spot-details-title">Spot Details</div>
      <div className="spot-details-row">
        <div>Location:</div>
        <div>{location}</div>
      </div>
      <div className="spot-details-row">
        <div>Spot Number:</div>
        <div>{number}</div>
      </div>
      <div className="spot-details-row">
        <div>Status:</div>
        <div className={`spot-status-${status}`}>
          {status === "available" ? "Available" : "Occupied"}
        </div>
      </div>
      <button onClick={onClose} className="close-details-button">
        Close
      </button>
    </div>
  );
};

export default SpotDetails;
