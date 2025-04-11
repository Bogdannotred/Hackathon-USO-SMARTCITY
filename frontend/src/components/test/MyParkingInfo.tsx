"use client";

import React from "react";
import { MyParkingData } from "./types";

interface MyParkingInfoProps {
  myParking: MyParkingData;
}

export const MyParkingInfo: React.FC<MyParkingInfoProps> = ({ myParking }) => {
  return (
    <section>
      <h3 className="mb-4 text-xl font-semibold text-gray-700">
        My Parking Spot
      </h3>
      <div className="p-4 mb-5 rounded-xl text-[white] bg-blue-500">
        <div className="mb-2 text-xl font-semibold">
          <span>Spot </span>
          <span>{myParking.spot}</span>
        </div>
        <div className="text-sm opacity-90">
          <div className="mb-1">
            <span>Location: </span>
            <span>{myParking.location}</span>
          </div>
          <div className="mb-1">
            <span>Vehicle: </span>
            <span>{myParking.vehicle}</span>
          </div>
          <div>
            <span>Time Remaining: </span>
            <span>{myParking.remainingTime}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
