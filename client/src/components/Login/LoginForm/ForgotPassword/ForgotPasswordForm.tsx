//src/components/Login/LoginForm/ForgotPassword/ForgotPasswordForm.tsx
import React, { useState } from "react";

import { useForgotPasswordHandler } from "../../../../hooks";
import BackButton from "../../../shared/BackButton";

const ForgotPasswordForm: React.FC = () => {
  const { loading, error,  handleForgotPassword } =
    useForgotPasswordHandler();
  const [email, setEmail] = useState("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Email on submit:", email); // Log the email to confirm
    await handleForgotPassword(email); // Call the password reset handler
  };
  

  return (
    <div className=" flex justify-center h-screen items-center bg-lavenderTint">
      <form onSubmit={onSubmit}>
        <div className="flex items-center">
          <BackButton />
          <span className="ml-4">back to login</span>
        </div>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Enter your email"
          className="mt-8"
        />
        <div>
        <button type="submit" disabled={loading} className="ml-8  mt-4 bg-purple-600 py-2 px-4 rounded text-white">
          {loading ? "Sending..." : "Reset Password"}
        </button>
        </div>
        
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
};

export default ForgotPasswordForm;
