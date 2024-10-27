// src/tests/assessmentRepository.test.ts

import { AssessmentMarkModel } from "../../models/marksModel";
import { IAssessmentMark } from "../../types/types";
import AssessmentRepository from "../../repositories/marks/assessmentRepository";
import {
  checkExistingAssessmentData,
  validateAssessmentData,
} from "../../repositories/validation/assessmentValidationRepository";
import mongoose from "mongoose";

jest.mock("../../models/marksModel"); // Mock the AssessmentMarkModel
jest.mock("../../repositories/validation/assessmentValidationRepository"); // Mock validation functions

describe("AssessmentRepository", () => {
  let assessmentRepo: AssessmentRepository;
  const student_id = new mongoose.Types.ObjectId('7717505c94674a67f23e5a6d');
  const sampleAssessmentId = new mongoose.Types.ObjectId('4717509c94674a67f23e5a6d');

  beforeEach(() => {
    assessmentRepo = new AssessmentRepository();
  });

  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test
  });

  describe("createAssessmentData", () => {
    it("should create a new assessment mark", async () => {
      const assessmentData: IAssessmentMark = {
        student: {
          _id: student_id,
          name: "John Doe",
          studentId: "12345",
        },
        subject: "Mathematics",
        marks: 85,
        date: new Date("2024-10-23"),
        _id: sampleAssessmentId,
      };

      (validateAssessmentData as jest.Mock).mockResolvedValue(assessmentData);
      (checkExistingAssessmentData as jest.Mock).mockResolvedValue(null);
      (AssessmentMarkModel.create as jest.Mock).mockResolvedValue(assessmentData);

      const result = await assessmentRepo.createAssessmentData(assessmentData);

      expect(validateAssessmentData).toHaveBeenCalledWith(assessmentData);
      expect(checkExistingAssessmentData).toHaveBeenCalledWith(assessmentData.student.studentId);
      expect(AssessmentMarkModel.create).toHaveBeenCalledWith(assessmentData);
      expect(result).toEqual(assessmentData);
    });

    it("should throw an error if assessment mark already exists", async () => {
      const assessmentData: IAssessmentMark = {
        student: {
          _id: student_id,
          name: "John Doe",
          studentId: "12345",
        },
        subject: "Mathematics",
        marks: 85,
        date: new Date("2024-10-23"),
        _id: sampleAssessmentId,
      };

      (validateAssessmentData as jest.Mock).mockResolvedValue(assessmentData);
      (checkExistingAssessmentData as jest.Mock).mockResolvedValue(true);

      await expect(assessmentRepo.createAssessmentData(assessmentData)).rejects.toThrow(
        `Assessment data for student with id: ${assessmentData.student.studentId} already exists`
      );
    });
  });

  describe("updateAssessmentData", () => {
    it("should update assessment data for a given student ID", async () => {
      const updatedData = {
        student: {
          _id: student_id,
          name: "John Doe",
          studentId: "12345",
        },
        date: "2024-11-23",
        marks:  26,
        _id: sampleAssessmentId
      };

      (AssessmentMarkModel.findOneAndUpdate as jest.Mock).mockResolvedValue(updatedData);

      const result = await assessmentRepo.updateAssessmentData("12345", {marks: 26});

      expect(AssessmentMarkModel.findOneAndUpdate).toHaveBeenCalledWith(
        { studentId: "12345" },
        { marks: 26 },
        { new: true }
    );
    
      expect(result).toEqual(updatedData);
    });

    it("should throw an error if updating attendance data fails", async () => {
      (AssessmentMarkModel.findOneAndUpdate as jest.Mock).mockRejectedValue(new Error(`Error updating attendance data for student with id: 12345`
));

      await expect(assessmentRepo.updateAssessmentData("12345", {marks: 31})).rejects.toThrow(
        "Error updating attendance data for student with id: 12345"
      );
    })      


  describe("getAssessmentDataByStudentId", () => {
    it("should return assessment data by student ID", async () => {
      const assessmentData = {
        student: {
          _id: student_id,
          name: "John Doe",
          studentId: "12345",
        },
        subject: "Mathematics",
        marks: 85,
        date: new Date("2024-10-23"),
      };

      (AssessmentMarkModel.findOne as jest.Mock).mockResolvedValue(assessmentData);

      const result = await assessmentRepo.getAssessmentDataByStudentId("12345");

      expect(AssessmentMarkModel.findOne).toHaveBeenCalledWith({ studentId: "12345" });
      expect(result).toEqual(assessmentData);
    });

    it("should throw an error if assessment data does not exist", async () => {
      (AssessmentMarkModel.findOne as jest.Mock).mockResolvedValue(null);

      await expect(assessmentRepo.getAssessmentDataByStudentId("12345")).rejects.toThrow(
        `Error occured in fetching assessment data for student with id 12345`
      );
    });
  });

  describe("getAllAssessmentData", () => {
    it("should return all assessment data", async () => {
      const assessmentMarks = [
        {
          student: {
            _id: student_id,
            name: "John Doe",
            studentId: "12345",
          },
          subject: "Mathematics",
          marks: 85,
          date: new Date("2024-10-23"),
          _id: sampleAssessmentId,
        },
      ];

      (AssessmentMarkModel.find as jest.Mock).mockResolvedValue(assessmentMarks);

      const result = await assessmentRepo.getAllAssessmentData();

      expect(AssessmentMarkModel.find).toHaveBeenCalled();
      expect(result).toEqual(assessmentMarks);
    });

    it("should throw an error if no assessment data is found", async () => {
      (AssessmentMarkModel.find as jest.Mock).mockResolvedValue([]);

      await expect(assessmentRepo.getAllAssessmentData()).rejects.toThrow(
        `Error in fetching all assessment data`
      );
    });
  });

  describe('deleteAssessmentDataByStudentId', () => {
    const studentId = '12345';
    const mockDeletedData = { studentId, marks: 90 }; // Mock data to represent deleted assessment mark
  
    it('should delete and return assessment data for a valid student ID', async () => {
      // Mocking findOneAndDelete to return mockDeletedData
      (AssessmentMarkModel.findOneAndDelete as jest.Mock).mockResolvedValueOnce(mockDeletedData);
  
      const result = await assessmentRepo.deleteAssessmentDataByStudentId(studentId);
  
      expect(result).toEqual(mockDeletedData);
      expect(AssessmentMarkModel.findOneAndDelete).toHaveBeenCalledWith({ studentId });
    });
  
    it('should return null and log a warning if no data is found for the student ID', async () => {
      // Mocking findOneAndDelete to return null
      (AssessmentMarkModel.findOneAndDelete as jest.Mock).mockResolvedValueOnce(null);
  
      const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(); // Spy on console.warn
  
      const result = await assessmentRepo.deleteAssessmentDataByStudentId(studentId);
  
      expect(result).toBeNull();
      expect(AssessmentMarkModel.findOneAndDelete).toHaveBeenCalledWith({ studentId });
      expect(consoleWarnSpy).toHaveBeenCalledWith(`No assessment data found for student with ID ${studentId}`);
  
      consoleWarnSpy.mockRestore(); // Restore console.warn after the test
    });
  });

  describe("deleteAllAssessmentData", () => {
    it("should delete all assessment data", async () => {
      const deletedCount = 5;
      (AssessmentMarkModel.deleteMany as jest.Mock).mockResolvedValue({ deletedCount });

      const result = await assessmentRepo.deleteAllAssessmentData();

      expect(AssessmentMarkModel.deleteMany).toHaveBeenCalled();
      expect(result).toEqual({ deletedCount });
    });

    it("should throw an error if no assessment data to delete", async () => {
      (AssessmentMarkModel.deleteMany as jest.Mock).mockResolvedValue({ deletedCount: 0 });

      await expect(assessmentRepo.deleteAllAssessmentData()).rejects.toThrow(
        `No assessment data to delete`
      );
    });
  });
});
})
