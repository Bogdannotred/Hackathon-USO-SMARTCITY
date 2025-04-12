"use client";

import React from "react";
import { ParkingSpot } from "./ParkingSpot";
import { SpotDetails } from "./SpotDetails";
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
}) => {
  return (
    <div className="p-8 my-6 rounded-3xl border border-solid shadow-2xl backdrop-blur-[10px] bg-white bg-opacity-90 border-white border-opacity-20 max-sm:p-5">
      <div className="flex justify-between items-center mb-6">
        <h2 className="gap-2 text-3xl font-bold text-gray-700">{name}</h2>
        <div className="px-4 py-2 text-lg font-semibold text-gray-700 rounded-xl bg-green-400 bg-opacity-10">
          <span>{availableSpots.length}</span>
          <span> / </span>
          <span>{totalSpots}</span>
          <span> spots</span>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <section className="mb-6">
          <h3 className="mb-4 text-xl text-green-400">Available Spots</h3>
          <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(120px,1fr))] max-sm:grid-cols-[repeat(2,1fr)]">
            {availableSpots.map((spot) => (
              <ParkingSpot
                key={spot.id}
                spot={spot}
                status="available"
                onClick={() => toggleSpotDetails({ ...spot, location })}
              />
            ))}
          </div>
        </section>

        {showSpotDetails && (
          <SpotDetails
            spot={selectedSpot}
            onClose={() => toggleSpotDetails(null)}
          />
        )}

        <section>
          <h3 className="mb-4 text-xl text-red-400">Occupied Spots</h3>
          <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(120px,1fr))] max-sm:grid-cols-[repeat(2,1fr)]">
            {occupiedSpots.map((spot) => (
              <ParkingSpot
                key={spot.id}
                spot={spot}
                status="occupied"
                onClick={() => {}}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
