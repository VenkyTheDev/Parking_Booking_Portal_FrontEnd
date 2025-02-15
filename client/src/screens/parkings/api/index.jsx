import { apiClient } from "../../../lib/api-client";
import { ALL_PARKINGS } from "../../../utils/constants";

/**
 * Fetch available parking spots based on end time.
 * @param {string} endTime - The selected end time for booking.
 * @returns {Promise<Array>} - List of parking spots.
 */
export const fetchParkingSpots = async (endTime) => {
  try {
    const response = await apiClient.get(`${ALL_PARKINGS}?endTime=${endTime}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch parking spots.");
  }
};
