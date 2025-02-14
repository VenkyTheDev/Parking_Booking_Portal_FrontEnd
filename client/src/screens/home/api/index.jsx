import dayjs from "dayjs";
import { apiClient } from "../../../lib/api-client";
import {
  CANCEL_BOOKING,
  GET_ACTIVE_BOOKING,
  RESCHEDULE_BOOKING,
} from "../../../utils/constants";

export const fetchActiveBookings = async () => {
  try {
    const response = await apiClient.get(GET_ACTIVE_BOOKING, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch active bookings.");
  }
};

export const rescheduleBooking = async (userId, bookingId, newEndTime) => {
  try {
    const currentDate = new Date(dayjs());
    const formattedDate = currentDate.toISOString().split("T")[0];
    const newDateTime = `${formattedDate}T${newEndTime}:00`;
    const response = await apiClient.post(RESCHEDULE_BOOKING, {
      userId,
      bookingId,
      newEndTime: newDateTime,
    });
    console.log("This is the response", response);
    return newDateTime;
  } catch (error) {
    throw new Error("Failed to reschedule booking.");
  }
};

export const cancelBooking = async (userId, bookingId) => {
  try {
    await apiClient.post(`${CANCEL_BOOKING}/${userId}`, bookingId);
  } catch (error) {
    throw new Error("Failed to cancel booking.");
  }
};
