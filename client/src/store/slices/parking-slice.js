export const createParkingSlice = (set) => ({
    parkingInfo: undefined, // Store parking data (e.g., image, name, slots, location)
    setParkingInfo: (parkingInfo) => set({ parkingInfo }), // Action to update parkingInfo
  });
  