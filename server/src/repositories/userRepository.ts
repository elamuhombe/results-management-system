// src/repositories/userRepository.ts


import UserModel from "../models/userModel";
import IUser, { ResetPasswordResponse } from "../types/types";
import { checkExistingUser, generateResetToken, hashPassword, validateUserData } from "./validation/userValidationRepository";

class UserRepository {
  // Method to register and save a new user
  async registerUser(userData: any): Promise<IUser> {
    const validatedUserData = await validateUserData(userData);

    // Check if studentId is provided if the userRole is 'student'
    if (validatedUserData.userRole === 'student' && !validatedUserData.studentId) {
      throw new Error('studentId is required for users with the role of student.');
    }

    const existingUser = await checkExistingUser(validatedUserData.email);
    if (existingUser) {
      throw new Error(`User with email ${validatedUserData.email} already exists.`);
    }
    
    const hashedPassword = await hashPassword(validatedUserData.password);
    const newUser = await UserModel.create({
      ...validatedUserData,
      password: hashedPassword,
    });

    return newUser;
  }

  // Method to get a specific user
  async getUserData(userData: { email: string }): Promise<IUser | null> {
    const existingUser = await UserModel.findOne({ email: userData.email });
    
    if (!existingUser) {
      throw new Error(`User with email ${userData.email} does not exist.`);
    }
    
    return existingUser;
  }

  // Method to get all users
  async getAllUserData(): Promise<IUser[]> {
    const existingUsers = await UserModel.find();
    
    if (existingUsers.length === 0) {
      throw new Error('There are no users registered');
    }
    
    return existingUsers;
  }

  // Method to update user data
  async updateUserData(userData: { email: string; updates: Partial<IUser> }): Promise<IUser | null> {
    const updatedUserData = await UserModel.findOneAndUpdate(
      { email: userData.email },
      userData.updates,
      { new: true }
    );
    
    if (!updatedUserData) {
      throw new Error(`Error occurred in updating data for user with email: ${userData.email}`);
    }

    return updatedUserData;
  }

  // Method to delete user
  async deleteUser(userData: { email: string }): Promise<IUser | null> {
    const deletedUser = await UserModel.findOneAndDelete({ email: userData.email });

    if (!deletedUser) {
      throw new Error(`Error occurred in deleting user with email: ${userData.email}`);
    }
    
    return deletedUser;
  }

  // Method to reset user password
  async resetPassword(userData: { email: string }): Promise<ResetPasswordResponse> {
    const user = await UserModel.findOne({ email: userData.email });

    if (!user) {
      throw new Error(`User with email ${userData.email} does not exist.`);
    }

    const resetToken = generateResetToken(user.email);

    return { user, resetToken };
  }
}

export default UserRepository;
