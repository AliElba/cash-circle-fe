import React, { createContext, ReactNode, useEffect, useState } from "react";
import { authService } from "../../services/auth.service";

interface AuthContextProps {
  userId: string | null;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  register: (userData: { email: string; password: string; firstName?: string; lastName?: string }) => Promise<void>;
  logout: () => void;
}

/**
 * Provides the authentication context to the application.
 * example usage: const { user, login, register, logout } = useContext(AuthContext);
 */
export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const extractCurrentUserId = async () => {
      const currentUser = await authService.getCurrentUserId();
      setUserId(currentUser);
      console.log("currentUser", currentUser);
    };
    extractCurrentUserId().then(() => console.log("extractCurrentUserId done"));
  }, []);

  /**
   * Logs in a user and updates the authentication state.
   * @param credentials - The user's login credentials.
   */
  const login = async (credentials: { email: string; password: string }) => {
    await authService.login(credentials);
    setUserId(await authService.getCurrentUserId());
  };

  /**
   * Registers a new user and updates the authentication state.
   * @param userData - The user data for registration.
   */
  const register = async (userData: { email: string; password: string; firstName?: string; lastName?: string }) => {
    await authService.register(userData);
  };

  /**
   * Logs out the current user and updates the authentication state.
   */
  const logout = () => {
    authService.logout();
    setUserId(null);
  };

  return <AuthContext.Provider value={{ userId, login, register, logout }}>{children}</AuthContext.Provider>;
};
