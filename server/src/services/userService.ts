//src/services/userService.ts

import UserRepository from "../repositories/userRepository";
import IUser, { ResetPasswordResponse } from "../types/types";

class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async registerUser(userData: any): Promise<IUser> {
    return this.userRepository.registerUser(userData);
  }

  async getUserData(userData: { email: string }): Promise<IUser | null> {
    return this.userRepository.getUserData(userData);
  }

  async getAllUserData(): Promise<IUser[]> {
    return this.userRepository.getAllUserData();
  }

  async updateUserData(userData: { email: string; updates: Partial<IUser> }): Promise<IUser | null> {
    return this.userRepository.updateUserData(userData);
  }

  async deleteUser(userData: { email: string }): Promise<IUser | null> {
    return this.userRepository.deleteUser(userData);
  }

  async resetPassword(userData: { email: string }): Promise<ResetPasswordResponse> {
    return this.userRepository.resetPassword(userData);
  }
}

export default UserService;
