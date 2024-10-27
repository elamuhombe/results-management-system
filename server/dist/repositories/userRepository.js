"use strict";
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
// src/repositories/userRepository.ts
const userModel_1 = __importDefault(require("../models/userModel"));
const userValidationRepository_1 = require("./validation/userValidationRepository");
const uuid_1 = require("uuid");
class UserRepository {
    // Method to register and save a new user
    registerUser(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const validatedUserData = yield (0, userValidationRepository_1.validateUserData)(userData);
            // Check if studentId is provided if the userRole is 'student'
            if (validatedUserData.userRole === 'student' && !validatedUserData.studentId) {
                throw new Error('studentId is required for users with the role of student.');
            }
            const existingUser = yield (0, userValidationRepository_1.checkExistingUser)(validatedUserData.email);
            if (existingUser) {
                throw new Error(`User with email ${validatedUserData.email} already exists.`);
            }
            const hashedPassword = yield (0, userValidationRepository_1.hashPassword)(validatedUserData.password);
            // Generate a unique userId
            const userId = (0, uuid_1.v4)(); // Generate userId using uuid
            const newUser = yield userModel_1.default.create(Object.assign(Object.assign({}, validatedUserData), { userId, password: hashedPassword }));
            return newUser;
        });
    }
    // Method to get a specific user
    getUserData(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingUser = yield userModel_1.default.findOne({ email: userData.email });
            if (!existingUser) {
                throw new Error(`User with email ${userData.email} does not exist.`);
            }
            return existingUser;
        });
    }
    // Method to get all users
    getAllUserData() {
        return __awaiter(this, void 0, void 0, function* () {
            const existingUsers = yield userModel_1.default.find();
            if (existingUsers.length === 0) {
                throw new Error('There are no users registered');
            }
            return existingUsers;
        });
    }
    // Method to update user data
    updateUserData(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedUserData = yield userModel_1.default.findOneAndUpdate({ email: userData.email }, userData.updates, { new: true });
            if (!updatedUserData) {
                throw new Error(`Error occurred in updating data for user with email: ${userData.email}`);
            }
            return updatedUserData;
        });
    }
    // Method to delete user
    deleteUser(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedUser = yield userModel_1.default.findOneAndDelete({ email: userData.email });
            if (!deletedUser) {
                throw new Error(`Error occurred in deleting user with email: ${userData.email}`);
            }
            return deletedUser;
        });
    }
    // Method to reset user password
    resetPassword(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield userModel_1.default.findOne({ email: userData.email });
            if (!user) {
                throw new Error(`User with email ${userData.email} does not exist.`);
            }
            const resetToken = (0, userValidationRepository_1.generateResetToken)(user.email);
            return { user, resetToken, message: '', success: true };
        });
    }
}
exports.default = UserRepository;
