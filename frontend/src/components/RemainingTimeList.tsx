"use client";

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
          className="p-3 rounded-lg border border-solid bg-slate-50 border-slate-200"
        >
          <div className="mb-1 font-medium">
            <span>Spot </span>
            <span>{entry.spot}</span>
          </div>
          <div className="text-sm text-slate-500">
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
