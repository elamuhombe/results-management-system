//src/components/Login/LoginForm/LoginForm.tsx
import React, { useState } from "react";
import { LoginButton } from "./LoginButton";
import { useAuthHandler } from "./../../../hooks/useAuthHandler";
import { useNavigate } from "react-router-dom";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { handleLogin, loading, error } = useAuthHandler();
  const navigate = useNavigate(); // Get the navigate function from useNavigate

  const onForgotPasswordClick = () => {
    navigate("/reset-password"); // Navigate to reset password form when clicked
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await handleLogin(email, password); // Authenticate the user
  };

  return (
    <form onSubmit={onSubmit} className="pt-4 mt-8 my-auto">
      <h1 className="text-center">Login</h1>
      <div className="mb-4 mt-4">
        <label htmlFor="email" className="pr-8 pl-20">
          Email:
        </label>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="pr-5 pl-16">
          Password:
        </label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}{" "}
      {/* Display error if any */}
      <p className="cursor-pointer text-blue-700 text-right text-sm mr-32" onClick={onForgotPasswordClick}>
        Forgot Password?
      </p>
      <LoginButton loading={loading} /> {/*Pass loading state to the button */}
    </form>
  );
};

export default LoginForm;
