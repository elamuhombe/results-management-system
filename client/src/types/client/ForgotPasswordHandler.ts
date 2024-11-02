//src/types/client/useForgotPasswordHandler.ts
export interface ForgotPasswordHandler {
    formData: { email: string };
    loading: boolean;
    error: string | null;
    success: string | null;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (event: React.FormEvent) => void;
  }