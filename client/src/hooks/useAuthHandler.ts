// src/hooks/useAuthHandler.ts

import { useState } from "react";
import { login } from "../services/apis/index"; 
import { useNavigate } from 'react-router-dom';

export const useAuthHandler = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null); // Reset any previous error

      const { token, user } = await login(email, password); // Call the imported login function from api
      console.log('user', user)

      // Store the token in localStorage
      localStorage.setItem("token", token);

      if (user.userRole === "admin") {
        // Redirect to admin dashboard
        navigate('/admin/dashboard');
      } else if (user.userRole === "student") {
        // Redirect to student dashboard
        navigate('/student/dashboard')
      }
    } catch (err: any) {
      setError(err.message || "Login failed. Please check your credentials and try again.");
    } finally {
      setLoading(false); // Reset loading state after attempting login
    }
  };

  return { handleLogin, loading, error }; // Return the handler and state
};
