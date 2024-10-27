"use strict";
// src/services/userService.test.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userRepository_1 = __importDefault(require("../../repositories/userRepository"));
const userService_1 = __importDefault(require("../../services/userService"));
// Mock UserRepository
jest.mock('../../repositories/userRepository');
const MockUserRepository = userRepository_1.default;
describe('UserService', () => {
    let userService;
    let mockUserRepository;
    let sample_id = new mongoose_1.default.Types.ObjectId("2717565c94674a67f23e5a6d");
    let sample_id1 = new mongoose_1.default.Types.ObjectId("5717565c94674a67f23e5a6d");
    let sample_id2 = new mongoose_1.default.Types.ObjectId("7717565c94674a67f23e5a6d");
    beforeEach(() => {
        // Create an instance of the mocked UserRepository
        mockUserRepository = new MockUserRepository();
        userService = new userService_1.default();
        // Override the userRepository in the UserService with the mocked repository
        userService.userRepository = mockUserRepository;
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('should register a user', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockUser = { _id: sample_id, email: 'test@example.com',
            password: 'hashed-password', userId: "85b964b1-ecb6-2a6d-b45c-a1d0d0746446", name: 'Test User', userRole: 'admin' };
        mockUserRepository.registerUser.mockResolvedValue(mockUser);
        const result = yield userService.registerUser(mockUser);
        expect(mockUserRepository.registerUser).toHaveBeenCalledWith(mockUser);
        expect(result).toEqual(mockUser);
    }));
    it('should get user data by email', () => __awaiter(void 0, void 0, void 0, function* () {
        const email = 'test@example.com';
        const mockUser = { _id: sample_id,
            email: 'test@example.com',
            password: 'hashed-password',
            userId: "85b964b1-ecb6-2a6d-b45c-a1d0d0746446",
            name: 'Test User',
            userRole: 'admin' };
        mockUserRepository.getUserData.mockResolvedValue(mockUser);
        const result = yield userService.getUserData({ email });
        expect(mockUserRepository.getUserData).toHaveBeenCalledWith({ email });
        expect(result).toEqual(mockUser);
    }));
    it('should get all user data', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockUsers = [
            { _id: sample_id, email: 'user1@example.com', name: 'User One', password: 'hashed-password2',
                userId: '85b964b1-ecb6-2a6d-b45c-a1d0d0746446', userRole: 'admin' },
            { _id: sample_id1, email: 'user2@example.com', name: 'User Two', password: 'hashed-password2',
                userId: '85b964b1-ecb6-2a6d-b45c-a1d0d0746446', userRole: 'student', studentId: "673" },
        ];
        mockUserRepository.getAllUserData.mockResolvedValue(mockUsers);
        const result = yield userService.getAllUserData();
        expect(mockUserRepository.getAllUserData).toHaveBeenCalled();
        expect(result).toEqual(mockUsers);
    }));
    it('should update user data', () => __awaiter(void 0, void 0, void 0, function* () {
        const email = 'test@example.com';
        const updates = { name: 'Updated Name' };
        const updatedUser = { _id: sample_id1, name: 'Updated Name', userId: '85b964b1-ecb6-2a6d-b45c-a1d0d0746446',
            email: 'user2@example.com', userRole: 'student', password: 'hashed-password2'
        };
        mockUserRepository.updateUserData.mockResolvedValue(updatedUser);
        const result = yield userService.updateUserData({ email, updates });
        expect(mockUserRepository.updateUserData).toHaveBeenCalledWith({ email, updates });
        expect(result).toEqual(updatedUser);
    }));
    it('should delete a user by email', () => __awaiter(void 0, void 0, void 0, function* () {
        const email = 'test@example.com';
        const deletedUser = { _id: sample_id1, email, name: 'Deleted User', userId: '85b964b1-ecb6-2a6d-b45c-a1d0d0746446', password: 'hashed-password2', userRole: 'student' };
        mockUserRepository.deleteUser.mockResolvedValue(deletedUser);
        const result = yield userService.deleteUser({ email });
        expect(mockUserRepository.deleteUser).toHaveBeenCalledWith({ email });
        expect(result).toEqual(deletedUser);
    }));
    it('should reset a user password', () => __awaiter(void 0, void 0, void 0, function* () {
        const email = 'test@example.com';
        const resetResponse = {
            success: true, message: 'Password reset link sent.',
            resetToken: 'strwj',
            user: {
                _id: sample_id,
                email: 'user1@example.com',
                userRole: 'student', password: 'hashed-password2',
                userId: '85b964b1-ecb6-2a6d-b45c-a1d0d0746446',
                name: 'user1'
            }
        };
        mockUserRepository.resetPassword.mockResolvedValue(resetResponse);
        const result = yield userService.resetPassword({ email });
        expect(mockUserRepository.resetPassword).toHaveBeenCalledWith({ email });
        expect(result).toEqual(resetResponse);
    }));
});
