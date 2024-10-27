// src/repositories/attendanceMarkRepository.ts

import { AttendanceMarkModel } from "../../models/marksModel";
import { IAttendanceMark } from "../../types/types";
import {
  checkExistingAttendance,
  validateAttendanceData,
} from "../validation/attendanceValidationRepository";

class AttendanceMarkRepository {
  // Method to create a new attendance mark
  async createAttendanceMark(
    attendanceData: IAttendanceMark
  ): Promise<IAttendanceMark> {
    // Validate the attendance data using attendanceValidationRepository
    const validatedData = await validateAttendanceData(attendanceData);

    // check for existing attendance before creating a new one
    const existingAttendance = await checkExistingAttendance(
      validatedData.student.studentId,
      validatedData.date
    );
    if (existingAttendance) {
      throw new Error(
        `Attendance mark already exists for student with ID ${validatedData.student.studentId} on ${validatedData.date}`
      );
    }

    const newAttendanceMark = await AttendanceMarkModel.create(validatedData);
    return newAttendanceMark;
  }

  // Method to get all attendance marks
  async getAllAttendanceMarks(): Promise<IAttendanceMark[] | null> {
    const attendanceMarks = await AttendanceMarkModel.find();
    if (attendanceMarks.length === 0 || !attendanceMarks) {
      throw new Error("No attendance marks found.");
    }
    return attendanceMarks;
  }

  // Method to get a specific attendance mark by student id
  async getAttendanceMarkByStudentId(
    studentId: string
  ): Promise<IAttendanceMark | null> {
    const attendanceMark = await AttendanceMarkModel.findOne({ studentId });
    if (!attendanceMark) {
      throw new Error(`Attendance mark with ID ${studentId} does not exist.`);
    }
    return attendanceMark;
  }

  // Method to update attendance marks data by student id
  async updateAttendanceDataByStudentId(
    studentId: string,
    updatedData: Partial<IAttendanceMark>
  ): Promise<IAttendanceMark | null> {
    const updatedAttendanceData = await AttendanceMarkModel.findOneAndUpdate(
      { studentId },
      updatedData,
      { new: true }
    );

    if (!updatedAttendanceData) {
      console.warn(`No attendance mark found for student with ID ${studentId}`);
      return null; // Return null instead of throwing an error
    }
    return updatedAttendanceData;
  }

  // Method to delete an attendance mark
  async deleteAttendanceMark(
    studentId: string 
  ): Promise<IAttendanceMark | null> {
    const deletedAttendanceMark = await AttendanceMarkModel.findByIdAndDelete(
      studentId
    );
    if (!deletedAttendanceMark) {
      console.warn(`No attendance mark found for student with ID ${studentId}`);
      return null; // Return null instead of throwing an error
    }
    return deletedAttendanceMark;
  }
}

export default AttendanceMarkRepository;
