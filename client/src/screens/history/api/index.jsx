import { apiClient } from "../../../lib/api-client";
import { HISTORY_ROUTE } from "../../../utils/constants";


export const fetchBookingHistory = async (page) => {
  try {
    const result = await apiClient.get(HISTORY_ROUTE, {
      params: { page, size: 10 },
      withCredentials: true,
    });

    return {
      bookings: result.data.bookings || [],
      totalBookings: result.data.totalBookings || 0,
    };
  } catch (error) {
    throw new Error("Failed to fetch booking history.");
  }
};
