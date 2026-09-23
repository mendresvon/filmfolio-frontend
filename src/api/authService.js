import apiClient from "./apiClient.js";
import { normalizeApiError } from "./apiErrors.js";

export const registerUser = async (userData) => {
  try {
    const response = await apiClient.post("/auth/register", userData);
    return response.data;
  } catch (error) {
    throw normalizeApiError(error);
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await apiClient.post("/auth/login", credentials);
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
    }
    return response.data;
  } catch (error) {
    throw normalizeApiError(error);
  }
};
