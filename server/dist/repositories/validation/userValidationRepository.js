"use strict";
// src/repositories/userValidationRepository.ts
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
exports.generateResetToken = exports.hashPassword = exports.checkExistingUser = exports.validateUserData = void 0;
const userValidation_1 = require("../../validation/userValidation");
const userModel_1 = __importDefault(require("../../models/userModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mongoose_1 = __importDefault(require("mongoose"));
// Validate the user data against the user validation schema
const validateUserData = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    // Validate the incoming data
    const validatedData = yield userValidation_1.userValidationSchema.parseAsync(userData);
    // Check for studentId if userRole is 'student'
    if (validatedData.userRole === 'student' && !validatedData.studentId) {
        throw new Error('studentId is required for users with the role of student.');
    }
    // Convert userId to mongoose.Types.ObjectId and return a new object
    return Object.assign(Object.assign({}, validatedData), { _id: new mongoose_1.default.Types.ObjectId(validatedData._id) }); // Ensure the return type matches IUser
});
exports.validateUserData = validateUserData;
// Check if a user already exists by email
const checkExistingUser = (email) => __awaiter(void 0, void 0, void 0, function* () {
    return yield userModel_1.default.findOne({ email });
});
exports.checkExistingUser = checkExistingUser;
// Hash the user's password
const hashPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    return yield bcrypt_1.default.hash(password, 10);
});
exports.hashPassword = hashPassword;
// Generate a reset token for password reset
const generateResetToken = (email) => {
    return jsonwebtoken_1.default.sign({ email }, process.env.JWT_SECRET || 'your_secret_key', {
        expiresIn: '1h',
    });
};
exports.generateResetToken = generateResetToken;
