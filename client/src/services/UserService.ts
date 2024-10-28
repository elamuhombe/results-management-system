//src/services/apis/UserService.ts
import { api } from "./api";

// User-related APIs
export const getUserData = async (email: string) => {
  const response = await api.get(`/users/${email}`);
  return response.data;
};

export const getAllUserData = async () => {
  const response = await api.get(`/users`);
  return response.data;
};

export const createUser = async (userData: any) => {
  const response = await api.post("/users", userData);
  return response.data;
};

export const updateUserData = async (email: string, updates: any) => {
  const response = await api.put(`/users/${email}`, updates);
  return response.data;
};

export const deleteUser = async (email: string) => {
  const response = await api.delete(`/users/${email}`);
  return response.data;
};

export const resetPassword = async (email: string) => {
  const response = await api.post(`/users/${email}`);
  return response.data;
};
