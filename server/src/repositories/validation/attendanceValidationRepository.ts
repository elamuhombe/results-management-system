// src/repositories/attendanceValidationRepository.ts

import { attendanceMarkValidationSchema } from "../../validation/marksValidation";

import { IAttendanceMark } from "../../types/types"; // Importing IAttendanceMark interface
import mongoose, { Types } from "mongoose";
import { AttendanceMarkModel } from "../../models/marksModel";

// Validate the attendance data against the attendance validation schema
export const validateAttendanceData = async (
  attendanceData: IAttendanceMark
): Promise<IAttendanceMark> => {
  // Validate the incoming data
  const validatedData = await attendanceMarkValidationSchema.parseAsync(
    attendanceData
  );

  // Convert _id to mongoose.Types.ObjectId and return a new object
  return {
    ...validatedData,
    _id: new Types.ObjectId(validatedData._id),  // Convert the main _id to ObjectId
    student: {
        _id: new Types.ObjectId(validatedData.student._id),  // Convert student._id to ObjectId
        name:validatedData.student.name,
        studentId: validatedData.student.studentId,
    }
} as IAttendanceMark;  // Type assertion to IAttendanceMark
};

// Check if attendance already exists for the student on a specific date
export const checkExistingAttendance = async (
studentId: string, date: Date): Promise<IAttendanceMark | null> => {
  return await AttendanceMarkModel.findOne({ studentId, date });
};
