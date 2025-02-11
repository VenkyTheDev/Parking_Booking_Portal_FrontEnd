import axios from "axios";
import { HOST } from "../utils/constants";

export const apiClient = axios.create({
    baseURL: HOST,
    withCredentials: true, // Important for sending cookies with requests
    headers: {
        'Content-Type': 'application/json',
      },
});