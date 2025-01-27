import React, { createContext, ReactNode, useEffect, useState } from "react";
import { User } from "../../model/clinet-models";
import { authService } from "../../services/auth.service";

interface AuthContextProps {
  user: User | null;
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
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
  }, []);

  /**
   * Logs in a user and updates the authentication state.
   * @param credentials - The user's login credentials.
   */
  const login = async (credentials: { email: string; password: string }) => {
    await authService.login(credentials);
    setUser(authService.getCurrentUser());
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
    setUser(null);
  };

  return <AuthContext.Provider value={{ user, login, register, logout }}>{children}</AuthContext.Provider>;
};
