import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const useCurrentUserId = (): string | null => {
  const ctx = useContext(AuthContext);

  if (!ctx) {
    throw new Error("useCurrentUser must be used within an AuthProvider");
  }

  return ctx.userId || null;
};

export default useCurrentUserId;
