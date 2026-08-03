import { create } from "zustand";
import { persist } from "zustand/middleware";
import { UserStats } from "@/lib/badges";

export interface SavedAccount {
  username: string;
  passwordHash: string;
  avatar: string;
  stats: UserStats;
}

export interface GroupPlayer {
  id: string;
  name: string;
  avatar?: string;
}

interface AppState {
  theme: "dark" | "light";
  isOffline: boolean;
  setOffline: (status: boolean) => void;

  // Saved Accounts (username -> Account)
  savedAccounts: Record<string, SavedAccount>;

  // Current Active Account (null if browsing as Guest)
  activeAccount: {
    username: string;
    avatar: string;
    stats: UserStats;
  } | null;

  // Guest fallback profile
  guestProfile: {
    pseudo: string;
    avatar: string;
    stats: UserStats;
  };

  // Active Team / Group roster for local games
  savedGroup: GroupPlayer[];

  setSavedGroup: (players: Array<{ id?: string; name: string; avatar?: string }>) => void;
  addPlayerToSavedGroup: (name: string, avatar?: string) => void;
  removePlayerFromSavedGroup: (id: string) => void;
  updatePlayerInSavedGroup: (id: string, newName: string, newAvatar?: string) => void;
  clearSavedGroup: () => void;

  updateGuestProfile: (updates: Partial<AppState["guestProfile"]>) => void;
  incrementStat: (statKey: keyof UserStats) => void;

  // Authentication actions
  registerAccount: (username: string, password: string) => { success: boolean; message: string };
  loginAccount: (username: string, password: string) => { success: boolean; message: string };
  logoutAccount: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      theme: "dark",
      isOffline: false,
      setOffline: (status) => set({ isOffline: status }),

      savedAccounts: {},
      activeAccount: null,
      savedGroup: [],

      guestProfile: {
        pseudo: `Guest_${Math.floor(Math.random() * 9000 + 1000)}`,
        avatar: "👻",
        stats: {
          gamesPlayed: 0,
          wins: 0,
          undercoverWins: 0,
          civilianWins: 0,
          totalPlayTimeMins: 0,
        },
      },

      setSavedGroup: (players) => {
        const formatted: GroupPlayer[] = players.map((p, idx) => ({
          id: p.id || `gp_${idx}_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
          name: p.name.trim(),
          avatar: p.avatar || "😎",
        })).filter(p => p.name.length > 0);

        set({ savedGroup: formatted });
      },

      addPlayerToSavedGroup: (name, avatar = "😎") => {
        const cleanName = name.trim();
        if (!cleanName) return;

        const state = get();
        const newPlayer: GroupPlayer = {
          id: `gp_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
          name: cleanName,
          avatar,
        };

        set({ savedGroup: [...state.savedGroup, newPlayer] });
      },

      removePlayerFromSavedGroup: (id) => {
        set((state) => ({
          savedGroup: state.savedGroup.filter((p) => p.id !== id),
        }));
      },

      updatePlayerInSavedGroup: (id, newName, newAvatar) => {
        const cleanName = newName.trim();
        if (!cleanName) return;

        set((state) => ({
          savedGroup: state.savedGroup.map((p) =>
            p.id === id ? { ...p, name: cleanName, avatar: newAvatar || p.avatar } : p
          ),
        }));
      },

      clearSavedGroup: () => set({ savedGroup: [] }),

      updateGuestProfile: (updates) =>
        set((state) => {
          const newProfile = { ...state.guestProfile, ...updates };

          if (state.activeAccount) {
            const username = state.activeAccount.username.toLowerCase();
            const existing = state.savedAccounts[username];
            if (existing) {
              const updatedAccount: SavedAccount = {
                ...existing,
                avatar: updates.avatar || existing.avatar,
                stats: updates.stats || existing.stats,
              };
              return {
                guestProfile: newProfile,
                activeAccount: {
                  username: existing.username,
                  avatar: updatedAccount.avatar,
                  stats: updatedAccount.stats,
                },
                savedAccounts: {
                  ...state.savedAccounts,
                  [username]: updatedAccount,
                },
              };
            }
          }

          return { guestProfile: newProfile };
        }),

      incrementStat: (statKey) =>
        set((state) => {
          const newStats = {
            ...state.guestProfile.stats,
            [statKey]: state.guestProfile.stats[statKey] + 1,
          };

          if (state.activeAccount) {
            const username = state.activeAccount.username.toLowerCase();
            const existing = state.savedAccounts[username];
            if (existing) {
              const updatedAccount: SavedAccount = {
                ...existing,
                stats: newStats,
              };
              return {
                guestProfile: { ...state.guestProfile, stats: newStats },
                activeAccount: { ...state.activeAccount, stats: newStats },
                savedAccounts: {
                  ...state.savedAccounts,
                  [username]: updatedAccount,
                },
              };
            }
          }

          return {
            guestProfile: {
              ...state.guestProfile,
              stats: newStats,
            },
          };
        }),

      registerAccount: (username, password) => {
        const cleanName = username.trim();
        if (!cleanName || cleanName.length < 3) {
          return { success: false, message: "Le nom d'utilisateur doit faire au moins 3 caractères." };
        }
        if (!password || password.length < 3) {
          return { success: false, message: "Le mot de passe doit faire au moins 3 caractères." };
        }

        const key = cleanName.toLowerCase();
        const state = get();

        if (state.savedAccounts[key]) {
          return { success: false, message: "Ce nom d'utilisateur est déjà pris !" };
        }

        const defaultAvatar = "👑";
        const initialStats: UserStats = {
          gamesPlayed: 0,
          wins: 0,
          undercoverWins: 0,
          civilianWins: 0,
          totalPlayTimeMins: 0,
        };

        const newAccount: SavedAccount = {
          username: cleanName,
          passwordHash: password,
          avatar: defaultAvatar,
          stats: initialStats,
        };

        set({
          savedAccounts: {
            ...state.savedAccounts,
            [key]: newAccount,
          },
          activeAccount: {
            username: cleanName,
            avatar: defaultAvatar,
            stats: initialStats,
          },
          guestProfile: {
            pseudo: cleanName,
            avatar: defaultAvatar,
            stats: initialStats,
          },
        });

        return { success: true, message: `Compte créé avec succès ! Bienvenue ${cleanName} 🎉` };
      },

      loginAccount: (username, password) => {
        const cleanName = username.trim();
        const key = cleanName.toLowerCase();
        const state = get();

        const account = state.savedAccounts[key];
        if (!account) {
          return { success: false, message: "Utilisateur introuvable. Vérifiez le nom ou créez un compte !" };
        }

        if (account.passwordHash !== password) {
          return { success: false, message: "Mot de passe incorrect !" };
        }

        set({
          activeAccount: {
            username: account.username,
            avatar: account.avatar,
            stats: account.stats,
          },
          guestProfile: {
            pseudo: account.username,
            avatar: account.avatar,
            stats: account.stats,
          },
        });

        return { success: true, message: `Bon retour parmi nous, ${account.username} ! 🟢` };
      },

      logoutAccount: () => {
        set({
          activeAccount: null,
          guestProfile: {
            pseudo: `Guest_${Math.floor(Math.random() * 9000 + 1000)}`,
            avatar: "👻",
            stats: {
              gamesPlayed: 0,
              wins: 0,
              undercoverWins: 0,
              civilianWins: 0,
              totalPlayTimeMins: 0,
            },
          },
        });
      },
    }),
    {
      name: "vylo-local-storage",
    }
  )
);
