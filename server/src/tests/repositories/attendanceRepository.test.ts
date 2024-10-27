//src/tests/attendanceRepository.test.ts


import { AttendanceMarkModel } from "../../models/marksModel";
import { IAttendanceMark } from "../../types/types";
import AttendanceMarkRepository from "../../repositories/marks/attendanceRepository";
import {
  checkExistingAttendance,
  validateAttendanceData,
} from "../../repositories/validation/attendanceValidationRepository";
import mongoose from "mongoose";

jest.mock("../../models/marksModel"); // Mock the AttendanceMarkModel
jest.mock("../../repositories/validation/attendanceValidationRepository"); // Mock validation functions

describe("AttendanceMarkRepository", () => {
  let attendanceMarkRepo: AttendanceMarkRepository;
  const student_id = new mongoose.Types.ObjectId('7717505c94674a67f23e5a6d');
  const sampleAttendanceId = new mongoose.Types.ObjectId('4717509c94674a67f23e5a6d');

  beforeEach(() => {
    attendanceMarkRepo = new AttendanceMarkRepository();
  });

  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test
  });

  describe("createAttendanceMark", () => {
    it("should create a new attendance mark", async () => {
      const attendanceData: IAttendanceMark = {
          student: {
           _id: student_id,
              name: "John Doe",
              studentId: "12345",
          },
          date: new Date("2024-10-23"),
          attendancePercentage: 100,
          marks: 17,
          status: "present",
          _id: sampleAttendanceId
      };

      (validateAttendanceData as jest.Mock).mockResolvedValue(attendanceData);
      (checkExistingAttendance as jest.Mock).mockResolvedValue(null);
      (AttendanceMarkModel.create as jest.Mock).mockResolvedValue(attendanceData);

      const result = await attendanceMarkRepo.createAttendanceMark(attendanceData);

      expect(validateAttendanceData).toHaveBeenCalledWith(attendanceData);
      expect(checkExistingAttendance).toHaveBeenCalledWith(attendanceData.student.studentId, attendanceData.date);
      expect(AttendanceMarkModel.create).toHaveBeenCalledWith(attendanceData);
      expect(result).toEqual(attendanceData);
    });

    it("should throw an error if attendance mark already exists", async () => {
      const attendanceData: IAttendanceMark = {
        student: {
          _id: student_id,
          name: "John Doe",
          studentId: "12345",
        },
        date: new Date("2024-10-23"),
        attendancePercentage: 100,
        marks: 18,
        status: "present",
        _id: sampleAttendanceId
      };

      (validateAttendanceData as jest.Mock).mockResolvedValue(attendanceData);
      (checkExistingAttendance as jest.Mock).mockResolvedValue(true);

      await expect(attendanceMarkRepo.createAttendanceMark(attendanceData)).rejects.toThrow(
        `Attendance mark already exists for student with ID ${attendanceData.student.studentId} on ${attendanceData.date}`
      );
    });
  });

  describe("getAllAttendanceMarks", () => {
    it("should return all attendance marks", async () => {
      const attendanceMarks = [
        {
          student: {
            _id: student_id,
            name: "John Doe",
            userRole: "student",
            studentId: "12345",
          },
          date: new Date("2024-10-23"),
          attendancePercentage: 100,
          marks: 17,
          status: "present",
          _id: sampleAttendanceId
        },
      ];

      (AttendanceMarkModel.find as jest.Mock).mockResolvedValue(attendanceMarks);

      const result = await attendanceMarkRepo.getAllAttendanceMarks();

      expect(AttendanceMarkModel.find).toHaveBeenCalled();
      expect(result).toEqual(attendanceMarks);
    });

    it("should throw an error if no attendance marks are found", async () => {
      (AttendanceMarkModel.find as jest.Mock).mockResolvedValue([]);

      await expect(attendanceMarkRepo.getAllAttendanceMarks()).rejects.toThrow(
        "No attendance marks found."
      );
    });
  });

  describe("getAttendanceMarkByStudentId", () => {
    it("should return an attendance mark by student ID", async () => {
      const attendanceMark = {
        student: {
          _id: student_id,
          name: "John Doe",
          studentId: "12345",
        },
        date: new Date("2024-10-23"),
        attendancePercentage: 100,
        status: "present",
        marks: 25,
      };

      (AttendanceMarkModel.findOne as jest.Mock).mockResolvedValue(attendanceMark);

      const result = await attendanceMarkRepo.getAttendanceMarkByStudentId("12345");

      expect(AttendanceMarkModel.findOne).toHaveBeenCalledWith({ studentId: "12345" });
      expect(result).toEqual(attendanceMark);
    });

    it("should throw an error if attendance mark does not exist", async () => {
      (AttendanceMarkModel.findOne as jest.Mock).mockResolvedValue(null);

      await expect(attendanceMarkRepo.getAttendanceMarkByStudentId("12345")).rejects.toThrow(
        "Attendance mark with ID 12345 does not exist."
      );
    });
  });

  describe("updateAttendanceDataByStudentId", () => {
    it("should update attendance data for a given student ID", async () => {
      const updatedData = {
        student: {
          _id: student_id,
          name: "John Doe",
          studentId: "12345",
        },
        date: "2024-10-23",
        attendancePercentage: 100,
        status: "present",
        marks:  26,
        _id: sampleAttendanceId
      };

      (AttendanceMarkModel.findOneAndUpdate as jest.Mock).mockResolvedValue(updatedData);

      const result = await attendanceMarkRepo.updateAttendanceDataByStudentId("12345", {status: 'absent'});

      expect(AttendanceMarkModel.findOneAndUpdate).toHaveBeenCalledWith(
        { studentId: "12345" },
        { status: 'absent' },
        { new: true }
    );
    
      expect(result).toEqual(updatedData);
    });

    it("should throw an error if updating attendance data fails", async () => {
      (AttendanceMarkModel.findOneAndUpdate as jest.Mock).mockRejectedValue(new Error("Error updating attendance data for student with id: 12345"));

      await expect(attendanceMarkRepo.updateAttendanceDataByStudentId("12345", {marks: 31})).rejects.toThrow(
        "Error updating attendance data for student with id: 12345"
      );
      
    });
  });

  describe("deleteAttendanceMark", () => {
    it("should delete an attendance mark by student ID", async () => {
      const deletedData = {
        student: {
          _id: student_id,
          name: "John Doe",
          studentId: "12345",
        },
        date: "2024-10-23",
        attendancePercentage: 100,
        status: "present",
        marks: 28,
        _id: sampleAttendanceId
      };

      (AttendanceMarkModel.findByIdAndDelete as jest.Mock).mockResolvedValue(deletedData);

      const result = await attendanceMarkRepo.deleteAttendanceMark("12345");

      expect(AttendanceMarkModel.findByIdAndDelete).toHaveBeenCalledWith("12345");
      expect(result).toEqual(deletedData);
    });

    it("should throw an error if deleting an attendance mark fails", async () => {
      // Mock `findByIdAndDelete` to throw an error instead of resolving to null
(AttendanceMarkModel.findByIdAndDelete as jest.Mock).mockRejectedValue(
  new Error("Error occurred while deleting attendance mark with ID: 12345")
);

// Now `deleteAttendanceMark` should reject, allowing `rejects.toThrow` to catch it
await expect(attendanceMarkRepo.deleteAttendanceMark("12345")).rejects.toThrow(
  "Error occurred while deleting attendance mark with ID: 12345"
);

    });
  });
});
