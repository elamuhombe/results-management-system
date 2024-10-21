//src/services/sessionService.ts
import SessionRepository from '../repositories/sessionRepository';
import { ISession } from '../types/types';

class SessionService {
  private sessionRepository = new SessionRepository();

  // Create a new session
  async createSession(sessionData: ISession): Promise<ISession> {
    return await this.sessionRepository.createSession(sessionData);
  }

  // Get a session by user ID
  async getSessionByUserId(userId: string): Promise<ISession | null> {
    return await this.sessionRepository.findSessionByUserId(userId);
  }

  // Update a session
  async updateSession(sessionId: string, updateData: Partial<ISession>): Promise<ISession | null> {
    return await this.sessionRepository.updateSession(sessionId, updateData);
  }

  // Delete a session
  async deleteSession(sessionId: string): Promise<ISession | null> {
    return await this.sessionRepository.deleteSession(sessionId);
  }
}

export default SessionService;
