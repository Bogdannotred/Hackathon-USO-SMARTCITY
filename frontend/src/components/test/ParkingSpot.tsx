"use client";

import React from "react";
import { ParkingSpotData } from "./types";

interface ParkingSpotProps {
  spot: ParkingSpotData;
  status: "available" | "occupied";
  onClick: () => void;
}

export const ParkingSpot: React.FC<ParkingSpotProps> = ({
  spot,
  status,
  onClick,
}) => {
  const isAvailable = status === "available";

  return (
    <div
      className={`p-6 text-center rounded-2xl border-2 border-solid transition-all ease-in-out cursor-pointer border-white border-opacity-20 duration-[0.4s] ${
        isAvailable
          ? "shadow-[0_8px_20px_rgba(72,187,120,0.2)]"
          : "shadow-[0_8px_20px_rgba(245,101,101,0.2)] opacity-80"
      } text-[white]`}
    >
      <div className="text-2xl font-[bold]">{spot.number}</div>
      <div className="mt-2 text-sm">
        {isAvailable ? "Available" : "Occupied"}
      </div>

      {isAvailable && (
        <button
          className="px-2 py-1 mt-2 text-xs rounded cursor-pointer bg-white bg-opacity-20 border-[none] text-[white]"
          onClick={onClick}
        >
          View Details
        </button>
      )}
    </div>
  );
};
