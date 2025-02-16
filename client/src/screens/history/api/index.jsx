import { apiClient } from "../../../lib/api-client";
import { HISTORY_ROUTE } from "../../../utils/constants";


export const fetchBookingHistory = async (page) => {
  try {
    const result = await apiClient.get(HISTORY_ROUTE, {
      params: { page, size: 8 },
      withCredentials: true,
    });
    console.log("this is the result", result);
    return {
      bookings: result.data.bookings || [],
      totalBookings: result.data.totalBookings || 0,
    };
  } catch (error) {
    throw new Error("Failed to fetch booking history.");
  }
};
