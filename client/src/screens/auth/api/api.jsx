import { apiClient } from "../../../lib/api-client";
import { GET_ALL_ORGANISATIONS, LOGIN_ROUTE } from "../../../utils/constants";



export const login = async (email, password) => {
  return apiClient.post(LOGIN_ROUTE, { email, password });
};

export const signup = async (name, email, password, organisationId) => {
  return apiClient.post(SIGNUP_ROUTE, { name, email, password, organisationId }, { withCredentials: true });
};

export const fetchOrganisations = async () => {
  return apiClient.get(GET_ALL_ORGANISATIONS);
};
