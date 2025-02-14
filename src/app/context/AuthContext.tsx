import React, { createContext, ReactNode, useEffect, useState } from "react";
import { authService } from "../../services/auth.service";
import { IonContent, IonPage, IonSpinner } from "@ionic/react";
import { UserPayload } from "../generated/api";
import { UserService } from "../../services/user.service";
import { Preferences } from "@capacitor/preferences";

interface AuthContextProps {
  userId: string | null;
  user: UserPayload | null;
  login: (credentials: { phone: string; password: string }) => Promise<void>;
  register: (userData: { phone: string; password: string; firstName?: string; lastName?: string }) => Promise<void>;
  logout: () => Promise<boolean>;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [user, setUser] = useState<UserPayload | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  /**
   * Logs out the user, clears the authentication state, and navigates to the login screen.
   */
  const logout = async () => {
    console.log("Logging out...");
    await authService.logout();
    setUserId(null);
    setUser(null);
    return true; // ✅ Indicate that logout was successful
  };

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        setIsLoading(true);

        // ✅ Check if token exists before proceeding
        const storedToken = (await Preferences.get({ key: "token" })).value;
        if (!storedToken) {
          console.warn("No token found, user not authenticated!");
          await logout();
          return;
        }

        // ✅ Get the current user ID (if token exists)
        const currentUserId = await authService.getCurrentUserId();
        setUserId(currentUserId);

        if (currentUserId) {
          try {
            // ✅ Get user details
            const currentUser = await UserService.getCurrentUser();
            setUser(currentUser);
          } catch (error) {
            console.error("Fetching user failed:", error);
            await logout();
          }
        }
      } catch (error) {
        console.error("Failed to initialize authentication:", error);
        await logout();
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth().then(() => console.log("AuthProvider: Initialized"));
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
   */
  const login = async (credentials: { phone: string; password: string }) => {
    try {
      await authService.login(credentials);

      // ✅ Save the token after login
      const storedToken = (await Preferences.get({ key: "token" })).value;
      if (!storedToken) {
        throw new Error("Login failed: Token not found.");
      }

      const currentUserId = await authService.getCurrentUserId();
      setUserId(currentUserId);
      if (currentUserId) {
        const userData = await UserService.getCurrentUser();
        setUser(userData);
      }
    } catch (error) {
      console.error("Failed to login:", error);
      await logout(); // 🚀 Logout on login failure
    }
  };

  /**
   * Registers a new user.
   */
  const register = async (userData: { phone: string; password: string; firstName?: string; lastName?: string }) => {
    await authService.register(userData);
  };

  return <AuthContext.Provider value={{ userId, user, login, register, logout }}>{children}</AuthContext.Provider>;
};
