"use strict";
// src/repositories/userRepository.test.ts
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
const userRepository_1 = __importDefault(require("../../repositories/userRepository"));
const userModel_1 = __importDefault(require("../../models/userModel"));
const userValidationRepository_1 = require("../../repositories/validation/userValidationRepository");
jest.mock('../../models/userModel');
jest.mock('../../repositories/validation/userValidationRepository');
const userRepository = new userRepository_1.default();
describe('UserRepository', () => {
    const mockUserData = {
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User',
        userId: "75b966b1-dcb6-4a7d-b45c-a1d0d0746446",
    };
    const mockAdminData = Object.assign(Object.assign({}, mockUserData), { userRole: 'admin', userId: "65b966b1-dcb6-457d-b45c-a1d0d0746446" });
    const mockStudentData = Object.assign(Object.assign({}, mockUserData), { userRole: 'student', studentId: 'student123', userId: "75b965b1-ecb6-4a7d-b45c-a1d0d0746446" });
    const mockUser = Object.assign(Object.assign({}, mockUserData), { _id: '1', userRole: 'admin', userId: '85c966b1-deb6-4a7d-b45c-c1d0d0746446', password: 'hashedPassword' });
    beforeEach(() => {
        jest.clearAllMocks();
    });
    describe('registerUser', () => {
        it('should register a new admin user successfully', () => __awaiter(void 0, void 0, void 0, function* () {
            userValidationRepository_1.validateUserData.mockResolvedValue(mockAdminData);
            userValidationRepository_1.checkExistingUser.mockResolvedValue(null);
            userValidationRepository_1.hashPassword.mockResolvedValue('hashedPassword');
            userModel_1.default.create.mockResolvedValue(mockUser);
            const user = yield userRepository.registerUser(mockAdminData);
            expect(user).toEqual(mockUser);
            expect(userValidationRepository_1.validateUserData).toHaveBeenCalledWith(mockAdminData);
            expect(userValidationRepository_1.checkExistingUser).toHaveBeenCalledWith(mockAdminData.email);
            expect(userValidationRepository_1.hashPassword).toHaveBeenCalledWith(mockAdminData.password);
            expect(userModel_1.default.create).toHaveBeenCalledWith(Object.assign(Object.assign({}, mockAdminData), { userId: expect.any(String), password: 'hashedPassword' }));
            console.log('user', user);
        }));
        it('should register a new student user successfully', () => __awaiter(void 0, void 0, void 0, function* () {
            userValidationRepository_1.validateUserData.mockResolvedValue(mockStudentData);
            userValidationRepository_1.checkExistingUser.mockResolvedValue(null);
            userValidationRepository_1.hashPassword.mockResolvedValue('hashedPassword');
            userModel_1.default.create.mockResolvedValue(mockUser);
            const user = yield userRepository.registerUser(mockStudentData);
            expect(user).toEqual(mockUser);
            expect(userValidationRepository_1.validateUserData).toHaveBeenCalledWith(mockStudentData);
            expect(userValidationRepository_1.checkExistingUser).toHaveBeenCalledWith(mockStudentData.email);
            expect(userValidationRepository_1.hashPassword).toHaveBeenCalledWith(mockStudentData.password);
            expect(userModel_1.default.create).toHaveBeenCalledWith(Object.assign(Object.assign({}, mockStudentData), { userId: expect.any(String), password: 'hashedPassword' }));
        }));
        it('should throw an error if the user already exists', () => __awaiter(void 0, void 0, void 0, function* () {
            userValidationRepository_1.validateUserData.mockResolvedValue(mockUserData);
            userValidationRepository_1.checkExistingUser.mockResolvedValue(mockUser);
            yield expect(userRepository.registerUser(mockUserData)).rejects.toThrow(`User with email ${mockUserData.email} already exists.`);
        }));
    });
    describe('getUserData', () => {
        it('should return user data if user exists', () => __awaiter(void 0, void 0, void 0, function* () {
            userModel_1.default.findOne.mockResolvedValue(mockUser);
            const user = yield userRepository.getUserData({ email: mockUserData.email });
            expect(user).toEqual(mockUser);
        }));
        it('should throw an error if the user does not exist', () => __awaiter(void 0, void 0, void 0, function* () {
            userModel_1.default.findOne.mockResolvedValue(null);
            yield expect(userRepository.getUserData({ email: mockUserData.email })).rejects.toThrow(`User with email ${mockUserData.email} does not exist.`);
        }));
    });
    describe('getAllUserData', () => {
        it('should return all users', () => __awaiter(void 0, void 0, void 0, function* () {
            userModel_1.default.find.mockResolvedValue([mockUser]);
            const users = yield userRepository.getAllUserData();
            expect(users).toEqual([mockUser]);
        }));
        it('should throw an error if no users are found', () => __awaiter(void 0, void 0, void 0, function* () {
            userModel_1.default.find.mockResolvedValue([]);
            yield expect(userRepository.getAllUserData()).rejects.toThrow('There are no users registered');
        }));
    });
    describe('updateUserData', () => {
        it('should update user data successfully', () => __awaiter(void 0, void 0, void 0, function* () {
            const updates = { name: 'Updated User' };
            userModel_1.default.findOneAndUpdate.mockResolvedValue(Object.assign(Object.assign({}, mockUser), updates));
            const updatedUser = yield userRepository.updateUserData({
                email: mockUserData.email,
                updates,
            });
            expect(updatedUser).toEqual(Object.assign(Object.assign({}, mockUser), updates));
        }));
        it('should throw an error if user data cannot be updated', () => __awaiter(void 0, void 0, void 0, function* () {
            userModel_1.default.findOneAndUpdate.mockResolvedValue(null);
            yield expect(userRepository.updateUserData({
                email: mockUserData.email,
                updates: {},
            })).rejects.toThrow(`Error occurred in updating data for user with email: ${mockUserData.email}`);
        }));
    });
    describe('deleteUser', () => {
        it('should delete user successfully', () => __awaiter(void 0, void 0, void 0, function* () {
            userModel_1.default.findOneAndDelete.mockResolvedValue(mockUser);
            const deletedUser = yield userRepository.deleteUser({ email: mockUserData.email });
            expect(deletedUser).toEqual(mockUser);
        }));
        it('should throw an error if user cannot be deleted', () => __awaiter(void 0, void 0, void 0, function* () {
            userModel_1.default.findOneAndDelete.mockResolvedValue(null);
            yield expect(userRepository.deleteUser({ email: mockUserData.email })).rejects.toThrow(`Error occurred in deleting user with email: ${mockUserData.email}`);
        }));
    });
    describe('resetPassword', () => {
        it('should return user and reset token if user exists', () => __awaiter(void 0, void 0, void 0, function* () {
            userModel_1.default.findOne.mockResolvedValue(mockUser);
            userValidationRepository_1.generateResetToken.mockReturnValue('resetToken');
            const response = yield userRepository.resetPassword({ email: mockUserData.email });
            // expect(response).toEqual({ user: mockUser, resetToken: 'resetToken' });
            expect(response).toEqual({
                user: mockUser,
                resetToken: 'resetToken',
                message: '',
                success: true
            });
        }));
        it('should throw an error if user does not exist', () => __awaiter(void 0, void 0, void 0, function* () {
            userModel_1.default.findOne.mockResolvedValue(null);
            yield expect(userRepository.resetPassword({ email: mockUserData.email })).rejects.toThrow(`User with email ${mockUserData.email} does not exist.`);
        }));
    });
});
