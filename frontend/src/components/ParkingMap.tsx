import React from "react";
import { ParkingLocationInfo } from "./types";

interface ParkingMapProps {
  primaryLocation: ParkingLocationInfo;
  secondaryLocation: ParkingLocationInfo;
}

export const ParkingMap: React.FC<ParkingMapProps> = ({
  primaryLocation,
  secondaryLocation,
}) => {
  return (
    <div className="rounded-2xl overflow-hidden mb-6 relative h-[300px] border border-white/20 bg-slate-200">
      <img
        src="https://images.pexels.com/photos/681335/pexels-photo-681335.jpeg"
        alt="Parking locations map"
        className="w-full h-full object-cover"
      />

      <div className="absolute top-1/2 left-[30%] transform -translate-x-1/2 -translate-y-1/2 p-3 rounded-xl text-white backdrop-blur-sm border-2 border-white/30">
        <div className="font-semibold">{primaryLocation.name}</div>
        <div>{primaryLocation.availableSpots} spots available</div>
      </div>

      <div className="absolute top-[30%] right-[20%] transform -translate-x-1/2 -translate-y-1/2 p-3 rounded-xl text-white backdrop-blur-sm border-2 border-white/30">
        <div className="font-semibold">{secondaryLocation.name}</div>
        <div>{secondaryLocation.availableSpots} spots available</div>
      </div>
    </div>
  );
};
