import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { generateStorage } from './storage-engine'

interface ParkingSpot {
    id: number;
    number: string;
    status: "available" | "occupied";
}

interface ParkingSpotsStore {
    parkingSpots: ParkingSpot[];
    setParkingSpotStatus: (id: number, status: "available" | "occupied") => void;
}

export const useParkingSpotsStore = create(
  persist<ParkingSpotsStore>(
    (set, get) => ({
      parkingSpots: [
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
        ],
        setParkingSpotStatus: (id: number, status: "available" | "occupied") => {
          set((state) => {
            const updatedSpots = state.parkingSpots.map((spot) =>
              spot.id === id ? { ...spot, status } : spot,
            );
            return { parkingSpots: updatedSpots };
          });
        }
    }),
    {
      name: 'parking-spots', // unique name
      storage: createJSONStorage(() => generateStorage('parking-spots')),
    },
  ),
)
