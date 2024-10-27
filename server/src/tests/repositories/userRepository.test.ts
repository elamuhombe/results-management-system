// src/repositories/userRepository.test.ts

import UserRepository from '../../repositories/userRepository';
import UserModel from '../../models/userModel';
import { checkExistingUser, generateResetToken, hashPassword, validateUserData } 
from "../../repositories/validation/userValidationRepository";

jest.mock('../../models/userModel');
jest.mock('../../repositories/validation/userValidationRepository');

const userRepository = new UserRepository();

describe('UserRepository', () => {
    const mockUserData = {
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User',
        userId: "75b966b1-dcb6-4a7d-b45c-a1d0d0746446",

    };

    const mockAdminData = {
        ...mockUserData,
        userRole: 'admin',
        userId: "65b966b1-dcb6-457d-b45c-a1d0d0746446",
    };

    const mockStudentData = {
        ...mockUserData,
        userRole: 'student',
        studentId: 'student123',
        userId: "75b965b1-ecb6-4a7d-b45c-a1d0d0746446",
    };

    const mockUser = { ...mockUserData, _id: '1', userRole: 'admin',userId:'85c966b1-deb6-4a7d-b45c-c1d0d0746446' ,password: 'hashedPassword' };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('registerUser', () => {
        it('should register a new admin user successfully', async () => {
            (validateUserData as jest.Mock).mockResolvedValue(mockAdminData);
            (checkExistingUser as jest.Mock).mockResolvedValue(null);
            (hashPassword as jest.Mock).mockResolvedValue('hashedPassword');
            (UserModel.create as jest.Mock).mockResolvedValue(mockUser);

            const user = await userRepository.registerUser(mockAdminData);

            expect(user).toEqual(mockUser);
            expect(validateUserData).toHaveBeenCalledWith(mockAdminData);
            expect(checkExistingUser).toHaveBeenCalledWith(mockAdminData.email);
            expect(hashPassword).toHaveBeenCalledWith(mockAdminData.password);
            expect(UserModel.create).toHaveBeenCalledWith({
                ...mockAdminData,
                userId: expect.any(String),
                password: 'hashedPassword',
            });
            console.log('user', user)
        });

        it('should register a new student user successfully', async () => {
            (validateUserData as jest.Mock).mockResolvedValue(mockStudentData);
            (checkExistingUser as jest.Mock).mockResolvedValue(null);
            (hashPassword as jest.Mock).mockResolvedValue('hashedPassword');
            (UserModel.create as jest.Mock).mockResolvedValue(mockUser);

            const user = await userRepository.registerUser(mockStudentData);

            expect(user).toEqual(mockUser);
            expect(validateUserData).toHaveBeenCalledWith(mockStudentData);
            expect(checkExistingUser).toHaveBeenCalledWith(mockStudentData.email);
            expect(hashPassword).toHaveBeenCalledWith(mockStudentData.password);
            expect(UserModel.create).toHaveBeenCalledWith({
                ...mockStudentData,
                userId: expect.any(String),
                password: 'hashedPassword',
            });
        });

        it('should throw an error if the user already exists', async () => {
            (validateUserData as jest.Mock).mockResolvedValue(mockUserData);
            (checkExistingUser as jest.Mock).mockResolvedValue(mockUser);

            await expect(userRepository.registerUser(mockUserData)).rejects.toThrow(
                `User with email ${mockUserData.email} already exists.`
            );
        });
    });

    describe('getUserData', () => {
        it('should return user data if user exists', async () => {
            (UserModel.findOne as jest.Mock).mockResolvedValue(mockUser);

            const user = await userRepository.getUserData({ email: mockUserData.email });

            expect(user).toEqual(mockUser);
        });

        it('should throw an error if the user does not exist', async () => {
            (UserModel.findOne as jest.Mock).mockResolvedValue(null);

            await expect(userRepository.getUserData({ email: mockUserData.email })).rejects.toThrow(
                `User with email ${mockUserData.email} does not exist.`
            );
        });
    });

    describe('getAllUserData', () => {
        it('should return all users', async () => {
            (UserModel.find as jest.Mock).mockResolvedValue([mockUser]);

            const users = await userRepository.getAllUserData();

            expect(users).toEqual([mockUser]);
        });

        it('should throw an error if no users are found', async () => {
            (UserModel.find as jest.Mock).mockResolvedValue([]);

            await expect(userRepository.getAllUserData()).rejects.toThrow(
                'There are no users registered'
            );
        });
    });

    describe('updateUserData', () => {
        it('should update user data successfully', async () => {
            const updates = { name: 'Updated User' };
            (UserModel.findOneAndUpdate as jest.Mock).mockResolvedValue({ ...mockUser, ...updates });

            const updatedUser = await userRepository.updateUserData({
                email: mockUserData.email,
                updates,
            });

            expect(updatedUser).toEqual({ ...mockUser, ...updates });
        });

        it('should throw an error if user data cannot be updated', async () => {
            (UserModel.findOneAndUpdate as jest.Mock).mockResolvedValue(null);

            await expect(
                userRepository.updateUserData({
                    email: mockUserData.email,
                    updates: {},
                })
            ).rejects.toThrow(`Error occurred in updating data for user with email: ${mockUserData.email}`);
        });
    });

    describe('deleteUser', () => {
        it('should delete user successfully', async () => {
            (UserModel.findOneAndDelete as jest.Mock).mockResolvedValue(mockUser);

            const deletedUser = await userRepository.deleteUser({ email: mockUserData.email });

            expect(deletedUser).toEqual(mockUser);
        });

        it('should throw an error if user cannot be deleted', async () => {
            (UserModel.findOneAndDelete as jest.Mock).mockResolvedValue(null);

            await expect(userRepository.deleteUser({ email: mockUserData.email })).rejects.toThrow(
                `Error occurred in deleting user with email: ${mockUserData.email}`
            );
        });
    });

    describe('resetPassword', () => {
        it('should return user and reset token if user exists', async () => {
            (UserModel.findOne as jest.Mock).mockResolvedValue(mockUser);
            (generateResetToken as jest.Mock).mockReturnValue('resetToken');

            const response = await userRepository.resetPassword({ email: mockUserData.email });

            // expect(response).toEqual({ user: mockUser, resetToken: 'resetToken' });
            expect(response).toEqual({
                user: mockUser,
                resetToken: 'resetToken',
                message: '',
                success: true
              });
              
        });

        it('should throw an error if user does not exist', async () => {
            (UserModel.findOne as jest.Mock).mockResolvedValue(null);

            await expect(userRepository.resetPassword({ email: mockUserData.email })).rejects.toThrow(
                `User with email ${mockUserData.email} does not exist.`
            );
        });
    });
});
