// src/tests/utils/calculateTotalMarks.test.ts

import {
    AttendanceMarkModel,
    ProjectReviewMarkModel,
    LinkedInPostMarkModel,
    ProjectSubmissionMarkModel,
    AssessmentMarkModel,
  } from "../models/marksModel";
  import { calculateTotalMarks } from "../utils/calculateTotalMarks";
  
  // Mocking the models used in the utility function
  jest.mock("../models/marksModel");
  
  // Define the type for the marks
  interface Mark {
    marks: number;
  }
  
  describe("calculateTotalMarks", () => {
    const studentId = "123";
  
    beforeEach(() => {
      jest.clearAllMocks();
    });
  
    // Helper function to mock mark data
    const mockMarkData = (
      attendance: Mark[] = [],
      assessment: Mark[] = [],
      projectReview: Mark[] = [],
      projectSubmission: Mark[] = [],
      linkedinPost: Mark[] = []
    ) => {
      (AttendanceMarkModel.find as jest.Mock).mockResolvedValue(attendance);
      (AssessmentMarkModel.find as jest.Mock).mockResolvedValue(assessment);
      (ProjectReviewMarkModel.find as jest.Mock).mockResolvedValue(projectReview);
      (ProjectSubmissionMarkModel.find as jest.Mock).mockResolvedValue(projectSubmission);
      (LinkedInPostMarkModel.find as jest.Mock).mockResolvedValue(linkedinPost);
    };
  
    it("calculates the total marks correctly based on all mark types", async () => {
      const mockAttendanceMarks: Mark[] = [{ marks: 50 }];
      const mockAssessmentMarks: Mark[] = [{ marks: 50 }];
      const mockProjectReviewMarks: Mark[] = [{ marks: 50 }];
      const mockProjectSubmissionMarks: Mark[] = [{ marks: 50 }];
      const mockLinkedInPostMarks: Mark[] = [{ marks: 50 }];
  
      // Mocking mark data
      mockMarkData(
        mockAttendanceMarks,
        mockAssessmentMarks,
        mockProjectReviewMarks,
        mockProjectSubmissionMarks,
        mockLinkedInPostMarks
      );
  
      // Expected total calculation
      const expectedTotal =
        mockAttendanceMarks.reduce((sum, mark) => sum + mark.marks, 0) +
        mockAssessmentMarks.reduce((sum, mark) => sum + mark.marks, 0) +
        mockProjectReviewMarks.reduce((sum, mark) => sum + mark.marks, 0) +
        mockProjectSubmissionMarks.reduce((sum, mark) => sum + mark.marks, 0) +
        mockLinkedInPostMarks.reduce((sum, mark) => sum + mark.marks, 0);
  
      const result = await calculateTotalMarks(studentId);
     
  
      expect(result).toBe(expectedTotal);
      expect(AttendanceMarkModel.find).toHaveBeenCalledWith({ student: studentId });
      expect(AssessmentMarkModel.find).toHaveBeenCalledWith({ student: studentId });
      expect(ProjectReviewMarkModel.find).toHaveBeenCalledWith({ student: studentId });
      expect(ProjectSubmissionMarkModel.find).toHaveBeenCalledWith({ student: studentId });
      expect(LinkedInPostMarkModel.find).toHaveBeenCalledWith({ student: studentId });
    });
  
    it("returns 0 if all mark entries are empty", async () => {
      mockMarkData([], [], [], [], []);
  
      const result = await calculateTotalMarks(studentId);
  
      expect(result).toBe(0);
    });
  
    // src/tests/calculateMarks.test.ts
it("throws an error if fetching attendance marks fails", async () => {
    // Mock the rejection
    (AttendanceMarkModel.find as jest.Mock).mockRejectedValue(new Error("Database error"));
  
    // Expect the function to throw the specific error message
    await expect(calculateTotalMarks(studentId)).rejects.toThrow("Error calculating total marks: Database error");
  });
  
  
    it("throws an error if fetching project review marks fails", async () => {
      (ProjectReviewMarkModel.find as jest.Mock).mockRejectedValue(new Error("Database error"));
  
      await expect(calculateTotalMarks(studentId)).rejects.toThrow("Error calculating total marks: Database error");
    });

    it("throws an error if fetching project submission marks fails", async () => {
        (ProjectSubmissionMarkModel.find as jest.Mock).mockRejectedValue(new Error("Database error"));
    
        await expect(calculateTotalMarks(studentId)).rejects.toThrow("Error calculating total marks: Database error");
      });

      it("throws an error if fetching linkedin post marks fails", async () => {
        (LinkedInPostMarkModel.find as jest.Mock).mockRejectedValue(new Error("Database error"));
    
        await expect(calculateTotalMarks(studentId)).rejects.toThrow("Error calculating total marks: Database error");
      });

      it("throws an error if fetching assessment marks fails", async () => {
        (AssessmentMarkModel.find as jest.Mock).mockRejectedValue(new Error("Database error"));
    
        await expect(calculateTotalMarks(studentId)).rejects.toThrow("Error calculating total marks: Database error");
      });
  
   
  });
  