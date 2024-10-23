// src/services/sessionService.ts

import { SessionModel } from '../models/sessionModel';
import SessionRepository from '../repositories/sessionRepository';
import IUser, { ISession } from '../types/types'; // Assuming IUser is defined in your types
import bcrypt from 'bcrypt'; // For password hashing
import { sign } from 'jsonwebtoken'; // For creating JWT tokens

class SessionService {
  private sessionRepository: SessionRepository;

  constructor() {
    this.sessionRepository = new SessionRepository();
  }

  // Create a new session
  async createSession(sessionData: ISession): Promise<ISession> {
    return await this.sessionRepository.createSession(sessionData);
  }

  // Find a session by user ID
  async findSessionByUserId(userId: string): Promise<ISession | null> {
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

 // Login method
async login(user: IUser, password: string, ipAddress: string, userAgent: string): Promise<ISession | null> {
    // Check if user exists and verify password
    if (!user) {
      throw new Error('User not found');
    }
  
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }
  
    // Create a new session data object
    const sessionData: ISession = {
      userId: user.userId,
      expiresAt: new Date(Date.now() + 3600000), // Session expires in 1 hour
      ipAddress: ipAddress,
      userAgent: userAgent,
      isActive: true,
    };
  
    // Save the session data to the database using Mongoose model
    const newSession = new SessionModel(sessionData);
    return await newSession.save();
  }
  
}

export default SessionService;
