//src/hooks/useForgotPasswordHandler.ts

import { useNavigate } from "react-router-dom";

export const useForgotPasswordHandler = () => {
  const navigate = useNavigate();

  //navigate to ForgotPasswordForm when clicked

  const handleForgotPassword = () => {
    navigate("/reset-password");
  };
  return { handleForgotPassword };
};
