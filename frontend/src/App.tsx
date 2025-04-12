import React, { useState } from "react";
import { Header } from "./components/Header";
import { ParkingLocation } from "./components/ParkingLocation";
import { MyParkingInfo } from "./components/MyParkingInfo";
import { RemainingTimeList } from "./components/RemainingTimeList";
import { ParkingMap } from "./components/ParkingMap";
import {
  ParkingSpotData,
  MyParkingData,
  ParkingHistoryEntry,
  User,
} from "./components/types";

import "./HomeStyles.css"; 



const App: React.FC = () => {
  const [selectedSpot, setSelectedSpot] = useState<ParkingSpotData | null>(
    null,
  );
  const [showSpotDetails, setShowSpotDetails] = useState(false);

  const toggleSpotDetails = (spot: ParkingSpotData | null) => {
    setSelectedSpot(spot);
    setShowSpotDetails(!showSpotDetails);
  };

  const [myParking] = useState<MyParkingData>({
    spot: "A2",
    location: "Primari",
    entryTime: "2024-01-21 14:30",
    remainingTime: "45 minutes",
    vehicle: "B-123-XYZ",
  });

  const [user] = useState<User>({
    name: "John Doe",
    email: "john@example.com",
    avatar:
      "https://images.pexels.com/photos/4098343/pexels-photo-4098343.jpeg",
  });

  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const [availableSpots] = useState<ParkingSpotData[]>([
    {
      id: 1,
      number: "A1",
      status: "available",
      location: "Primari",
    },
    {
      id: 2,
      number: "A2",
      status: "occupied",
      location: "Primari",
    },
    {
      id: 3,
      number: "B1",
      status: "available",
      location: "Primari",
    },
    {
      id: 4,
      number: "B2",
      status: "available",
      location: "Primari",
    },
    {
      id: 5,
      number: "C1",
      status: "occupied",
      location: "Primari",
    },
  ]);

  const [parkingHistory] = useState<ParkingHistoryEntry[]>([
    {
      id: 1,
      spot: "A1",
      entryTime: "2024-01-20 10:30",
      exitTime: "2024-01-20 12:45",
      vehicle: "B-123-ABC",
      location: "Primari",
      remainingTime: "45 minutes",
    },
    {
      id: 2,
      spot: "B2",
      entryTime: "2024-01-20 09:15",
      exitTime: "2024-01-20 11:30",
      vehicle: "B-456-DEF",
    },
    {
      id: 3,
      spot: "C1",
      entryTime: "2024-01-20 08:00",
      vehicle: "B-789-GHI",
      exitTime: null,
    },
  ]);

  // Lotus parking spots
  const lotusAvailableSpots: ParkingSpotData[] = [
    { id: "L1", number: "L1", status: "available", location: "Lotus" },
    { id: "L2", number: "L2", status: "available", location: "Lotus" },
    { id: "L3", number: "L3", status: "available", location: "Lotus" },
  ];

  const lotusOccupiedSpots: ParkingSpotData[] = [
    { id: "L4", number: "L4", status: "occupied", location: "Lotus" },
    { id: "L5", number: "L5", status: "occupied", location: "Lotus" },
  ];

  const lotusRemainingTimes = [
    { spot: "L4", remainingTime: "30 minutes remaining" },
    { spot: "L5", remainingTime: "15 minutes remaining" },
  ];

  return (
    <div className="relative min-h-screen font-[Inter,system-ui,sans-serif]">
      <Header user={user} />

      <main className="max-w-[1200px] mx-auto my-0 p-8 max-sm:p-4">
        <h1 className="text-6xl font-extrabold text-center text-blue-950 mb-12 max-sm:mb-6 max-sm:text-3xl">
          Smart Parking System
        </h1>

        <div className="flex gap-5 max-md:flex-col">
          <section className="w-[70%] max-md:w-full">
            <ParkingLocation
              name="Parking primarie"
              availableSpots={availableSpots.filter(
                (spot) => spot.status === "available",
              )}
              occupiedSpots={availableSpots.filter(
                (spot) => spot.status === "occupied",
              )}
              totalSpots={availableSpots.length}
              selectedSpot={selectedSpot}
              showSpotDetails={
                showSpotDetails && selectedSpot?.location !== "Lotus"
              }
              toggleSpotDetails={toggleSpotDetails}
              location="Primari"
            >
              <ParkingMap
                primaryLocation={{
                  name: "Primarie",
                  availableSpots: availableSpots.filter(
                    (spot) => spot.status === "available",
                  ).length,
                }}
                secondaryLocation={{
                  name: "Lotus",
                  availableSpots: lotusAvailableSpots.length,
                }}
              />
            </ParkingLocation>
          </section>

          <aside className="w-[30%] ml-5 max-md:ml-0 max-md:w-full">
            <div className="p-6 mb-6 rounded-3xl border border-solid shadow-2xl backdrop-blur-[10px] bg-white bg-opacity-90 border-white border-opacity-20">
              <MyParkingInfo myParking={myParking} />

              <h3 className="text-xl font-semibold text-gray-700 mb-4">
                Other Spots Remaining Time
              </h3>
              <RemainingTimeList
                entries={parkingHistory
                  .filter((entry) => !entry.exitTime)
                  .map((entry) => ({
                    spot: entry.spot,
                    remainingTime: entry.remainingTime || "Unknown",
                  }))}
              />
            </div>
          </aside>
        </div>

        <div className="flex gap-5 max-md:flex-col">
          <section className="w-[70%] max-md:w-full">
            <ParkingLocation
              name="Parking Lotus"
              availableSpots={lotusAvailableSpots}
              occupiedSpots={lotusOccupiedSpots}
              totalSpots={
                lotusAvailableSpots.length + lotusOccupiedSpots.length
              }
              selectedSpot={selectedSpot}
              showSpotDetails={
                showSpotDetails && selectedSpot?.location === "Lotus"
              }
              toggleSpotDetails={toggleSpotDetails}
              location="Lotus"
            />
          </section>

          <aside className="w-[30%] ml-5 max-md:ml-0 max-md:w-full">
            <div className="p-6 mb-6 rounded-3xl border border-solid shadow-2xl backdrop-blur-[10px] bg-white bg-opacity-90 border-white border-opacity-20">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">
                Lotus - Remaining Time
              </h3>
              <RemainingTimeList
                entries={lotusRemainingTimes.map((entry) => ({
                  spot: entry.spot,
                  remainingTime: entry.remainingTime,
                }))}
              />
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default App;
