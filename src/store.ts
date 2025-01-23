// store.ts
import {create} from 'zustand';

interface AuthState {
  isLoggedIn: boolean;
  login: (msg: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  login: (msg: string) => {
    console.log(msg)
    set({ isLoggedIn: true })
  },
  logout: () => set({ isLoggedIn: false }),
}));
