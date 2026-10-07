import axios from "axios";
export const api = axios.create({
  baseURL: "http://localhost:3001/api/auth",
  withCredentials: true,
});
//register user
export const registerUser = async ({ username, email, password }) => {
  try {
    const response = await api.post("/register", { username, email, password });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Registration failed");
  }
};

//login user
export const loginUser = async ({ email, password }) => {
  try {
    const response = await api.post("/login", { email, password });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Login failed");
  }
};

//logout user
export const logoutUser = async () => {
  try {
    const response = await api.get("/logout");
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Logout failed");
  }
};

//get-me user
export const getMe = async () => {
  try {
    const response = await api.get("/get-me");
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Get user failed");
  }
};
