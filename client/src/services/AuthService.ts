//src/services/AuthService.ts
import { api } from "./api";

// authentication api
export const Login = async (email: string, password: string) => {
    const response = await api.post(`/login/${email}, ${password}`);
    return response.data;
  };