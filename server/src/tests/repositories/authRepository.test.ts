//src/tests/authRepository.test.ts

import AuthRepository from '../../repositories/authRepository';
import UserModel from '../../models/userModel';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

jest.mock('../../models/userModel'); // Mock the UserModel
jest.mock('bcrypt'); // Mock bcrypt
jest.mock('jsonwebtoken'); // Mock jsonwebtoken

const mockUserData = {
    email: 'test@example.com',
    password: 'password123',
    _id: 'mockUserId',
};

describe('AuthRepository', () => {
    beforeEach(() => {
        jest.clearAllMocks(); // Clear previous mocks before each test
    });


    describe('loginUser', () => {
        it('should log in a user and return a token', async () => {
            (UserModel.findOne as jest.Mock).mockResolvedValue({ ...mockUserData, password: 'hashedPassword' }); // Mock the user lookup
            (bcrypt.compare as jest.Mock).mockResolvedValue(true); // Mock the password comparison
            (jwt.sign as jest.Mock).mockReturnValue('mockToken'); // Mock JWT signing

            const result = await AuthRepository.loginUser(mockUserData.email, mockUserData.password);

            expect(result).toEqual({ token: 'mockToken', user: { ...mockUserData, password: 'hashedPassword' } }); // Check result
            expect(UserModel.findOne).toHaveBeenCalledWith({ email: mockUserData.email }); // Check user lookup
            expect(bcrypt.compare).toHaveBeenCalledWith(mockUserData.password, 'hashedPassword'); // Check password comparison
        });

        it('should throw an error if user is not found', async () => {
            (UserModel.findOne as jest.Mock).mockResolvedValue(null); // Mock user not found

            await expect(AuthRepository.loginUser(mockUserData.email, mockUserData.password)).rejects.toThrow('User not found'); // Expect error
        });

        it('should throw an error if credentials are invalid', async () => {
            (UserModel.findOne as jest.Mock).mockResolvedValue({ ...mockUserData, password: 'hashedPassword' });
            (bcrypt.compare as jest.Mock).mockResolvedValue(false); // Mock invalid password

            await expect(AuthRepository.loginUser(mockUserData.email, mockUserData.password)).rejects.toThrow('Invalid credentials'); // Expect error
        });
    });

    describe('logoutUser', () => {
        it('should log out the user and log the message "User logged out"', () => {
            const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {}); // Prevents actual console output
    
            try {
                AuthRepository.logoutUser(); // Call logout
                expect(consoleSpy).toHaveBeenCalledWith('User logged out'); // Check console output
            } finally {
                consoleSpy.mockRestore(); // restore console.log
            }
        });
    });
    
})