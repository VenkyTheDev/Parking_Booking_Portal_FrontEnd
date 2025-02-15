import { apiClient } from "../../../lib/api-client";
import { ADD_PARKING, ADD_PARKING_IMAGE } from "../../../utils/constants";


/**
 * Create a new parking spot.
 * @param {Object} parkingData - The parking data.
 * @returns {Promise<Object>} - Created parking details.
 */
export const addParking = async (parkingData) => {
  try {
    const response = await apiClient.post(ADD_PARKING, parkingData);
    return response.data;
  } catch (error) {
    throw new Error("Failed to add parking. Please try again.");
  }
};

/**
 * Upload an image for a parking spot.
 * @param {number} parkingId - The parking spot ID.
 * @param {File} image - The image file.
 * @returns {Promise<string>} - Uploaded image URL.
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
    throw new Error("Failed to upload image.");
  }
};
