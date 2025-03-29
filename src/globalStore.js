import { create } from "zustand";

//used for state management
const useGlobalStore = create((set) => ({
  auth: false,
  setAuth: (newAuth) => set({ auth: newAuth }),
  authData: null,
  setAuthData: (newAuthData) => set({ authData: newAuthData }),
}));

export default useGlobalStore;
