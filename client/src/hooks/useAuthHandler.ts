// src/hooks/useAuthHandler.ts

import { useState } from "react";
import { login } from "../services/apis/index"; // Ensure the import path is correct

export const useAuthHandler = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null); // Reset any previous error

      const { token, user } = await login(email, password); // Call the imported login function
      console.log("Authenticated user:", user);
      console.log("User role:", user.userRole);

      // Store the token in localStorage
      localStorage.setItem("token", token);

      // Optionally, redirect or update UI based on user role
      if (user.userRole === "admin") {
        // Redirect to admin dashboard (e.g., using react-router)
        // Example: history.push('/admin/dashboard');
      } else if (user.userRole === "student") {
        // Redirect to student dashboard (e.g., using react-router)
        // Example: history.push('/student/dashboard');
      }
    } catch (err: any) {
      setError(err.message || "Login failed. Please check your credentials and try again.");
    } finally {
      setLoading(false); // Reset loading state after attempting login
    }
  };

  return { handleLogin, loading, error }; // Return the handler and state
};
