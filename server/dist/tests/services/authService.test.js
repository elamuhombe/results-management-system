"use strict";
//src/test/services/authService.ts
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
const authRepository_1 = __importDefault(require("../../repositories/authRepository"));
const authService_1 = __importDefault(require("../../services/authService"));
jest.mock('../../repositories/authRepository'); // Mock the authRepository to isolate authService tests
describe('AuthService', () => {
    let sampleId = new mongoose_1.default.Types.ObjectId('65345bcd12a3456789abcdef');
    const mockUser = {
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
        it('should return a token and user if login is successful', () => __awaiter(void 0, void 0, void 0, function* () {
            authRepository_1.default.loginUser.mockResolvedValue({ token: mockToken, user: mockUser });
            const result = yield authService_1.default.login('test@example.com', 'password123');
            expect(authRepository_1.default.loginUser).toHaveBeenCalledWith('test@example.com', 'password123');
            expect(result).toEqual({ token: mockToken, user: mockUser });
        }));
        it('should throw an error if login fails', () => __awaiter(void 0, void 0, void 0, function* () {
            authRepository_1.default.loginUser.mockRejectedValue(new Error('Invalid credentials'));
            yield expect(authService_1.default.login('test@example.com', 'wrongPassword'))
                .rejects
                .toThrow('Invalid credentials');
            expect(authRepository_1.default.loginUser).toHaveBeenCalledWith('test@example.com', 'wrongPassword');
        }));
    });
    describe('logout', () => {
        it('should call the logout method in authRepository', () => {
            authService_1.default.logout();
            expect(authRepository_1.default.logoutUser).toHaveBeenCalled();
        });
    });
});
