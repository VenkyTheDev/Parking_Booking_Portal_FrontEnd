import dayjs from "dayjs";
import { apiClient } from "../../../lib/api-client";
import { BOOKING_ROUTE, NEAREST_SLOT } from "../../../utils/constants";

export const bookParkingSlot = async (userId, parkingId, startTime, endTime, latitude, longitude) => {
  try {
    const response = await apiClient.post(
      BOOKING_ROUTE,
      { userId, parkingId, startTime, endTime, latitude, longitude },
      { withCredentials: true }
    );
    console.log("this is resp" , response);
    return response.data;
  } catch (error) {
    throw new Error("Failed to book parking.");
  }
};

export const getNearestSlot = async (parkingId, startTime, endTime) => {
  try {
    const response = await apiClient.post(NEAREST_SLOT, { parkingId, startTime, endTime });
    return response.data.replace("T", " ");
  } catch (error) {
    throw new Error("Failed to fetch nearest slot.");
  }
};

export const formatToLocalDateTime = (date, time) => {
  return dayjs(date).hour(time.hour()).minute(time.minute()).format("YYYY-MM-DDTHH:mm:ss");
};
