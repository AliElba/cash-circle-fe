import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { User } from "../model/clinet-models";
import { Preferences } from "@capacitor/preferences";
import { StorageConstants } from "../constants/constants";

const API_URL = "/api/auth"; // Use proxy path instead of full backend URL

interface AuthResponse {
  access_token: string;
}

/**
 * Registers a new user with the provided user data.
 * @param userData - The user data for registration.
 * @param headers - Optional headers for the request.
 * @returns The authentication response containing the JWT token.
 */
const register = async (
  userData: {
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
  },
  headers = {},
): Promise<AuthResponse> => {
  const token = await getToken();
  const response = await axios.post(`${API_URL}/register`, userData, {
    headers: {
      Authorization: `Bearer ${token}`,
      ...headers,
    },
  });
  return response.data;
};

/**
 * Logs in a user with the provided credentials.
 * @param credentials - The user's login credentials.
 * @returns The authentication response containing the JWT token.
 */
const login = async (credentials: { email: string; password: string }): Promise<AuthResponse> => {
  const response = await axios.post(`${API_URL}/login`, credentials);
  if (response.data.access_token) {
    console.log("Preference Token saving...");
    Preferences.set({ key: StorageConstants.token, value: response.data.access_token }).then(() => {
      console.log("Preference Token saved.");
    });
  }
  return response.data;
};

/**
 * Logs out the current user by removing the JWT token from local storage.
 */
const logout = (): void => {
  localStorage.removeItem("token");
};

/**
 * Retrieves the current user from the JWT token stored in local storage.
 * @returns The current user or null if no token is found.
 */
const getCurrentUser = async (): Promise<User | null> => {
  const { value: token } = await Preferences.get({ key: StorageConstants.token });
  if (token) {
    return jwtDecode(token);
  }
  return null;
};

/**
 * Retrieves the token from Capacitor Preferences.
 * @returns {Promise<string | null>}
 */
const getToken = async (): Promise<string | null> => {
  const { value: token } = await Preferences.get({ key: StorageConstants.token });
  return token;
};

export const authService = { register, login, logout, getCurrentUser, getToken };
