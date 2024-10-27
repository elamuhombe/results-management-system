// src/repositories/userValidationRepository.ts

import { userValidationSchema } from "../../validation/userValidation";
import UserModel from "../../models/userModel";
import  IUser  from "../../types/types"; // Ensure you import IUser correctly
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mongoose from "mongoose";

// Validate the user data against the user validation schema
export const validateUserData = async (userData: IUser): Promise<IUser> => {
  // Validate the incoming data
  const validatedData = await userValidationSchema.parseAsync(userData);
  
  // Check for studentId if userRole is 'student'
  if (validatedData.userRole === 'student' && !validatedData.studentId) {
    throw new Error('studentId is required for users with the role of student.');
  }

  // Convert userId to mongoose.Types.ObjectId and return a new object
  return {
    ...validatedData,
    _id: new mongoose.Types.ObjectId(validatedData._id), // Convert to ObjectId here
  } as IUser; // Ensure the return type matches IUser
};

// Check if a user already exists by email
export const checkExistingUser = async (email: string): Promise<IUser | null> => {
  return await UserModel.findOne({ email });
};

// Hash the user's password
export const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, 10);
};

// Generate a reset token for password reset
export const generateResetToken = (email: string): string => {
  return jwt.sign({ email }, process.env.JWT_SECRET || 'your_secret_key', {
    expiresIn: '1h',
  });
};
