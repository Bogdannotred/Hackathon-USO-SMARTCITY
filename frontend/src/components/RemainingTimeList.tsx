import React from "react";
import { RemainingTimeEntry } from "./types";

interface RemainingTimeListProps {
  entries: RemainingTimeEntry[];
}

export const RemainingTimeList: React.FC<RemainingTimeListProps> = ({
  entries,
}) => {
  return (
    <div className="flex flex-col gap-3">
      {entries.map((entry, index) => (
        <div
          key={index}
          className="p-3 rounded-lg border border-slate-200 bg-slate-50"
        >
          <div className="font-medium mb-1 flex gap-1">
            <span>Spot </span>
            <span>{entry.spot}</span>
          </div>
          <div className="text-slate-500 flex gap-1">
            <span>{entry.remainingTime}</span>
            {!entry.remainingTime.includes("remaining") && (
              <span> remaining</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
