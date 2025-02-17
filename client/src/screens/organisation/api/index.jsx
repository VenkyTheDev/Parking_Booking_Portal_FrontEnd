import { apiClient } from "../../../lib/api-client";
import { ADD_ORGANISATION } from "../../../utils/constants";

export const addOrganisation = async (organisationData) => {
  try {
    const response = await apiClient.post(ADD_ORGANISATION, organisationData);
    return response.data;
  } catch (error) {
    console.error("Error adding organisation:", error);
    throw error;
  }
};
