// src/types/server/User.ts

export default interface IUser {
    _id: string;
    userId: string;
    name: string;
    studentId?: string;
    email: string;
    password: string;
    userRole: "admin" | "student";
  }
  
  export interface ISession {
    _id: string;
    user: Pick<IUser, "userId">;
    sessionId: string;
    expiresAt: string;
    ipAddress: string;
    userAgent: string;
    isActive: boolean;
  }
  
  export interface ResetPasswordResponse {
    user: IUser;
    resetToken: string;
    success: boolean;
    message: string;
  }
  