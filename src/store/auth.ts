import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type Store = {
  loginResponse: any;
  setLoginResponse: (response: any) => void;
  setLogOut: () => void;
};

export const useAuth = create<Store>()(
  persist(
    (set) => ({
      loginResponse: null,
      setLoginResponse: (response) => set({ loginResponse: response }),
      setLogOut: () => set({ loginResponse: null }),
    }),
    {
      name: "user", // name of the item in storage (localStorage key)
      storage: createJSONStorage(() => localStorage), // specify storage method
    }
  )
);
