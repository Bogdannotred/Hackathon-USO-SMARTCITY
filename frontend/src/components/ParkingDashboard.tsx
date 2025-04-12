import React, { useState } from "react";
import Header from "./Header";
import ParkingLocation from "./ParkingLocation";
import UserParking from "./UserParking";
import RemainingTime from "./RemainingTime";
import ParkingMap from "./ParkingMap";
import "./ParkingDashboard.css";

interface Spot {
  id: number | string;
  number: string;
  status: "available" | "occupied";
}

interface ParkingEntry {
  id: number;
  spot: string;
  entryTime: string;
  exitTime: string | null;
  vehicle: string;
  location?: string;
  remainingTime?: string;
}

const ParkingDashboard: React.FC = () => {
  const [availableSpots] = useState<Spot[]>([
    {
      id: 1,
      number: "A1",
      status: "available",
    },
    {
      id: 2,
      number: "A2",
      status: "occupied",
    },
    {
      id: 3,
      number: "B1",
      status: "available",
    },
    {
      id: 4,
      number: "B2",
      status: "available",
    },
    {
      id: 5,
      number: "C1",
      status: "occupied",
    },
  ]);

  const [parkingHistory] = useState<ParkingEntry[]>([
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

  const [myParking] = useState({
    spot: "A2",
    location: "Primari",
    entryTime: "2024-01-21 14:30",
    remainingTime: "45 minutes",
    vehicle: "B-123-XYZ",
  });

  // Filter spots for Primarie location
  const primarieAvailableSpots = availableSpots.filter(
    (spot) => spot.status === "available",
  );
  const primarieOccupiedSpots = availableSpots.filter(
    (spot) => spot.status === "occupied",
  );

  // Active parking entries (no exit time)
  const activeEntries = parkingHistory.filter(
    (entry) => entry.exitTime === null,
  );

  return (
    <div className="parking-dashboard">
      <Header />
      <main className="dashboard-content">
        <h1 className="dashboard-title">Smart Parking System</h1>

        <div className="dashboard-row">
          <div className="dashboard-column main-column">
            <div className="location-section">
              <div className="location-header">
                <div className="location-name">Parking primarie</div>
                <div className="location-count">
                  {primarieAvailableSpots.length} / {availableSpots.length}{" "}
                  spots
                </div>
              </div>
              <div className="location-content">
                <ParkingMap />

                <ParkingLocation
                  name="Parking primarie"
                  availableCount={primarieAvailableSpots.length}
                  totalCount={availableSpots.length}
                  availableSpots={primarieAvailableSpots}
                  occupiedSpots={primarieOccupiedSpots}
                  locationName="Primari"
                />
              </div>
            </div>
          </div>

          <div className="dashboard-column side-column">
            <UserParking
              spot={myParking.spot}
              location={myParking.location}
              entryTime={myParking.entryTime}
              remainingTime={myParking.remainingTime}
              vehicle={myParking.vehicle}
            />

            <RemainingTime
              title="Other Spots Remaining Time"
              entries={activeEntries}
            />
          </div>
        </div>

        <div className="dashboard-row">
          <div className="dashboard-column main-column">
            <ParkingLocation
              name="Parking Lotus"
              availableCount={3}
              totalCount={5}
              availableSpots={[
                { id: "L1", number: "L1", status: "available" },
                { id: "L2", number: "L2", status: "available" },
                { id: "L3", number: "L3", status: "available" },
              ]}
              occupiedSpots={[
                { id: "L4", number: "L4", status: "occupied" },
                { id: "L5", number: "L5", status: "occupied" },
              ]}
              locationName="Lotus"
            />
          </div>

          <div className="dashboard-column side-column">
            <RemainingTime
              title="Lotus - Remaining Time"
              entries={[
                { id: 1, spot: "L4", remainingTime: "30 minutes" },
                { id: 2, spot: "L5", remainingTime: "15 minutes" },
              ]}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default ParkingDashboard;
