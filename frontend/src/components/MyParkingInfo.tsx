import React from "react";
import { MyParkingData } from "./types";

interface MyParkingInfoProps {
  myParking: MyParkingData;
}

export const MyParkingInfo: React.FC<MyParkingInfoProps> = ({ myParking }) => {
  return (
    <div>
      <h3 className="text-gray-700 mb-4 font-semibold text-xl">
        My Parking Spot
      </h3>
      <div className="p-4 rounded-xl bg-blue-500 text-white mb-5">
        <div className="font-semibold mb-2 flex">
          <span>Spot </span>
          <span>{myParking.spot}</span>
        </div>
        <div className="opacity-90">
          <div className="mb-1 flex gap-1">
            <span>Location: </span>
            <span>{myParking.location}</span>
          </div>
          <div className="mb-1 flex gap-1">
            <span>Vehicle: </span>
            <span>{myParking.vehicle}</span>
          </div>
          <div className="flex gap-1">
            <span>Time Remaining: </span>
            <span>{myParking.remainingTime}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
