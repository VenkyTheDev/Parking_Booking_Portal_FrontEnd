import { apiClient } from "../../../lib/api-client";
import { ADD_PARKING_IMAGE, EDIT_PARKING } from "../../../utils/constants";


/**
 * Upload a new image for a parking spot.
 * @param {number} parkingId - The parking ID.
 * @param {File} image - The image file.
 * @returns {Promise<string>} - The uploaded image URL.
 */
export const uploadParkingImage = async (parkingId, image) => {
  const formData = new FormData();
  formData.append("file", image);
  formData.append("parkingId", parkingId);

  try {
    const response = await apiClient.post(ADD_PARKING_IMAGE, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data.parkingImage;
  } catch (error) {
    throw new Error("Failed to upload image. Please try again.");
  }
};

/**
 * Edit parking details.
 * @param {Object} parkingData - The updated parking data.
 * @returns {Promise<Object>} - The updated parking details.
 */
export const updateParking = async (parkingData) => {
  try {
    const response = await apiClient.put(EDIT_PARKING, parkingData, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to update parking details. Please try again.");
  }
};
