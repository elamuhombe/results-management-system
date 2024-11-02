import { useState } from 'react';
import { resetPassword } from '../services/apis/index';

export const useForgotPasswordHandler = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleForgotPassword = async (email: string) => {

try {
      setLoading(true);
      setError(null);
      const {user, resetToken}= await resetPassword(email)
      console.log('user', user, resetToken)
    } catch (err: any) {
      setError(err.message || "reset password failed.");
    } finally {
      setLoading(false); // Reset loading state after attempting reset password
    }
  };

  return {
    loading,
    error,

    handleForgotPassword,
  };
};

