//src/repositories/userValidationRepository.ts

import { userValidationSchema } from "../validation/userValidation";
import UserModel from "../models/userModel";
import IUser from "../types/types";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const validateUserData = async (userData: any): Promise<IUser> => {
  return await userValidationSchema.parseAsync(userData);
};

export const checkExistingUser = async (email: string): Promise<IUser | null> => {
  return await UserModel.findOne({ email });
};

export const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, 10);
};

export const generateResetToken = (email: string): string => {
  return jwt.sign({ email }, process.env.JWT_SECRET || 'your_secret_key', {
    expiresIn: '1h',
  });
};
