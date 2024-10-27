"use strict";
// src/tests/utils/calculateTotalMarks.test.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const marksModel_1 = require("../models/marksModel");
const calculateTotalMarks_1 = require("../utils/calculateTotalMarks");
// Mocking the models used in the utility function
jest.mock("../models/marksModel");
describe("calculateTotalMarks", () => {
    const studentId = "123";
    beforeEach(() => {
        jest.clearAllMocks();
    });
    // Helper function to mock mark data
    const mockMarkData = (attendance = [], assessment = [], projectReview = [], projectSubmission = [], linkedinPost = []) => {
        marksModel_1.AttendanceMarkModel.find.mockResolvedValue(attendance);
        marksModel_1.AssessmentMarkModel.find.mockResolvedValue(assessment);
        marksModel_1.ProjectReviewMarkModel.find.mockResolvedValue(projectReview);
        marksModel_1.ProjectSubmissionMarkModel.find.mockResolvedValue(projectSubmission);
        marksModel_1.LinkedInPostMarkModel.find.mockResolvedValue(linkedinPost);
    };
    it("calculates the total marks correctly based on all mark types", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockAttendanceMarks = [{ marks: 50 }];
        const mockAssessmentMarks = [{ marks: 50 }];
        const mockProjectReviewMarks = [{ marks: 50 }];
        const mockProjectSubmissionMarks = [{ marks: 50 }];
        const mockLinkedInPostMarks = [{ marks: 50 }];
        // Mocking mark data
        mockMarkData(mockAttendanceMarks, mockAssessmentMarks, mockProjectReviewMarks, mockProjectSubmissionMarks, mockLinkedInPostMarks);
        // Expected total calculation
        const expectedTotal = mockAttendanceMarks.reduce((sum, mark) => sum + mark.marks, 0) +
            mockAssessmentMarks.reduce((sum, mark) => sum + mark.marks, 0) +
            mockProjectReviewMarks.reduce((sum, mark) => sum + mark.marks, 0) +
            mockProjectSubmissionMarks.reduce((sum, mark) => sum + mark.marks, 0) +
            mockLinkedInPostMarks.reduce((sum, mark) => sum + mark.marks, 0);
        const result = yield (0, calculateTotalMarks_1.calculateTotalMarks)(studentId);
        expect(result).toBe(expectedTotal);
        expect(marksModel_1.AttendanceMarkModel.find).toHaveBeenCalledWith({ student: studentId });
        expect(marksModel_1.AssessmentMarkModel.find).toHaveBeenCalledWith({ student: studentId });
        expect(marksModel_1.ProjectReviewMarkModel.find).toHaveBeenCalledWith({ student: studentId });
        expect(marksModel_1.ProjectSubmissionMarkModel.find).toHaveBeenCalledWith({ student: studentId });
        expect(marksModel_1.LinkedInPostMarkModel.find).toHaveBeenCalledWith({ student: studentId });
    }));
    it("returns 0 if all mark entries are empty", () => __awaiter(void 0, void 0, void 0, function* () {
        mockMarkData([], [], [], [], []);
        const result = yield (0, calculateTotalMarks_1.calculateTotalMarks)(studentId);
        expect(result).toBe(0);
    }));
    // src/tests/calculateMarks.test.ts
    it("throws an error if fetching attendance marks fails", () => __awaiter(void 0, void 0, void 0, function* () {
        // Mock the rejection
        marksModel_1.AttendanceMarkModel.find.mockRejectedValue(new Error("Database error"));
        // Expect the function to throw the specific error message
        yield expect((0, calculateTotalMarks_1.calculateTotalMarks)(studentId)).rejects.toThrow("Error calculating total marks: Database error");
    }));
    it("throws an error if fetching project review marks fails", () => __awaiter(void 0, void 0, void 0, function* () {
        marksModel_1.ProjectReviewMarkModel.find.mockRejectedValue(new Error("Database error"));
        yield expect((0, calculateTotalMarks_1.calculateTotalMarks)(studentId)).rejects.toThrow("Error calculating total marks: Database error");
    }));
    it("throws an error if fetching project submission marks fails", () => __awaiter(void 0, void 0, void 0, function* () {
        marksModel_1.ProjectSubmissionMarkModel.find.mockRejectedValue(new Error("Database error"));
        yield expect((0, calculateTotalMarks_1.calculateTotalMarks)(studentId)).rejects.toThrow("Error calculating total marks: Database error");
    }));
    it("throws an error if fetching linkedin post marks fails", () => __awaiter(void 0, void 0, void 0, function* () {
        marksModel_1.LinkedInPostMarkModel.find.mockRejectedValue(new Error("Database error"));
        yield expect((0, calculateTotalMarks_1.calculateTotalMarks)(studentId)).rejects.toThrow("Error calculating total marks: Database error");
    }));
    it("throws an error if fetching assessment marks fails", () => __awaiter(void 0, void 0, void 0, function* () {
        marksModel_1.AssessmentMarkModel.find.mockRejectedValue(new Error("Database error"));
        yield expect((0, calculateTotalMarks_1.calculateTotalMarks)(studentId)).rejects.toThrow("Error calculating total marks: Database error");
    }));
});
