import React, {createContext, ReactNode, useEffect, useState} from "react";import React, {createContext, ReactNode, useEffect, useState} from "react";import React, { createContext, ReactNode, useEffect, useState } from "react";
import { authService } from "../../services/auth.service";
import { IonContent, IonPage, IonSpinner } from "@ionic/react";

interface AuthContextProps {
  userId: string | null;
  login: (credentials: { phone: string; password: string }) => Promise<void>;
  register: (userData: { phone: string; password: string; firstName?: string; lastName?: string }) => Promise<void>;
  logout: () => void;
}

/**
 * Provides the authentication context to the application.
 * example usage: const { user, login, register, logout } = useContext(AuthContext);
 */
export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const extractCurrentUserId = async () => {
      const currentUser = await authService.getCurrentUserId();
      setUserId(currentUser);
      console.log("AuthProvider:currentUser: ", currentUser);
      setIsLoading(false);
    };
    extractCurrentUserId().then(() => console.log("AuthProvider:extractCurrentUserId done"));
  }, []);

  if (isLoading) {
    return (
      <IonPage>
        <IonContent fullscreen className="ion-text-center d-flex ion-justify-content-center ion-align-items-center">
          <IonSpinner name="dots" />
          <p>Loading authentication...</p>
        </IonContent>
      </IonPage>
    );
  }

  /**
   * Logs in a user and updates the authentication state.
   * @param credentials - The user's login credentials.
   */
  const login = async (credentials: { phone: string; password: string }) => {
    await authService.login(credentials);
    setUserId(await authService.getCurrentUserId());
  };

  /**
   * Registers a new user and updates the authentication state.
   * @param userData - The user data for registration.
   */
  const register = async (userData: { phone: string; password: string; firstName?: string; lastName?: string }) => {
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
