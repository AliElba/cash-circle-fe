import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { UserPayload } from "../generated/api";

const useCurrentUser = (): UserPayload | null => {
  const ctx = useContext(AuthContext);

  if (!ctx) {
    throw new Error("useCurrentUser must be used within an AuthProvider");
  }

  return ctx.user || null;
};

export default useCurrentUser;
