import { useEffect, useState } from "react";
import { getMe } from "./services/auth.api.js";
import { AuthContext } from "./auth.context.jsx";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const restoreUser = async () => {
      try {
        const data = await getMe();
        if (active) setUser(data?.user ?? null);
      } catch (error) {
        console.error("Failed to restore the authenticated user:", error);
      } finally {
        if (active) setLoading(false);
      }
    };

    restoreUser();
    return () => {
      active = false;
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading, setLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
