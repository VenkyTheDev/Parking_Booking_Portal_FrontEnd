import { apiClient } from "../../../lib/api-client";
import { LOGOUT_ROUTE } from "../../../utils/constants";


export const logoutUser = async () => {
  try {
    await apiClient.post(LOGOUT_ROUTE);
    return true;
  } catch (error) {
    throw new Error("Logout failed. Please try again.");
  }
};
