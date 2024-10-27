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
const sessionModel_1 = require("../models/sessionModel");
const ErrorHandler_1 = __importDefault(require("../utils/ErrorHandler"));
const sessionValidationRepository_1 = require("./validation/sessionValidationRepository");
class SessionRepository {
    // Method to create a new session
    createSession(sessionData) {
        return __awaiter(this, void 0, void 0, function* () {
            // Validate the input data
            const validatedSessionData = yield (0, sessionValidationRepository_1.validateSessionData)(sessionData);
            // Check for existing user Id before creating a new one
            const existingSession = yield (0, sessionValidationRepository_1.checkExistingSession)(validatedSessionData.user.userId);
            if (existingSession) {
                throw new ErrorHandler_1.default(`Session data already exists for user  with  ID ${validatedSessionData.user.userId}`, 409);
            }
            // Create a new session in the database
            const newSessionValidatedData = yield sessionModel_1.SessionModel.create(validatedSessionData);
            return newSessionValidatedData;
        });
    }
    // Method to find a session by user ID
    getSessionByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            // Find an active session for the given user ID
            const session = yield sessionModel_1.SessionModel.findOne({
                "userId": userId,
                isActive: true,
            });
            // If no session is found, throw an error with the expected message
            if (!session) {
                throw new ErrorHandler_1.default(`Session with ID ${userId} does not exist.`, 404);
            }
            // Return the found session
            return session;
        });
    }
    // Method to find a session by session ID
    getSessionById(sessionId) {
        return __awaiter(this, void 0, void 0, function* () {
            const session = yield sessionModel_1.SessionModel.findOne({ sessionId, isActive: true });
            if (!session) {
                throw new ErrorHandler_1.default(`No session found with ID: ${sessionId}`, 404);
            }
            return session;
        });
    }
    //Method to get all active sessions by user id
    getAllActiveSessionsByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const allActiveSessions = yield sessionModel_1.SessionModel.find({ userId, isActive: true });
            if (allActiveSessions.length === 0) {
                throw new ErrorHandler_1.default(`No sessions were found`, 404);
            }
            return allActiveSessions;
        });
    }
    // Method to deactivate a session
    deactivateSession(sessionId) {
        return __awaiter(this, void 0, void 0, function* () {
            const session = yield sessionModel_1.SessionModel.findOneAndUpdate({ sessionId }, { isActive: false, updatedAt: new Date() }, { new: true });
            if (!session) {
                throw new ErrorHandler_1.default(`No active session found with ID: ${sessionId}`, 404);
            }
            // Return the session populated with the user field
            return session.populate("user");
        });
    }
    // Optional: Method to list all active sessions (if needed)
    listActiveSessions() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield sessionModel_1.SessionModel.find({ isActive: true });
        });
    }
}
exports.default = SessionRepository;
