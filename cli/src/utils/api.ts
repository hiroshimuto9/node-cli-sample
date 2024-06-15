import axios from "axios";

const API_URL = "http://localhost:8080";

export const login = async (name: string, email: string) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { name, email });
    return response.data;
  } catch (error: any) {
    throw new Error(
      (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        "An unknown error occurred"
    );
  }
};

export const checkAuth = async (): Promise<void> => {
  try {
    const response = await axios.get(`${API_URL}/check-auth`);
    if (!response.data.success) {
      throw new Error(response.data.message || "Not authenticated");
    }
  } catch (error: any) {
    throw new Error(
      (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        "An unknown error occurred"
    );
  }
};

export const logout = async () => {
  try {
    const response = await axios.post(`${API_URL}/logout`);
    return response.data;
  } catch (error: any) {
    throw new Error(
      (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        "An unknown error occurred"
    );
  }
};

export const shouldLogout = async (): Promise<boolean> => {
  try {
    const response = await axios.get(`${API_URL}/check-auth`);
    console.log("!response.data.success;", !response.data.success);
    return !response.data.success;
  } catch (error: any) {
    return false;
  }
};
