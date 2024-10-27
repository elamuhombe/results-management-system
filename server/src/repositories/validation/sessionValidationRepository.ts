// src/repositories/sessionValidationRepository.ts


import {ISession } from "../../types/types"; // Importing IAttendanceMark interface
import { Types } from "mongoose";
import { AttendanceMarkModel } from "../../models/marksModel";
import sessionValidationSchema from "../../validation/sessionValidation";
import { SessionModel } from "../../models/sessionModel";

// Validate the attendance data against the attendance validation schema
export const validateSessionData = async (
  sessionData: ISession
): Promise<ISession> => {
  // Validate the incoming data
  const validatedData = await sessionValidationSchema.parseAsync(
    sessionData
  );

  // Convert _id to mongoose.Types.ObjectId and return a new object
  return {
    ...validatedData,
    _id: new Types.ObjectId(validatedData._id),  // Convert the main _id to ObjectId
    user: {
       
        userId:validatedData.user.userId,
       
    }
} as ISession;  // Type assertion to IAttendanceMark
};

// Check if attendance already exists for the student on a specific date
export const checkExistingSession = async (
sessionId: string): Promise<ISession | null> => {
  return await SessionModel.findOne({ sessionId});
};
