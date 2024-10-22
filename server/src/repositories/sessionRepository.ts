import { SessionModel } from "../models/sessionModel";
import { ISession } from "../types/types";
import ErrorHandler from "../utils/ErrorHandler";
import { z } from "zod"; // Import ZodError if you're using it
import sessionSchema from "../validation/sessionValidation";
import { Types } from "mongoose";

class SessionRepository {
// Method to create a new session
async createSession(sessionData: any): Promise<ISession> {
  // Validate the input data
  const validatedData = sessionSchema.parse(sessionData);

  // Convert string IDs to ObjectId
  const session: ISession = {
    _id: new Types.ObjectId(validatedData._id), // Convert to ObjectId
    user: {
      _id: new Types.ObjectId(validatedData.user._id), // Convert to ObjectId
      email: validatedData.user.email,
      password: validatedData.user.password,
      name: validatedData.user.name,
      userRole: validatedData.user.userRole
    },
    sessionId: validatedData.sessionId,
    expiresAt: validatedData.expiresAt,
    ipAddress: validatedData.ipAddress,
    userAgent: validatedData.userAgent,
    isActive: validatedData.isActive,
    createdAt: validatedData.createdAt,
    updatedAt: validatedData.updatedAt,
  };

  // Proceed to save the session to the database
  const sessionModel = new SessionModel(session);
  return await sessionModel.save();
}
  

  // Method to find a session by user ID
  async findSessionByUserId(userId: string): Promise<ISession | null> {
    const session = await SessionModel.findOne({ "user._id": userId, isActive: true });
    console.log(session); // Log to check what is being returned
    

    if (!session) {
      throw new ErrorHandler(`No active session found for user ID: ${userId}`, 404);
    }

    return session;
  }

  // Method to find a session by session ID
  async findSessionById(sessionId: string): Promise<ISession | null> {
    const session = await SessionModel.findOne({  sessionId, isActive: true });
    console.log(session); // Log to check what is being returned
    

    if (!session) {
      throw new ErrorHandler(`No session found with ID: ${sessionId}`, 404);
    }

    return session;
  }

  // Method to deactivate a session
  async deactivateSession(sessionId: string): Promise<ISession | null> {
    const session = await SessionModel.findOneAndUpdate(
      { sessionId: sessionId },
      { isActive: false, updatedAt: new Date() },
      { new: true }
    );
  
    if (!session) {
      throw new ErrorHandler(`No active session found with ID: ${sessionId}`, 404);
    }
  
    // Return the session populated with the user field
    return session.populate("user");
  }
  
}

export default SessionRepository;
