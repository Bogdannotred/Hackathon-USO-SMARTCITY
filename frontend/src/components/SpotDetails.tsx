"use client";

import React from "react";
import { ParkingSpotData } from "./types";

interface SpotDetailsProps {
  spot: ParkingSpotData | null;
  onClose: () => void;
}

export const SpotDetails: React.FC<SpotDetailsProps> = ({ spot, onClose }) => {
  if (!spot) return null;

  const isLotus = spot.location === "Lotus";

  return (
    <div
      className={`p-${isLotus ? "5" : "6"} mt-${isLotus ? "4" : "6"} rounded-${isLotus ? "xl" : "2xl"} border border-solid ${
        isLotus
          ? "animate-[fadeIn_0.3s_ease-in-out] bg-white bg-opacity-90 border-green-400 border-opacity-20 shadow-[0_4px_12px_rgba(0,0,0,0.1)]"
          : "border-slate-200 shadow-[0_8px_20px_rgba(0,0,0,0.1)]"
      }`}
    >
      <h3 className={`mb-4 text-2xl ${isLotus ? "text-gray-700" : ""}`}>
        Spot Details
      </h3>
      <div className="mb-3">
        <strong>Location:</strong> <span>{spot.location || "Primari"}</span>
      </div>
      <div className="mb-3">
        <strong>Spot Number:</strong> <span>{spot.number}</span>
      </div>
      <div className="mb-3">
        <strong>Status:</strong>{" "}
        <span className="text-green-400">Available</span>
      </div>
      <button
        className={`px-4 py-2 ${
          isLotus
            ? "font-medium rounded-lg transition-all cursor-pointer border-[none] duration-[0.2s] ease-[ease] text-[white] bg-blue-500"
            : "rounded-lg cursor-pointer bg-slate-200 border-[none]"
        }`}
        onClick={onClose}
      >
        {isLotus ? "Close Details" : "Close"}
      </button>
    </div>
  );
};
