"use strict";
// src/tests/projectReviewRepository.test.ts
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
const projectReviewRepository_1 = __importDefault(require("../../repositories/marks/projectReviewRepository"));
const projectReviewMarkValidation_1 = require("../../repositories/validation/projectReviewMarkValidation");
const mongoose_1 = __importDefault(require("mongoose"));
jest.mock("../../models/marksModel"); // Mock the ProjectReviewMarkModel
jest.mock("../../repositories/validation/projectReviewMarkValidation"); // Mock validation functions
describe("ProjectReviewRepository", () => {
    let projectReviewRepo;
    const student_id = new mongoose_1.default.Types.ObjectId("2317505c94677a67f23e5a6d");
    const studentId = "12345";
    const sampleProjectReviewId = new mongoose_1.default.Types.ObjectId("4717509c94674a67f23e5a6d");
    beforeEach(() => {
        projectReviewRepo = new projectReviewRepository_1.default();
    });
    afterEach(() => {
        jest.clearAllMocks(); // Clear mocks after each test
    });
    describe("createProjectReviewMark", () => {
        it("should create a new project review mark", () => __awaiter(void 0, void 0, void 0, function* () {
            const projectReviewData = {
                _id: sampleProjectReviewId,
                student: {
                    _id: new mongoose_1.default.Types.ObjectId("7717505c94674a67f23e5a6d"),
                    name: "John Doe",
                    studentId: studentId,
                },
                marks: 85,
                feedback: "Great job!",
                project_title: "Creditons secure system",
                date: new Date("2024-10-23"),
            };
            projectReviewMarkValidation_1.validateProjectReviewData.mockResolvedValue(projectReviewData);
            projectReviewMarkValidation_1.checkExistingProjectReviewData.mockResolvedValue(null);
            marksModel_1.ProjectReviewMarkModel.create.mockResolvedValue(projectReviewData);
            const result = yield projectReviewRepo.createProjectReviewMark(projectReviewData);
            expect(projectReviewMarkValidation_1.validateProjectReviewData).toHaveBeenCalledWith(projectReviewData);
            expect(projectReviewMarkValidation_1.checkExistingProjectReviewData).toHaveBeenCalledWith(projectReviewData.student.studentId);
            expect(marksModel_1.ProjectReviewMarkModel.create).toHaveBeenCalledWith(projectReviewData);
            expect(result).toEqual(projectReviewData);
        }));
        it("should throw an error if project review mark already exists", () => __awaiter(void 0, void 0, void 0, function* () {
            const projectReviewData = {
                _id: sampleProjectReviewId,
                student: {
                    _id: student_id,
                    name: "John Doe",
                    studentId: studentId,
                },
                marks: 85,
                feedback: "Great job!",
                project_title: "Creditons secure system",
                date: new Date("2024-10-23"),
            };
            projectReviewMarkValidation_1.validateProjectReviewData.mockResolvedValue(projectReviewData);
            projectReviewMarkValidation_1.checkExistingProjectReviewData.mockResolvedValue(true);
            yield expect(projectReviewRepo.createProjectReviewMark(projectReviewData)).rejects.toThrow(`Project review mark already exists for student with ID ${projectReviewData.student.studentId}`);
        }));
    });
    describe("getAllProjectReviewMarks", () => {
        it("should return all project review marks", () => __awaiter(void 0, void 0, void 0, function* () {
            const projectReviewMarks = [
                {
                    _id: sampleProjectReviewId,
                    student: {
                        _id: student_id,
                        name: "John Doe",
                        studentId: studentId,
                    },
                    marks: 85,
                    feedback: "Great job!",
                    project_title: "Crediton secure system",
                    date: new Date("2024-10-23"),
                },
            ];
            marksModel_1.ProjectReviewMarkModel.find.mockResolvedValue(projectReviewMarks);
            const result = yield projectReviewRepo.getAllProjectReviewData();
            expect(marksModel_1.ProjectReviewMarkModel.find).toHaveBeenCalled();
            expect(result).toEqual(projectReviewMarks);
        }));
        it("should throw an error if no project review marks are found", () => __awaiter(void 0, void 0, void 0, function* () {
            marksModel_1.ProjectReviewMarkModel.find.mockResolvedValue([]);
            yield expect(projectReviewRepo.getAllProjectReviewData()).rejects.toThrow("No project review marks found");
        }));
    });
    describe("getProjectReviewMarkByStudentId", () => {
        it("should return a project review mark by student ID", () => __awaiter(void 0, void 0, void 0, function* () {
            const projectReviewMark = {
                _id: sampleProjectReviewId,
                student: {
                    _id: student_id,
                    name: "John Doe",
                    studentId: studentId,
                },
                marks: 85,
                feedback: "Great job!",
                project_title: "Crediton secure system",
                date: new Date("2024-10-23"),
            };
            marksModel_1.ProjectReviewMarkModel.findOne.mockResolvedValue(projectReviewMark);
            const result = yield projectReviewRepo.getProjectReviewMarkByStudentId(studentId);
            expect(marksModel_1.ProjectReviewMarkModel.findOne).toHaveBeenCalledWith({
                studentId,
            });
            expect(result).toEqual(projectReviewMark);
        }));
        it("should throw an error if project review mark does not exist", () => __awaiter(void 0, void 0, void 0, function* () {
            marksModel_1.ProjectReviewMarkModel.findOne.mockResolvedValue(null);
            yield expect(projectReviewRepo.getProjectReviewMarkByStudentId(studentId)).rejects.toThrow(`Project review marks for student with  ID: ${studentId} does not exist.`);
        }));
    });
    describe("updateProjectReviewDataByStudentId", () => {
        it("should update project review data for a given student ID", () => __awaiter(void 0, void 0, void 0, function* () {
            const updatedData = {
                _id: sampleProjectReviewId,
                student: {
                    _id: student_id,
                    name: "John Doe",
                    studentId: studentId,
                },
                marks: 90,
                project_title: "Creditons secure system",
                feedback: "Improved performance.",
                date: new Date("2024-10-24"),
            };
            marksModel_1.ProjectReviewMarkModel.findOneAndUpdate.mockResolvedValue(updatedData);
            const result = yield projectReviewRepo.updateProjectReviewDataByStudentId(studentId, updatedData);
            expect(marksModel_1.ProjectReviewMarkModel.findOneAndUpdate).toHaveBeenCalledWith({ studentId: "12345" }, expect.any(Object), { new: true });
            expect(result).toEqual(updatedData);
        }));
        it("should throw an error if updating project review data fails", () => __awaiter(void 0, void 0, void 0, function* () {
            marksModel_1.ProjectReviewMarkModel.findOneAndUpdate.mockResolvedValue(null);
            yield expect(projectReviewRepo.updateProjectReviewDataByStudentId(studentId, { marks: 25 })).rejects.toThrow(`Project review data not updated for student with id: ${studentId}`);
        }));
    });
    describe("deleteProjectReviewData", () => {
        it("should delete a project review mark by student ID", () => __awaiter(void 0, void 0, void 0, function* () {
            const deletedData = {
                _id: sampleProjectReviewId,
                student: {
                    _id: student_id,
                    name: "John Doe",
                    studentId: studentId,
                },
                marks: 85,
                feedback: "Great job!",
                project_title: "Crediton secure system",
                date: new Date("2024-10-23"),
            };
            marksModel_1.ProjectReviewMarkModel.findOneAndDelete.mockResolvedValue(deletedData);
            const result = yield projectReviewRepo.deleteProjectReviewData(studentId);
            expect(marksModel_1.ProjectReviewMarkModel.findOneAndDelete).toHaveBeenCalledWith({
                studentId,
            });
            expect(result).toEqual(deletedData);
        }));
        it("should throw an error if deleting a project review mark fails", () => __awaiter(void 0, void 0, void 0, function* () {
            marksModel_1.ProjectReviewMarkModel.findOneAndDelete.mockResolvedValue(null);
            yield expect(projectReviewRepo.deleteProjectReviewData(studentId)).rejects.toThrow(`Problem occurred while deleting project review data for student with ID: ${studentId}`);
        }));
    });
});
