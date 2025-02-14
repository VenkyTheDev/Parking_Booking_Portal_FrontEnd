import { apiClient } from "../../../lib/api-client";
import { FLAG_USER, GET_ALL_PROFILES } from "../../../utils/constants";

export const getAllProfiles = async (role) => {
  const response = await apiClient.post(GET_ALL_PROFILES, { role }, { withCredentials: true });
  return response.data;
};

export const flagUser = async (userId, days) => {
  return apiClient.post(`${FLAG_USER}/${userId}`, days);
};
