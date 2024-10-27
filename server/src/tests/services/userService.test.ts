// src/services/userService.test.ts


import mongoose from 'mongoose';
import UserRepository from '../../repositories/userRepository';
import UserService from '../../services/userService';
import IUser, { ResetPasswordResponse } from '../../types/types';

// Mock UserRepository
jest.mock('../../repositories/userRepository');
const MockUserRepository = UserRepository as jest.Mock;

describe('UserService', () => {
  let userService: UserService;
  let mockUserRepository: jest.Mocked<UserRepository>;
  let sample_id = new mongoose.Types.ObjectId("2717565c94674a67f23e5a6d");

  let sample_id1 = new mongoose.Types.ObjectId("5717565c94674a67f23e5a6d"); 
  let sample_id2 = new mongoose.Types.ObjectId("7717565c94674a67f23e5a6d"); 

  beforeEach(() => {
    // Create an instance of the mocked UserRepository
    mockUserRepository = new MockUserRepository() as jest.Mocked<UserRepository>;
    userService = new UserService();
    // Override the userRepository in the UserService with the mocked repository
    (userService as any).userRepository = mockUserRepository;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should register a user', async () => {
    const mockUser: IUser = { _id: sample_id, email: 'test@example.com',
        password: 'hashed-password',  userId: "85b964b1-ecb6-2a6d-b45c-a1d0d0746446", name:'Test User', userRole: 'admin' };
    mockUserRepository.registerUser.mockResolvedValue(mockUser);

    const result = await userService.registerUser(mockUser);
    expect(mockUserRepository.registerUser).toHaveBeenCalledWith(mockUser);
    expect(result).toEqual(mockUser);
  });

  it('should get user data by email', async () => {
    const email = 'test@example.com';
    const mockUser: IUser = 
    { _id: sample_id, 
        email: 'test@example.com',
        password: 'hashed-password',  
        userId: "85b964b1-ecb6-2a6d-b45c-a1d0d0746446", 
        name:'Test User', 
        userRole: 'admin' };
    mockUserRepository.getUserData.mockResolvedValue(mockUser);

    const result = await userService.getUserData({ email });
    expect(mockUserRepository.getUserData).toHaveBeenCalledWith({ email });
    expect(result).toEqual(mockUser);
  });

  it('should get all user data', async () => {
    const mockUsers: IUser[] = [
      { _id: sample_id, email: 'user1@example.com', name: 'User One', password: 'hashed-password2', 
        userId: '85b964b1-ecb6-2a6d-b45c-a1d0d0746446', userRole: 'admin' },
      { _id: sample_id1, email: 'user2@example.com', name: 'User Two', password: 'hashed-password2', 
        userId: '85b964b1-ecb6-2a6d-b45c-a1d0d0746446', userRole: 'student', studentId:"673" }, 
    ];
    mockUserRepository.getAllUserData.mockResolvedValue(mockUsers);

    const result = await userService.getAllUserData();
    expect(mockUserRepository.getAllUserData).toHaveBeenCalled();
    expect(result).toEqual(mockUsers);
  });

  it('should update user data', async () => {
    const email = 'test@example.com';
    const updates = { name: 'Updated Name' };
    const updatedUser: IUser = 
    { _id: sample_id1, name: 'Updated Name', userId: '85b964b1-ecb6-2a6d-b45c-a1d0d0746446',
        email: 'user2@example.com',userRole: 'student', password: 'hashed-password2'
     };
    mockUserRepository.updateUserData.mockResolvedValue(updatedUser);

    const result = await userService.updateUserData({ email, updates });
    expect(mockUserRepository.updateUserData).toHaveBeenCalledWith({ email, updates });
    expect(result).toEqual(updatedUser);
  });

  it('should delete a user by email', async () => {
    const email = 'test@example.com';
    const deletedUser: IUser = 
    { _id: sample_id1, email, name: 'Deleted User', userId:'85b964b1-ecb6-2a6d-b45c-a1d0d0746446', password: 'hashed-password2', userRole: 'student' };
    mockUserRepository.deleteUser.mockResolvedValue(deletedUser);

    const result = await userService.deleteUser({ email });
    expect(mockUserRepository.deleteUser).toHaveBeenCalledWith({ email });
    expect(result).toEqual(deletedUser);
  });

  it('should reset a user password', async () => {
    const email = 'test@example.com';
    const resetResponse: ResetPasswordResponse = {
        success: true, message: 'Password reset link sent.',
        resetToken: 'strwj',
        user: {
            _id: sample_id, 
            email: 'user1@example.com',
           userRole: 'student', password: 'hashed-password2',
            userId: '85b964b1-ecb6-2a6d-b45c-a1d0d0746446' ,
            name: 'user1'
    
        }
    };
    mockUserRepository.resetPassword.mockResolvedValue(resetResponse);

    const result = await userService.resetPassword({ email });
    expect(mockUserRepository.resetPassword).toHaveBeenCalledWith({ email });
    expect(result).toEqual(resetResponse);
  });
});
