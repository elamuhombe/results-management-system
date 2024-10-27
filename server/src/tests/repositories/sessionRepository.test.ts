import { SessionModel } from "../../models/sessionModel"; // Adjust the import according to your model's location
import { ISession } from "../../types/types"; // Adjust based on your actual types

import {
  validateSessionData,
  checkExistingSession,
} from "../../repositories/validation/sessionValidationRepository"; // Adjust based on your structure
import mongoose from "mongoose";
import SessionRepository from "../../repositories/sessionRepository";

jest.mock("../../models/sessionModel"); // Mock the SessionModel
jest.mock("../../repositories/validation/sessionValidationRepository"); // Mock validation functions

describe("SessionRepository", () => {
  let sessionRepo: SessionRepository;
  const session_id = new mongoose.Types.ObjectId('7717505c94674a67f23e5a6d');
  const sampleSessionId = "7989";
  const sampleUserId = "892"

  beforeEach(() => {
    sessionRepo = new SessionRepository();
  });

  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test
  });

  describe("createSession", () => {
    it("should create a new session", async () => {
      const sessionData: ISession = {
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

      (validateSessionData as jest.Mock).mockResolvedValue(sessionData);
      (checkExistingSession as jest.Mock).mockResolvedValue(null);
      (SessionModel.create as jest.Mock).mockResolvedValue(sessionData);

      const result = await sessionRepo.createSession(sessionData);

      expect(validateSessionData).toHaveBeenCalledWith(sessionData);
      expect(checkExistingSession).toHaveBeenCalledWith(sessionData.user.userId);
      expect(SessionModel.create).toHaveBeenCalledWith(sessionData);
      expect(result).toEqual(sessionData);
    });

    it("should throw an error if session already exists", async () => {
      const sessionData: ISession = {
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

      (validateSessionData as jest.Mock).mockResolvedValue(sessionData);
      (checkExistingSession as jest.Mock).mockResolvedValue(true);

      await expect(sessionRepo.createSession(sessionData)).rejects.toThrow(
        `Session data already exists for user  with  ID ${sessionData.user.userId}`
      );
      
      
    });
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
    it("should return a session by user ID", async () => {
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

      (SessionModel.findOne as jest.Mock).mockResolvedValue(session);

      const result = await sessionRepo.getSessionByUserId("12345");

      expect(SessionModel.findOne).toHaveBeenCalledWith({ userId: "12345", isActive: true });
      expect(result).toEqual(session);
    });

    it("should throw an error if session does not exist", async () => {
      (SessionModel.findOne as jest.Mock).mockResolvedValue(null);

      await expect(sessionRepo.getSessionByUserId("12345")).rejects.toThrow(
        "Session with ID 12345 does not exist."
      );
    });
  });
  
  describe("getAllActiveSessionsByUserId", () => {
    const sampleUserId = "12345";
    const sampleSessionId1 = "sessionId1";
    const sampleSessionId2 = "sessionId2";
   
  
    it("should return all active sessions by user ID", async () => {
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
  
      (SessionModel.find as jest.Mock).mockResolvedValue(sessions);
  
      const result = await sessionRepo.getAllActiveSessionsByUserId(sampleUserId);
  
      expect(SessionModel.find).toHaveBeenCalledWith({ userId: sampleUserId, isActive: true });
      expect(result).toEqual(sessions);
    });
  
    it("should throw an error if no active sessions exist for the given user ID", async () => {
      (SessionModel.find as jest.Mock).mockResolvedValue([]);
  
      await expect(sessionRepo.getAllActiveSessionsByUserId(sampleUserId)).rejects.toThrow(
        "No sessions were found"
      );
    });
  });
  
  
});
