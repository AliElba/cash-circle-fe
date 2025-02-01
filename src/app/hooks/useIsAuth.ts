import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const useIsAuth = (): boolean => {
  const ctx = useContext(AuthContext);

  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  // Return true if the user is authenticated (not null or undefined)
  return ctx?.user != null;
};

export default useIsAuth;
