"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/tests/linkedinRepository.test.ts
const linkedinRepository_1 = __importDefault(require("../../repositories/marks/linkedinRepository"));
const marksModel_1 = require("../../models/marksModel");
const linkedinValidationRepository_1 = require("../../repositories/validation/linkedinValidationRepository");
const mongoose_1 = __importDefault(require("mongoose"));
// Mock the dependencies
jest.mock("../../models/marksModel");
jest.mock("../../repositories/validation/linkedinValidationRepository");
describe("LinkedInRepository", () => {
    let linkedinRepository;
    const mockedId = new mongoose_1.default.Types.ObjectId("8717505c94674a67f23e5a6d");
    const student_Id = new mongoose_1.default.Types.ObjectId("9717565c94674a67f23e5a6d");
    beforeEach(() => {
        linkedinRepository = new linkedinRepository_1.default();
        jest.clearAllMocks(); // Clear mocks between tests
    });
    describe("createLinkedinData", () => {
        it("should create and return new LinkedIn data if no existing data is found", () => __awaiter(void 0, void 0, void 0, function* () {
            const mockData = {
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
            linkedinValidationRepository_1.validateLinkedInPostData.mockResolvedValue(mockData);
            linkedinValidationRepository_1.checkExistingLinkedInData.mockResolvedValue(null);
            marksModel_1.LinkedInPostMarkModel.create.mockResolvedValue(mockData);
            const result = yield linkedinRepository.createLinkedinData(mockData);
            expect(linkedinValidationRepository_1.validateLinkedInPostData).toHaveBeenCalledWith(mockData);
            expect(linkedinValidationRepository_1.checkExistingLinkedInData).toHaveBeenCalledWith(mockData.student.studentId);
            expect(marksModel_1.LinkedInPostMarkModel.create).toHaveBeenCalledWith(mockData);
            expect(result).toEqual(mockData);
        }));
        it("should throw an error if LinkedIn data already exists", () => __awaiter(void 0, void 0, void 0, function* () {
            const mockData = {
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
            linkedinValidationRepository_1.validateLinkedInPostData.mockResolvedValue(mockData);
            linkedinValidationRepository_1.checkExistingLinkedInData.mockResolvedValue(mockData);
            yield expect(linkedinRepository.createLinkedinData(mockData)).rejects.toThrow(`linkedin post marks already exist for student with id: ${mockData.student.studentId}`);
        }));
    });
    describe("getLinkedInData", () => {
        it("should return LinkedIn data for a given studentId", () => __awaiter(void 0, void 0, void 0, function* () {
            const mockData = { studentId: "12345", postLink: "https://linkedin.com/post" };
            marksModel_1.LinkedInPostMarkModel.findOne.mockResolvedValue(mockData);
            const result = yield linkedinRepository.getLinkedInData("12345");
            expect(marksModel_1.LinkedInPostMarkModel.findOne).toHaveBeenCalledWith({ studentId: "12345" });
            expect(result).toEqual(mockData);
        }));
        it("should throw an error if no LinkedIn data is found", () => __awaiter(void 0, void 0, void 0, function* () {
            marksModel_1.LinkedInPostMarkModel.findOne.mockResolvedValue(null);
            yield expect(linkedinRepository.getLinkedInData("12345")).rejects.toThrow(`Error occurred in fetching linkedin post marks for student with id: 12345`);
        }));
    });
    describe("getAllLinkedInData", () => {
        it("should return all LinkedIn data", () => __awaiter(void 0, void 0, void 0, function* () {
            const mockData = [{ studentId: "12345", postLink: "https://linkedin.com/post" }];
            marksModel_1.LinkedInPostMarkModel.find.mockResolvedValue(mockData);
            const result = yield linkedinRepository.getAllLinkedInData();
            expect(marksModel_1.LinkedInPostMarkModel.find).toHaveBeenCalled();
            expect(result).toEqual(mockData);
        }));
        it("should throw an error if no LinkedIn data is found", () => __awaiter(void 0, void 0, void 0, function* () {
            marksModel_1.LinkedInPostMarkModel.find.mockResolvedValue([]);
            yield expect(linkedinRepository.getAllLinkedInData()).rejects.toThrow("No LinkedIn data found");
        }));
    });
    describe("updateLinkedInData", () => {
        it("should update LinkedIn data for a given studentId", () => __awaiter(void 0, void 0, void 0, function* () {
            // Mock the function to simulate a successful update
            marksModel_1.LinkedInPostMarkModel.findOneAndUpdate.mockResolvedValue({ marks: 34 });
            const result = yield linkedinRepository.updateLinkedInData("12345", { marks: 37 });
            expect(marksModel_1.LinkedInPostMarkModel.findOneAndUpdate).toHaveBeenCalledWith({ studentId: "12345" }, { marks: 37 }, // Ensure this matches what you're passing
            { new: true });
        }));
        it("should throw an error if LinkedIn data is not found for updating", () => __awaiter(void 0, void 0, void 0, function* () {
            marksModel_1.LinkedInPostMarkModel.findOneAndUpdate.mockResolvedValue(null);
            yield expect(linkedinRepository.updateLinkedInData("12345", { marks: 21 })).rejects.toThrow(`Error occurred in updating linkedin data for student with id 12345`);
        }));
    });
    describe('deleteLinkedInData', () => {
        it('should delete and return assessment data for a valid student ID', () => __awaiter(void 0, void 0, void 0, function* () {
            const studentId = "12345";
            const mockDeletedData = { marks: 90, studentId };
            // Mock the function to return the expected result
            marksModel_1.LinkedInPostMarkModel.findOneAndDelete = jest.fn().mockResolvedValue(mockDeletedData);
            // Correctly call the function with the studentId argument
            const result = yield linkedinRepository.deleteLinkedInData(studentId); // Call the function here
            // Assert the result and check that the function was called correctly
            expect(result).toEqual(mockDeletedData);
            expect(marksModel_1.LinkedInPostMarkModel.findOneAndDelete).toHaveBeenCalledWith({ studentId });
        }));
    });
});
