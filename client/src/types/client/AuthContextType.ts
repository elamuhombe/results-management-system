//src/types/client/AuthContextType.ts

export interface AuthContextType {
    handleLogin: (email: string, password: string) => Promise<void>;
    loading: boolean;
    error: string | null;
  }