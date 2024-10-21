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
      email: userData.email
    }).select("-password");// exclude the password

    // Throw an error if user data is not found
    if (!existingUser) {
      throw new Error(`User with email ${userData.email} does not exist.`);
    }
    // Return existing user
    return existingUser;
  }

  //Method to get all users
  async getAllUserData(): Promise<IUser[]>{
    const existingUsers = await UserModel.find()
      .select('-password')
       //Throw an error if no users data are found
       if(existingUsers.length === 0){
        throw new Error ('There are no users registered')
       }
       return existingUsers;
  }

 // Method to update user data
async updateUserData(userData: { email: string; updates: Partial<IUser> }): Promise<IUser | null> {
  const updatedUserData = await UserModel.findOneAndUpdate(
    { email: userData.email }, // Filter by email
    userData.updates,          // Fields to update
    { new: true }             // Option to return the updated document
  ).select('-password');       // Exclude the password

  // Throw an error if there is a problem in updating the user data
  if (!updatedUserData) {
    throw new Error(`Error occurred in updating data for user with email: ${userData.email}`);
  }
  
  return updatedUserData; // Return the updated user data
}

//Method to delete user 
async deleteUser(userData: {email: string}):Promise<IUser | null>{
  const deletedUser = await UserModel.findOneAndDelete({email: userData.email});

  // Throw an error if there is a problem with deleting a user
  if(!deletedUser){
    throw new Error(`Error occured in deleting user with email: ${userData.email}`);
  }
  return deletedUser;// return the deleted user
}
}
export default UserRepository;
