"use strict";
//src/tests/authRepository.test.ts
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
const authRepository_1 = __importDefault(require("../../repositories/authRepository"));
const userModel_1 = __importDefault(require("../../models/userModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
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
        it('should log in a user and return a token', () => __awaiter(void 0, void 0, void 0, function* () {
            userModel_1.default.findOne.mockResolvedValue(Object.assign(Object.assign({}, mockUserData), { password: 'hashedPassword' })); // Mock the user lookup
            bcrypt_1.default.compare.mockResolvedValue(true); // Mock the password comparison
            jsonwebtoken_1.default.sign.mockReturnValue('mockToken'); // Mock JWT signing
            const result = yield authRepository_1.default.loginUser(mockUserData.email, mockUserData.password);
            expect(result).toEqual({ token: 'mockToken', user: Object.assign(Object.assign({}, mockUserData), { password: 'hashedPassword' }) }); // Check result
            expect(userModel_1.default.findOne).toHaveBeenCalledWith({ email: mockUserData.email }); // Check user lookup
            expect(bcrypt_1.default.compare).toHaveBeenCalledWith(mockUserData.password, 'hashedPassword'); // Check password comparison
        }));
        it('should throw an error if user is not found', () => __awaiter(void 0, void 0, void 0, function* () {
            userModel_1.default.findOne.mockResolvedValue(null); // Mock user not found
            yield expect(authRepository_1.default.loginUser(mockUserData.email, mockUserData.password)).rejects.toThrow('User not found'); // Expect error
        }));
        it('should throw an error if credentials are invalid', () => __awaiter(void 0, void 0, void 0, function* () {
            userModel_1.default.findOne.mockResolvedValue(Object.assign(Object.assign({}, mockUserData), { password: 'hashedPassword' }));
            bcrypt_1.default.compare.mockResolvedValue(false); // Mock invalid password
            yield expect(authRepository_1.default.loginUser(mockUserData.email, mockUserData.password)).rejects.toThrow('Invalid credentials'); // Expect error
        }));
    });
    describe('logoutUser', () => {
        it('should log out the user and log the message "User logged out"', () => {
            const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => { }); // Prevents actual console output
            try {
                authRepository_1.default.logoutUser(); // Call logout
                expect(consoleSpy).toHaveBeenCalledWith('User logged out'); // Check console output
            }
            finally {
                consoleSpy.mockRestore(); // restore console.log
            }
        });
    });
});
