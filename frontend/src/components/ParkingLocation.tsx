import React from "react";
import { ParkingSpotData } from "./types";

interface ParkingLocationProps {
  name: string;
  availableSpots: ParkingSpotData[];
  occupiedSpots: ParkingSpotData[];
  totalSpots: number;
  selectedSpot: ParkingSpotData | null;
  showSpotDetails: boolean;
  toggleSpotDetails: (spot: ParkingSpotData | null) => void;
  location: string;
  children?: React.ReactNode;
}

export const ParkingLocation: React.FC<ParkingLocationProps> = ({
  name,
  availableSpots,
  occupiedSpots,
  totalSpots,
  selectedSpot,
  showSpotDetails,
  toggleSpotDetails,
  location,
  children,
}) => {
  return (
    <div className="backdrop-blur-md rounded-3xl p-8 mb-6 border border-white/20 shadow-2xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-gray-700 font-bold text-xl flex gap-2">{name}</h2>
        <div className="py-2 px-4 rounded-xl text-gray-700 font-semibold">
          {availableSpots.length} / {totalSpots} spots
        </div>
      </div>

      <div className="flex flex-col gap-6">
        {children}

        <div className="relative">
          <h3 className="text-green-500 mb-4">Available Spots</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {availableSpots.map((spot) => (
              <div
                key={spot.id}
                className="p-6 rounded-2xl text-center text-white bg-green-500 border-2 border-white/20"
              >
                <div className="font-bold">{spot.number}</div>
                <div className="mt-2">Available</div>
                <button
                  onClick={() => toggleSpotDetails(spot)}
                  className="mt-2 border-none py-1 px-2 rounded bg-green-600 text-white text-sm"
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        </div>

        {showSpotDetails && (
          <div className="p-6 rounded-2xl mt-6 border border-green-100 bg-white">
            <h3 className="mb-4 text-gray-700 font-semibold">Spot Details</h3>
            <div className="mb-3 flex gap-2">
              <span>Location:</span>
              <span>{selectedSpot?.location || location}</span>
            </div>
            <div className="mb-3 flex gap-2">
              <span>Spot Number:</span>
              <span>{selectedSpot?.number}</span>
            </div>
            <div className="mb-3 flex gap-2">
              <span>Status:</span>
              <span className="text-green-500">Available</span>
            </div>
            <button
              onClick={() => toggleSpotDetails(null)}
              className="border-none py-2 px-4 rounded-lg bg-gray-200 text-gray-700"
            >
              Close
            </button>
          </div>
        )}

        <div>
          <h3 className="text-red-500 mb-4">Occupied Spots</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {occupiedSpots.map((spot) => (
              <div
                key={spot.id}
                className="p-6 rounded-2xl text-center text-white bg-red-500 border-2 border-white/20 opacity-80"
              >
                <div className="font-bold">{spot.number}</div>
                <div className="mt-2">Occupied</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
