//src/repositories/userRepository.ts

import { userValidationSchema } from "../validation/userValidation";
import UserModel from "../models/userModel";
import IUser from "../types/types";

class UserRepository {
  // Method to register and save a new user
  async registerUser(userData: any): Promise<IUser> {
    // Validate user data using Zod
    const validatedUserData = await userValidationSchema.parseAsync(userData);

    // Check if the user already exists
    const existingUser = await UserModel.findOne({
      email: validatedUserData.email,
    });
    if (existingUser) {
      // Throw an error if the user already exists
      throw new Error(
        `User with email ${validatedUserData.email} already exists.`
      );
    }

    // Create a new user
    const newUser = await UserModel.create(validatedUserData); // Pass validated user data

    return newUser; // Return the created user
  }

  //Method to get a specific user
  async getUserData(userData: { email: string }): Promise<IUser | null> {
    const existingUser = await UserModel.findOne({
      email: userData.email,
    }).select("-password");// exclude the password

    // Throw an error if user data not found
    if (!existingUser) {
      // Throw an error if the user data is not found 
      throw new Error(`User with email ${userData.email} does not exist.`);
    }
    // Return existing user
    return existingUser;
  }
}
export default UserRepository;
