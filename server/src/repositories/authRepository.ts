//src/repositories/authRepository.ts

import UserModel from '../models/userModel';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import IUser from '../types/types';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

class AuthRepository {

    // Login a user
    async loginUser(email: string, password: string): Promise<{ token: string; user: IUser }> {
        const user = await UserModel.findOne({ email });

        if (!user) {
            throw new Error('User not found');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error('Invalid credentials');
        }

        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });

        return { token, user };
    }

    // Logout functionality can be handled on the client side (e.g., clearing token)
    logoutUser(): void {
        // In a typical scenario, logout would be handled by client-side logic
        // For example, deleting the token from local storage or cookies
        console.log('User logged out');
    }
}

export default new AuthRepository();
