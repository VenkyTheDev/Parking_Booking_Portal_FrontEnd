// import { create } from "zustand";
// import { createAuthSlice } from "./slices/auth-slice";
// export const useAppStore = create()((...a) => ({
//     ...createAuthSlice(...a)
// }));

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createAuthSlice } from "./slices/auth-slice";

export const useAppStore = create(
  persist(
    (...a) => ({
      ...createAuthSlice(...a),
    }),
    {
      name: "app-storage", // LocalStorage key
      getStorage: () => localStorage, // Use localStorage (or sessionStorage)
    }
  )
);
