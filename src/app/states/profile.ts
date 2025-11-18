import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IProfile {
  isAuthenticated: boolean;
  token: string;
  id: string;
  setProfile: (token: string, id: string) => void;
  setAuthenticated: ({ value }: { value: boolean }) => void;
  logoutUser: () => void;
}

export const useProfile = create<IProfile>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      token: "",
      id: "",
      setProfile: (token, id) => {
        if (token && id) {
          set({ isAuthenticated: true, token, id });
        }
      },
      setAuthenticated: ({ value }: { value: boolean }) => {
        // Only update if we have a token, otherwise keep current state
        const currentState = get();
        if (value || currentState.token) {
          set({ isAuthenticated: value || !!currentState.token });
        }
      },
      logoutUser: () => {
        set({ isAuthenticated: false, token: "", id: "" });
      },
    }),
    { 
      name: "auth_store",
      // Ensure token persistence works correctly
      partialize: (state) => ({
        token: state.token,
        id: state.id,
        isAuthenticated: !!state.token, // Set authenticated based on token presence
      }),
      // Rehydrate and set authenticated state based on token
      onRehydrateStorage: () => (state) => {
        if (state && state.token) {
          state.isAuthenticated = true;
        }
      },
    }
  )
);
