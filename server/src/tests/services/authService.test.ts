//src/test/services/authService.ts


import mongoose from 'mongoose';
import authRepository from '../../repositories/authRepository';
import authService from '../../services/authService';
import IUser from '../../types/types';

jest.mock('../../repositories/authRepository'); // Mock the authRepository to isolate authService tests

describe('AuthService', () => {
    let sampleId = new mongoose.Types.ObjectId('65345bcd12a3456789abcdef')
    const mockUser: IUser = {
        userId: 'user123',
        email: 'test@example.com',
        name: "faith glens",
        userRole: "admin",
        password: 'hashedPassword',
        _id: sampleId,
    };
    
    const mockToken = 'mockToken';

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('login', () => {
        it('should return a token and user if login is successful', async () => {
            (authRepository.loginUser as jest.Mock).mockResolvedValue({ token: mockToken, user: mockUser });

            const result = await authService.login('test@example.com', 'password123');

            expect(authRepository.loginUser).toHaveBeenCalledWith('test@example.com', 'password123');
            expect(result).toEqual({ token: mockToken, user: mockUser });
        });

        it('should throw an error if login fails', async () => {
            (authRepository.loginUser as jest.Mock).mockRejectedValue(new Error('Invalid credentials'));

            await expect(authService.login('test@example.com', 'wrongPassword'))
                .rejects
                .toThrow('Invalid credentials');
            
            expect(authRepository.loginUser).toHaveBeenCalledWith('test@example.com', 'wrongPassword');
        });
    });

    describe('logout', () => {
        it('should call the logout method in authRepository', () => {
            authService.logout();
            expect(authRepository.logoutUser).toHaveBeenCalled();
        });
    });
});

