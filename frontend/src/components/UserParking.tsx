import React from "react";
import "./UserParking.css";

interface UserParkingProps {
  spot: string;
  location: string;
  entryTime: string;
  remainingTime: string;
  vehicle: string;
}

const UserParking: React.FC<UserParkingProps> = ({
  spot,
  location,
  remainingTime,
  vehicle,
}) => {
  return (
    <div className="user-parking">
      <div className="user-parking-title">My Parking Spot</div>
      <div className="user-parking-content">
        <div className="user-parking-spot">
          <span>Spot </span>
          <span>{spot}</span>
        </div>
        <div className="user-parking-details">
          <div className="user-parking-detail">
            <span>Location: </span>
            <span>{location}</span>
          </div>
          <div className="user-parking-detail">
            <span>Vehicle: </span>
            <span>{vehicle}</span>
          </div>
          <div className="user-parking-detail">
            <span>Time Remaining: </span>
            <span>{remainingTime}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserParking;
