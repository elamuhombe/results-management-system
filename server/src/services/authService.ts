//src/services/authService.ts

import authRepository from '../repositories/authRepository';
import IUser from '../types/types';

class AuthService {
    // Login a user by verifying credentials and generating a token
    async login(email: string, password: string): Promise<{ token: string; user: IUser }> {
        try {
            // Call the repository to handle user login logic
            const result = await authRepository.loginUser(email, password);
            return result;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    // Logout functionality
    logout(): void {
        authRepository.logoutUser();
    }
}

export default new AuthService();
