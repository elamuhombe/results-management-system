"use strict";
// src/services/sessionService.ts
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
const sessionModel_1 = require("../models/sessionModel");
const sessionRepository_1 = __importDefault(require("../repositories/sessionRepository"));
const bcrypt_1 = __importDefault(require("bcrypt")); // For password hashing
class SessionService {
    constructor() {
        this.sessionRepository = new sessionRepository_1.default();
    }
    // Create a new session
    createSession(sessionData) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.sessionRepository.createSession(sessionData);
        });
    }
    // Find a session by user ID
    findSessionByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.sessionRepository.getSessionByUserId(userId);
        });
    }
    // Login method
    login(user, password, ipAddress, userAgent) {
        return __awaiter(this, void 0, void 0, function* () {
            // Check if user exists and verify password
            if (!user) {
                throw new Error('User not found');
            }
            const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
            if (!isPasswordValid) {
                throw new Error('Invalid password');
            }
            // Create a new session data object
            const sessionData = {
                user: {
                    userId: user.userId,
                },
                expiresAt: new Date(Date.now() + 3600000), // Session expires in 1 hour
                ipAddress: ipAddress,
                userAgent: userAgent,
                isActive: true,
                _id: new mongoose_1.default.Types.ObjectId(),
                sessionId: new mongoose_1.default.Types.ObjectId().toString() // Generate a session ID
            };
            // Save the session data to the database using Mongoose model
            const newSession = new sessionModel_1.SessionModel(sessionData);
            return yield newSession.save();
        });
    }
}
exports.default = SessionService;
