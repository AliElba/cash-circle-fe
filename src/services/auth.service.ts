import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { Preferences } from "@capacitor/preferences";
import { StorageConstants } from "../constants/constants";
import { RegisterDto } from "../app/generated/api";

// Use proxy path (/api) setup on vite.config.ts instead of full backend URL
const API_URL = (import.meta.env.VITE_API_PROXY_URL || import.meta.env.VITE_API_URL || "") + "/auth";
//const API_URL = "/api/auth";

//const API_URL = "/api/auth";

interface AuthResponse {
  access_token: string;
}

/**
 * Registers a new user with the provided user data.
 * @param userData - The user data for registration.
 * @param headers - Optional headers for the request.
 * @returns The authentication response containing the JWT token.
 */
const register = async (userData: RegisterDto, headers = {}): Promise<AuthResponse> => {
  const token = await getToken();
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};

/**
 * Logs in a user with the provided credentials.
 * @param credentials - The user's login credentials.
 * @returns The authentication response containing the JWT token.
 */
const login = async (credentials: { phone: string; password: string }): Promise<AuthResponse> => {
  const response = await axios.post(`${API_URL}/login`, credentials);
  if (response.data.access_token) {
    await Preferences.set({ key: StorageConstants.token, value: response.data.access_token });
  }
  return response.data;
};

/**
 * Logs out the current user by removing the JWT token from local storage.
 */
const logout = async (): Promise<void> => {
  await Preferences.remove({ key: StorageConstants.token });
};

/**
 * Retrieves the current user from the JWT token stored in local storage.
 * @returns The current user or null if no token is found.
 */
const getCurrentUserId = async (): Promise<string | null> => {
  const { value: token } = await Preferences.get({ key: StorageConstants.token });

  console.log("getCurrentUserId:token: ", token);

  if (token) {
    const decodedToken: any = jwtDecode(token);
    console.log("getCurrentUserId:decodedToken.sub: ", decodedToken.sub);
    return decodedToken.sub || null;
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

export const authService = { register, login, logout, getCurrentUserId, getToken };
