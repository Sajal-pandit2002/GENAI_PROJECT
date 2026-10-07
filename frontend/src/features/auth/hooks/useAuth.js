import { useContext, useEffect } from "react";
import { AuthContext } from "../auth.context.jsx";
import {
  loginUser,
  registerUser,
  logoutUser,
  getMe,
} from "../services/auth.api.js";

export const useAuth = () => {
  const context = useContext(AuthContext);
  const { user, setUser, loading, setLoading } = context;

  // Function to handle user login
  const handleLogin = async ({ email, password }) => {
    setLoading(true);
    try {
      const data = await loginUser({ email, password });

      setUser(data.user);
      return { success: data.success, message: data.message };
    } catch (error) {
      const message = error.message || "Login failed";
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  // Function to handle user registration
  const handleRegister = async ({ username, email, password }) => {
    setLoading(true);
    try {
      const data = await registerUser({ username, email, password });
      setUser(data.user);

      return { success: data.success, message: data.message };
    } catch (error) {
      const message = error.message || "Registration failed";

      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  // Function to handle user logout
  const handleLogout = async () => {
    setLoading(true);
    try {
      const data = await logoutUser();
      setUser(null);
      return { success: data.success, message: data.message };
    } catch (error) {
      const message = error.message || "Logout faield";
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  // // Function to fetch the current user
  // const fetchCurrentUser = async () => {
  //   setLoading(true);
  //   try {
  //     const data = await getMe();
  //     setUser(data.user);
  //     return { success: data.success, message: data.message };
  //   } catch (error) {
  //     return { success: false, message };
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  useEffect(() => {
    const getAndSetUser = async () => {
      const data = await getMe();
      setUser(data.user);
      setLoading(false);
    };
    getAndSetUser();
  }, []);
  return {
    user,
    loading,
    handleLogin,
    handleRegister,
    handleLogout,
  };
};
