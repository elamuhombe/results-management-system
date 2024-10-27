// src/tests/linkedinRepository.test.ts
import LinkedInRepository from "../../repositories/marks/linkedinRepository";
import { LinkedInPostMarkModel } from "../../models/marksModel";
import {
  checkExistingLinkedInData,
  validateLinkedInPostData,
} from "../../repositories/validation/linkedinValidationRepository";
import { ILinkedInPostMark } from "../../types/types";
import mongoose from "mongoose";

// Mock the dependencies
jest.mock("../../models/marksModel");
jest.mock("../../repositories/validation/linkedinValidationRepository");

describe("LinkedInRepository", () => {
  let linkedinRepository: LinkedInRepository;
  const mockedId = new mongoose.Types.ObjectId("8717505c94674a67f23e5a6d");
  const student_Id = new mongoose.Types.ObjectId("9717565c94674a67f23e5a6d");

  beforeEach(() => {
    linkedinRepository = new LinkedInRepository();
    jest.clearAllMocks(); // Clear mocks between tests
  });

  describe("createLinkedinData", () => {
    it("should create and return new LinkedIn data if no existing data is found", async () => {
      const mockData: ILinkedInPostMark = {
        _id: mockedId,
        postLink: "https://linkedin.com/post",
        marks: 24,
        date: new Date("2024-09-24"),
        student: {
          _id: student_Id,
          studentId: "12345",
          name: "John Doe",
        },
      };

      (validateLinkedInPostData as jest.Mock).mockResolvedValue(mockData);
      (checkExistingLinkedInData as jest.Mock).mockResolvedValue(null);
      (LinkedInPostMarkModel.create as jest.Mock).mockResolvedValue(mockData);

      const result = await linkedinRepository.createLinkedinData(mockData);

      expect(validateLinkedInPostData).toHaveBeenCalledWith(mockData);
      expect(checkExistingLinkedInData).toHaveBeenCalledWith(mockData.student.studentId);
      expect(LinkedInPostMarkModel.create).toHaveBeenCalledWith(mockData);
      expect(result).toEqual(mockData);
    });

    it("should throw an error if LinkedIn data already exists", async () => {
      const mockData: ILinkedInPostMark = {
        _id: mockedId,
        postLink: "https://linkedin.com/post",
        marks: 24,
        date: new Date("2024-09-24"),
        student: {
          _id: student_Id,
          studentId: "12345",
          name: "John Doe",
        }
       
      };

      (validateLinkedInPostData as jest.Mock).mockResolvedValue(mockData);
      (checkExistingLinkedInData as jest.Mock).mockResolvedValue(mockData);

      await expect(linkedinRepository.createLinkedinData(mockData)).rejects.toThrow(
        `linkedin post marks already exist for student with id: ${mockData.student.studentId}`
      );
    });
  });

  describe("getLinkedInData", () => {
    it("should return LinkedIn data for a given studentId", async () => {
      const mockData = { studentId: "12345", postLink: "https://linkedin.com/post" };
      (LinkedInPostMarkModel.findOne as jest.Mock).mockResolvedValue(mockData);

      const result = await linkedinRepository.getLinkedInData("12345");

      expect(LinkedInPostMarkModel.findOne).toHaveBeenCalledWith({ studentId: "12345" });
      expect(result).toEqual(mockData);
    });

    it("should throw an error if no LinkedIn data is found", async () => {
      (LinkedInPostMarkModel.findOne as jest.Mock).mockResolvedValue(null);

      await expect(linkedinRepository.getLinkedInData("12345")).rejects.toThrow(
        `Error occurred in fetching linkedin post marks for student with id: 12345`
      );
    });
  });

  describe("getAllLinkedInData", () => {
    it("should return all LinkedIn data", async () => {
      const mockData = [{ studentId: "12345", postLink: "https://linkedin.com/post" }];
      (LinkedInPostMarkModel.find as jest.Mock).mockResolvedValue(mockData);

      const result = await linkedinRepository.getAllLinkedInData();

      expect(LinkedInPostMarkModel.find).toHaveBeenCalled();
      expect(result).toEqual(mockData);
    });

    it("should throw an error if no LinkedIn data is found", async () => {
      (LinkedInPostMarkModel.find as jest.Mock).mockResolvedValue([]);

      await expect(linkedinRepository.getAllLinkedInData()).rejects.toThrow("No LinkedIn data found");
    });
  });

  describe("updateLinkedInData", () => {
    it("should update LinkedIn data for a given studentId", async () => {
      // Mock the function to simulate a successful update
      (LinkedInPostMarkModel.findOneAndUpdate as jest.Mock).mockResolvedValue({ marks: 34 });
    
      const result = await linkedinRepository.updateLinkedInData("12345", {marks: 37 });
    
      expect(LinkedInPostMarkModel.findOneAndUpdate).toHaveBeenCalledWith(
        { studentId: "12345" },
        { marks: 37}, // Ensure this matches what you're passing
        { new: true }
      );
    });
    
    it("should throw an error if LinkedIn data is not found for updating", async () => {
      (LinkedInPostMarkModel.findOneAndUpdate as jest.Mock).mockResolvedValue(null);

      await expect(linkedinRepository.updateLinkedInData("12345", {marks:21})).rejects.toThrow(
        `Error occurred in updating linkedin data for student with id 12345`
      );
    });
  });

  describe('deleteLinkedInData', () => {
    it('should delete and return assessment data for a valid student ID', async () => {
      const studentId = "12345";
      const mockDeletedData = { marks: 90, studentId };

      // Mock the function to return the expected result
      LinkedInPostMarkModel.findOneAndDelete = jest.fn().mockResolvedValue(mockDeletedData);

      // Correctly call the function with the studentId argument
      const result = await linkedinRepository.deleteLinkedInData(studentId); // Call the function here

      // Assert the result and check that the function was called correctly
      expect(result).toEqual(mockDeletedData);
      expect(LinkedInPostMarkModel.findOneAndDelete).toHaveBeenCalledWith({ studentId });
    });
  });
});



