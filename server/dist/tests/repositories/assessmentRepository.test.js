"use strict";
// src/tests/assessmentRepository.test.ts
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
const marksModel_1 = require("../../models/marksModel");
const assessmentRepository_1 = __importDefault(require("../../repositories/marks/assessmentRepository"));
const assessmentValidationRepository_1 = require("../../repositories/validation/assessmentValidationRepository");
const mongoose_1 = __importDefault(require("mongoose"));
jest.mock("../../models/marksModel"); // Mock the AssessmentMarkModel
jest.mock("../../repositories/validation/assessmentValidationRepository"); // Mock validation functions
describe("AssessmentRepository", () => {
    let assessmentRepo;
    const student_id = new mongoose_1.default.Types.ObjectId('7717505c94674a67f23e5a6d');
    const sampleAssessmentId = new mongoose_1.default.Types.ObjectId('4717509c94674a67f23e5a6d');
    beforeEach(() => {
        assessmentRepo = new assessmentRepository_1.default();
    });
    afterEach(() => {
        jest.clearAllMocks(); // Clear mocks after each test
    });
    describe("createAssessmentData", () => {
        it("should create a new assessment mark", () => __awaiter(void 0, void 0, void 0, function* () {
            const assessmentData = {
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
            assessmentValidationRepository_1.validateAssessmentData.mockResolvedValue(assessmentData);
            assessmentValidationRepository_1.checkExistingAssessmentData.mockResolvedValue(null);
            marksModel_1.AssessmentMarkModel.create.mockResolvedValue(assessmentData);
            const result = yield assessmentRepo.createAssessmentData(assessmentData);
            expect(assessmentValidationRepository_1.validateAssessmentData).toHaveBeenCalledWith(assessmentData);
            expect(assessmentValidationRepository_1.checkExistingAssessmentData).toHaveBeenCalledWith(assessmentData.student.studentId);
            expect(marksModel_1.AssessmentMarkModel.create).toHaveBeenCalledWith(assessmentData);
            expect(result).toEqual(assessmentData);
        }));
        it("should throw an error if assessment mark already exists", () => __awaiter(void 0, void 0, void 0, function* () {
            const assessmentData = {
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
            assessmentValidationRepository_1.validateAssessmentData.mockResolvedValue(assessmentData);
            assessmentValidationRepository_1.checkExistingAssessmentData.mockResolvedValue(true);
            yield expect(assessmentRepo.createAssessmentData(assessmentData)).rejects.toThrow(`Assessment data for student with id: ${assessmentData.student.studentId} already exists`);
        }));
    });
    describe("updateAssessmentData", () => {
        it("should update assessment data for a given student ID", () => __awaiter(void 0, void 0, void 0, function* () {
            const updatedData = {
                student: {
                    _id: student_id,
                    name: "John Doe",
                    studentId: "12345",
                },
                date: "2024-11-23",
                marks: 26,
                _id: sampleAssessmentId
            };
            marksModel_1.AssessmentMarkModel.findOneAndUpdate.mockResolvedValue(updatedData);
            const result = yield assessmentRepo.updateAssessmentData("12345", { marks: 26 });
            expect(marksModel_1.AssessmentMarkModel.findOneAndUpdate).toHaveBeenCalledWith({ studentId: "12345" }, { marks: 26 }, { new: true });
            expect(result).toEqual(updatedData);
        }));
        it("should throw an error if updating attendance data fails", () => __awaiter(void 0, void 0, void 0, function* () {
            marksModel_1.AssessmentMarkModel.findOneAndUpdate.mockRejectedValue(new Error(`Error updating attendance data for student with id: 12345`));
            yield expect(assessmentRepo.updateAssessmentData("12345", { marks: 31 })).rejects.toThrow("Error updating attendance data for student with id: 12345");
        }));
        describe("getAssessmentDataByStudentId", () => {
            it("should return assessment data by student ID", () => __awaiter(void 0, void 0, void 0, function* () {
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
                marksModel_1.AssessmentMarkModel.findOne.mockResolvedValue(assessmentData);
                const result = yield assessmentRepo.getAssessmentDataByStudentId("12345");
                expect(marksModel_1.AssessmentMarkModel.findOne).toHaveBeenCalledWith({ studentId: "12345" });
                expect(result).toEqual(assessmentData);
            }));
            it("should throw an error if assessment data does not exist", () => __awaiter(void 0, void 0, void 0, function* () {
                marksModel_1.AssessmentMarkModel.findOne.mockResolvedValue(null);
                yield expect(assessmentRepo.getAssessmentDataByStudentId("12345")).rejects.toThrow(`Error occured in fetching assessment data for student with id 12345`);
            }));
        });
        describe("getAllAssessmentData", () => {
            it("should return all assessment data", () => __awaiter(void 0, void 0, void 0, function* () {
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
                marksModel_1.AssessmentMarkModel.find.mockResolvedValue(assessmentMarks);
                const result = yield assessmentRepo.getAllAssessmentData();
                expect(marksModel_1.AssessmentMarkModel.find).toHaveBeenCalled();
                expect(result).toEqual(assessmentMarks);
            }));
            it("should throw an error if no assessment data is found", () => __awaiter(void 0, void 0, void 0, function* () {
                marksModel_1.AssessmentMarkModel.find.mockResolvedValue([]);
                yield expect(assessmentRepo.getAllAssessmentData()).rejects.toThrow(`Error in fetching all assessment data`);
            }));
        });
        describe('deleteAssessmentDataByStudentId', () => {
            const studentId = '12345';
            const mockDeletedData = { studentId, marks: 90 }; // Mock data to represent deleted assessment mark
            it('should delete and return assessment data for a valid student ID', () => __awaiter(void 0, void 0, void 0, function* () {
                // Mocking findOneAndDelete to return mockDeletedData
                marksModel_1.AssessmentMarkModel.findOneAndDelete.mockResolvedValueOnce(mockDeletedData);
                const result = yield assessmentRepo.deleteAssessmentDataByStudentId(studentId);
                expect(result).toEqual(mockDeletedData);
                expect(marksModel_1.AssessmentMarkModel.findOneAndDelete).toHaveBeenCalledWith({ studentId });
            }));
            it('should return null and log a warning if no data is found for the student ID', () => __awaiter(void 0, void 0, void 0, function* () {
                // Mocking findOneAndDelete to return null
                marksModel_1.AssessmentMarkModel.findOneAndDelete.mockResolvedValueOnce(null);
                const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(); // Spy on console.warn
                const result = yield assessmentRepo.deleteAssessmentDataByStudentId(studentId);
                expect(result).toBeNull();
                expect(marksModel_1.AssessmentMarkModel.findOneAndDelete).toHaveBeenCalledWith({ studentId });
                expect(consoleWarnSpy).toHaveBeenCalledWith(`No assessment data found for student with ID ${studentId}`);
                consoleWarnSpy.mockRestore(); // Restore console.warn after the test
            }));
        });
        describe("deleteAllAssessmentData", () => {
            it("should delete all assessment data", () => __awaiter(void 0, void 0, void 0, function* () {
                const deletedCount = 5;
                marksModel_1.AssessmentMarkModel.deleteMany.mockResolvedValue({ deletedCount });
                const result = yield assessmentRepo.deleteAllAssessmentData();
                expect(marksModel_1.AssessmentMarkModel.deleteMany).toHaveBeenCalled();
                expect(result).toEqual({ deletedCount });
            }));
            it("should throw an error if no assessment data to delete", () => __awaiter(void 0, void 0, void 0, function* () {
                marksModel_1.AssessmentMarkModel.deleteMany.mockResolvedValue({ deletedCount: 0 });
                yield expect(assessmentRepo.deleteAllAssessmentData()).rejects.toThrow(`No assessment data to delete`);
            }));
        });
    });
});
