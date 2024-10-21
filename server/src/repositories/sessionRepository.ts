//src/repositories/sessionRepository.ts

import { SessionModel } from '../models/sessionModel';
import { ISession } from '../types/types';

class SessionRepository {
  // Create a new session
  async createSession(sessionData: ISession): Promise<ISession> {
    const session = new SessionModel(sessionData);
    return await session.save();
  }

  // Find a session by user ID
  async findSessionByUserId(userId: string): Promise<ISession | null> {
    return await SessionModel.findOne({ userId, isActive: true });
  }

  // Update a session
  async updateSession(sessionId: string, updateData: Partial<ISession>): Promise<ISession | null> {
    return await SessionModel.findByIdAndUpdate(sessionId, updateData, { new: true });
  }

  // Delete a session
  async deleteSession(sessionId: string): Promise<ISession | null> {
    return await SessionModel.findByIdAndDelete(sessionId);
  }
}

export default SessionRepository;
