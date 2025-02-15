import { apiClient } from "../../../lib/api-client";
import { ADD_PROFILE_IMAGE_ROUTE, REMOVE_PROFILE_IMAGE_ROUTE, UPDATE_PROFILE_ROUTE } from "../../../utils/constants";


export const updateProfile = async (userId, updateData) => {
  try {
    const response = await apiClient.put(`${UPDATE_PROFILE_ROUTE}/${userId}`, updateData, {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    throw new Error("Failed to update profile.");
  }
};

export const uploadProfileImage = async (userId, file) => {
  if (!file) return;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("userId", userId);

  try {
    const response = await apiClient.post(ADD_PROFILE_IMAGE_ROUTE, formData, {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    throw new Error("Failed to update image.");
  }
};

export const deleteProfileImage = async (userId) => {
  try {
    const response = await apiClient.delete(REMOVE_PROFILE_IMAGE_ROUTE, {
      params: { userId },
    });

    return response.data;
  } catch (error) {
    throw new Error("Failed to remove image.");
  }
};
