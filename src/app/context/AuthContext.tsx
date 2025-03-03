import React, { createContext, ReactNode, useEffect, useState } from "react";
import { authService } from "../../services/auth.service";
import { IonContent, IonPage, IonSpinner } from "@ionic/react";
import { RegisterDto, UpdateUserDto, UserPayload } from "../generated/api";
import { UserService } from "../../services/user.service";
import { Preferences } from "@capacitor/preferences";

interface AuthContextProps {
  user: UserPayload | null;
  login: (credentials: { phone: string; password: string }) => Promise<void>;
  register: (userData: RegisterDto) => Promise<void>;
  logout: () => Promise<boolean>;
  updateUser: (updateUserDto: UpdateUserDto) => Promise<UserPayload | undefined>;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserPayload | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  /**
   * Logs out the user, clears the authentication state, and navigates to the login screen.
   */
  const logout = async () => {
    console.log("Logging out...");
    await authService.logout();
    setUser(null);
    return true; // ✅ Indicate that logout was successful
  };

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        setIsLoading(true);

        // Check if token exists before proceeding
        const storedToken = (await Preferences.get({ key: "token" })).value;
        if (!storedToken) {
          console.warn("No token found, user not authenticated!");
          await logout();
          return;
        }

        // Get the current user ID (if token exists)
        try {
          const currentUser = await UserService.getCurrentUser();
          setUser(currentUser);
        } catch (error) {
          console.error("Fetching user failed:", error);
          await logout();
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
   * Logs in a user
   * store token in local storage
   * and updates the authentication state (get me user).
   */
  const login = async (credentials: { phone: string; password: string }) => {
    try {
      await authService.login(credentials);

      // step1: Check token has been stored in the local storage (login should save token in local storage)
      const storedToken = (await Preferences.get({ key: "token" })).value;
      if (!storedToken) {
        throw new Error("Login failed: Token not generated and not found.");
      }

      // Get the current user Data
      const userData = await UserService.getCurrentUser();
      setUser(userData);
    } catch (error) {
      console.error("Failed to login:", error);
      await logout(); // 🚀 Logout on login failure
      throw error; // Rethrow the error, so the caller can handle it
    }
  };

  /**
   * Registers a new user.
   */
  const register = async (userData: RegisterDto) => {
    await authService.register(userData);
  };

  /**
   * Logs in a user
   * store token in local storage
   * and updates the authentication state (get me user).
   */
  const updateUser = async (updateUserDto: UpdateUserDto) => {
    try {
      const userData = await UserService.updateUser(updateUserDto);

      if (userData) {
        setUser(userData);
      }

      return userData;
    } catch (error) {
      console.error("Failed to update the current user:", error);
    }
  };

  return <AuthContext.Provider value={{ user, login, register, logout, updateUser }}>{children}</AuthContext.Provider>;
};
