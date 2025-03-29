import axiosInstance from "@/utils/axiosInstance";

export const login = async (username: string, password: string) => {
  const response = await axiosInstance.post("/api/v1/auth/login", { username, password });
  return response.data;
};

export const signup = async (username: string, email: string, password: string) => {
  const response = await axiosInstance.post("/api/v1/auth/signup", { username, email, password });
  return response.data;
};

export const logout = async () => {
  const response = await axiosInstance.post("/api/v1/auth/logout");
  return response.data;
};
