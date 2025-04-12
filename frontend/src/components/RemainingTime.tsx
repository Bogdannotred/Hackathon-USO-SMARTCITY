import React from "react";
import "./RemainingTime.css";

interface ParkingEntry {
  id: number;
  spot: string;
  remainingTime?: string;
}

interface RemainingTimeProps {
  title: string;
  entries: ParkingEntry[];
}

const RemainingTime: React.FC<RemainingTimeProps> = ({ title, entries }) => {
  return (
    <div className="remaining-time">
      <div className="remaining-time-title">{title}</div>
      <div className="remaining-time-entries">
        {entries.map((entry) => (
          <div key={entry.id} className="remaining-time-entry">
            <div className="entry-spot">Spot {entry.spot}</div>
            <div className="entry-time">
              {entry.remainingTime
                ? `${entry.remainingTime} remaining`
                : "30 minutes remaining"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RemainingTime;
