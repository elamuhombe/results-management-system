import { SessionModel } from "../models/sessionModel";
import { ISession } from "../types/types";
import ErrorHandler from "../utils/ErrorHandler";
import { checkExistingSession, validateSessionData } from "./validation/sessionValidationRepository";

class SessionRepository {
  // Method to create a new session
  async createSession(sessionData: ISession): Promise<ISession> {
    // Validate the input data
    const validatedSessionData = await validateSessionData(sessionData);

    // Check for existing user Id before creating a new one
    const existingSession = await checkExistingSession(validatedSessionData.user.userId);
    if (existingSession) {
      throw new ErrorHandler(`Session data already exists for user  with  ID ${validatedSessionData.user.userId}`, 409);
    }

    // Create a new session in the database
    const newSessionValidatedData = await SessionModel.create(validatedSessionData);
    return newSessionValidatedData;
  }

// Method to find a session by user ID
async getSessionByUserId(userId: string): Promise<ISession | null> {
  // Find an active session for the given user ID
  const session = await SessionModel.findOne({
      "userId": userId,
      isActive: true,
  });

  // If no session is found, throw an error with the expected message
  if (!session) {
      throw new ErrorHandler(`Session with ID ${userId} does not exist.`, 404);
  }

  // Return the found session
  return session;
}


  // Method to find a session by session ID
  async getSessionById(sessionId: string): Promise<ISession | null> {
    const session = await SessionModel.findOne({ sessionId, isActive: true });

    if (!session) {
      throw new ErrorHandler(`No session found with ID: ${sessionId}`, 404);
    }

    return session;
  }

  //Method to get all active sessions by user id
  async getAllActiveSessionsByUserId(userId: string):Promise<ISession[]>{
    const allActiveSessions = await SessionModel.find({userId, isActive: true})

    if(allActiveSessions.length === 0){
      throw new ErrorHandler(`No sessions were found`, 404); 
    }
    return allActiveSessions
  }

  // Method to deactivate a session
  async deactivateSession(sessionId: string): Promise<ISession | null> {
    const session = await SessionModel.findOneAndUpdate(
      { sessionId },
      { isActive: false, updatedAt: new Date() },
      { new: true }
    );

    if (!session) {
      throw new ErrorHandler(`No active session found with ID: ${sessionId}`, 404);
    }

    // Return the session populated with the user field
    return session.populate("user");
  }

  // Optional: Method to list all active sessions (if needed)
  async listActiveSessions(): Promise<ISession[]> {
    return await SessionModel.find({ isActive: true });
  }
}

export default SessionRepository;
