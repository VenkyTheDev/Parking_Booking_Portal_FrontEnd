import { apiClient } from "../../../lib/api-client";
import { BOOKING_ROUTE, NEAREST_SLOT } from "../../../utils/constants";


export const bookParking = async (bookingData) => {
  try {
    const response = await apiClient.post(BOOKING_ROUTE, bookingData, {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    throw new Error("Failed to book parking.");
  }
};

export const getNearestSlot = async (parkingId, startTime, endTime) => {
  try {
    const response = await apiClient.post(NEAREST_SLOT, {
      parkingId,
      startTime,
      endTime,
    });

    return new Date(response.data.replace("T", " "));
  } catch (error) {
    throw new Error("Failed to retrieve nearest slot.");
  }
};
