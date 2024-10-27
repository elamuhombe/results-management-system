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
const sessionModel_1 = require("../../models/sessionModel"); // Adjust the import according to your model's location
const sessionValidationRepository_1 = require("../../repositories/validation/sessionValidationRepository"); // Adjust based on your structure
const mongoose_1 = __importDefault(require("mongoose"));
const sessionRepository_1 = __importDefault(require("../../repositories/sessionRepository"));
jest.mock("../../models/sessionModel"); // Mock the SessionModel
jest.mock("../../repositories/validation/sessionValidationRepository"); // Mock validation functions
describe("SessionRepository", () => {
    let sessionRepo;
    const session_id = new mongoose_1.default.Types.ObjectId('7717505c94674a67f23e5a6d');
    const sampleSessionId = "7989";
    const sampleUserId = "892";
    beforeEach(() => {
        sessionRepo = new sessionRepository_1.default();
    });
    afterEach(() => {
        jest.clearAllMocks(); // Clear mocks after each test
    });
    describe("createSession", () => {
        it("should create a new session", () => __awaiter(void 0, void 0, void 0, function* () {
            const sessionData = {
                user: {
                    userId: sampleUserId,
                },
                isActive: true,
                sessionId: sampleSessionId,
                _id: session_id,
                expiresAt: new Date("2024-12-31T23:59:59Z"),
                ipAddress: "192.168.254.24",
                userAgent: "mobile"
            };
            sessionValidationRepository_1.validateSessionData.mockResolvedValue(sessionData);
            sessionValidationRepository_1.checkExistingSession.mockResolvedValue(null);
            sessionModel_1.SessionModel.create.mockResolvedValue(sessionData);
            const result = yield sessionRepo.createSession(sessionData);
            expect(sessionValidationRepository_1.validateSessionData).toHaveBeenCalledWith(sessionData);
            expect(sessionValidationRepository_1.checkExistingSession).toHaveBeenCalledWith(sessionData.user.userId);
            expect(sessionModel_1.SessionModel.create).toHaveBeenCalledWith(sessionData);
            expect(result).toEqual(sessionData);
        }));
        it("should throw an error if session already exists", () => __awaiter(void 0, void 0, void 0, function* () {
            const sessionData = {
                user: {
                    userId: sampleUserId,
                },
                isActive: true,
                sessionId: sampleSessionId,
                _id: session_id,
                expiresAt: new Date("2024-12-31T23:59:59Z"),
                ipAddress: "192.168.254.24",
                userAgent: "mobile"
            };
            sessionValidationRepository_1.validateSessionData.mockResolvedValue(sessionData);
            sessionValidationRepository_1.checkExistingSession.mockResolvedValue(true);
            yield expect(sessionRepo.createSession(sessionData)).rejects.toThrow(`Session data already exists for user  with  ID ${sessionData.user.userId}`);
        }));
    });
    //   it("should return all sessions", async () => {
    //     const sessions = [
    //       {
    //         user: {
    //           userId: sampleUserId,
    //         },
    //         isActive: true,
    //         sessionId: sampleSessionId,
    //         _id: session_id,
    //         expiresAt: new Date("2024-12-31T23:59:59Z"),
    //         ipAddress: "192.168.254.24",
    //         userAgent: "laptop"
    //       },
    //     ];
    //     (SessionModel.find as jest.Mock).mockResolvedValue(sessions);
    //     const result = await sessionRepo.getAllSessions();
    //     expect(SessionModel.find).toHaveBeenCalled();
    //     expect(result).toEqual(sessions);
    //   });
    //   it("should throw an error if no sessions are found", async () => {
    //     (SessionModel.find as jest.Mock).mockResolvedValue([]);
    //     await expect(sessionRepo.getAllSessions()).rejects.toThrow(
    //       "No sessions found."
    //     );
    //   });
    // });
    describe("getSessionByUserId", () => {
        it("should return a session by user ID", () => __awaiter(void 0, void 0, void 0, function* () {
            const session = {
                user: {
                    userId: sampleUserId,
                },
                isActive: true,
                sessionId: sampleSessionId,
                _id: session_id,
                expiresAt: new Date("2024-12-31T23:59:59Z"),
                ipAddress: "192.168.254.24",
                userAgent: "mobile"
            };
            sessionModel_1.SessionModel.findOne.mockResolvedValue(session);
            const result = yield sessionRepo.getSessionByUserId("12345");
            expect(sessionModel_1.SessionModel.findOne).toHaveBeenCalledWith({ userId: "12345", isActive: true });
            expect(result).toEqual(session);
        }));
        it("should throw an error if session does not exist", () => __awaiter(void 0, void 0, void 0, function* () {
            sessionModel_1.SessionModel.findOne.mockResolvedValue(null);
            yield expect(sessionRepo.getSessionByUserId("12345")).rejects.toThrow("Session with ID 12345 does not exist.");
        }));
    });
    describe("getAllActiveSessionsByUserId", () => {
        const sampleUserId = "12345";
        const sampleSessionId1 = "sessionId1";
        const sampleSessionId2 = "sessionId2";
        it("should return all active sessions by user ID", () => __awaiter(void 0, void 0, void 0, function* () {
            const sessions = [
                {
                    userId: sampleUserId,
                    isActive: true,
                    sessionId: sampleSessionId1,
                    _id: "session_id_1",
                    expiresAt: new Date("2024-12-31T23:59:59Z"),
                    ipAddress: "192.168.254.24",
                    userAgent: "desktop",
                },
                {
                    userId: sampleUserId,
                    isActive: true,
                    sessionId: sampleSessionId2,
                    _id: "session_id_2",
                    expiresAt: new Date("2024-12-31T23:59:59Z"),
                    ipAddress: "192.168.254.25",
                    userAgent: "mobile",
                },
            ];
            sessionModel_1.SessionModel.find.mockResolvedValue(sessions);
            const result = yield sessionRepo.getAllActiveSessionsByUserId(sampleUserId);
            expect(sessionModel_1.SessionModel.find).toHaveBeenCalledWith({ userId: sampleUserId, isActive: true });
            expect(result).toEqual(sessions);
        }));
        it("should throw an error if no active sessions exist for the given user ID", () => __awaiter(void 0, void 0, void 0, function* () {
            sessionModel_1.SessionModel.find.mockResolvedValue([]);
            yield expect(sessionRepo.getAllActiveSessionsByUserId(sampleUserId)).rejects.toThrow("No sessions were found");
        }));
    });
});
