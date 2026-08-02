import { create } from "zustand";
import { persist } from "zustand/middleware";
import { UserStats } from "@/lib/badges";

interface AppState {
  theme: "dark" | "light";
  isOffline: boolean;
  setOffline: (status: boolean) => void;
  
  // Local Profile
  guestProfile: {
    pseudo: string;
    avatar: string;
    stats: UserStats;
  };
  updateGuestProfile: (updates: Partial<AppState["guestProfile"]>) => void;
  incrementStat: (statKey: keyof UserStats) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      theme: "dark",
      isOffline: false,
      setOffline: (status) => set({ isOffline: status }),
      
      guestProfile: {
        pseudo: `Guest_${Math.floor(Math.random() * 9000 + 1000)}`,
        avatar: "👻",
        stats: {
          gamesPlayed: 0,
          wins: 0,
          undercoverWins: 0,
          civilianWins: 0,
          totalPlayTimeMins: 0,
        }
      },
      
      updateGuestProfile: (updates) => set((state) => ({
        guestProfile: { ...state.guestProfile, ...updates }
      })),

      incrementStat: (statKey) => set((state) => ({
        guestProfile: {
          ...state.guestProfile,
          stats: {
            ...state.guestProfile.stats,
            [statKey]: state.guestProfile.stats[statKey] + 1
          }
        }
      })),
    }),
    {
      name: "vylo-local-storage",
    }
  )
);
