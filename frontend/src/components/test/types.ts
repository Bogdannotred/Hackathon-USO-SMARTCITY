export interface User {
  name: string;
  email: string;
  avatar: string;
}

export interface ParkingSpotData {
  id: string | number;
  number: string;
  status: "available" | "occupied";
  location?: string;
}

export interface MyParkingData {
  spot: string;
  location: string;
  entryTime: string;
  remainingTime: string;
  vehicle: string;
}

export interface ParkingHistoryEntry {
  id: number;
  spot: string;
  entryTime: string;
  exitTime: string | null;
  vehicle: string;
  location?: string;
  remainingTime?: string;
}

export interface RemainingTimeEntry {
  spot: string;
  remainingTime: string;
}
