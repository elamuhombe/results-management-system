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
const mongoose_1 = __importDefault(require("mongoose"));
const projectReviewMarksService_1 = __importDefault(require("../../services/projectReviewMarksService"));
const projectReviewRepository_1 = __importDefault(require("../../repositories/marks/projectReviewRepository"));
jest.mock("../../repositories/marks/projectReviewRepository"); // Mock the repository module
let projectReviewService;
let projectReviewRepositoryMock;
const student_id = new mongoose_1.default.Types.ObjectId("8817507c84674a77f23e5a6d");
const sampleId = new mongoose_1.default.Types.ObjectId("4817509c84674a67f23e5a6d");
const mockProjectReviewData = {
    student: {
        _id: student_id,
        name: "John Doe",
        studentId: "12345",
    },
    _id: sampleId,
    marks: 27,
    project_title: "Credon security system",
    feedback: "Consider adding indexing to your database to speed up query times",
    date: new Date("2024-11-23"),
};
beforeEach(() => {
    // Create a mock instance of the repository
    projectReviewRepositoryMock =
        new projectReviewRepository_1.default();
    // Define the methods to be mocked
    projectReviewRepositoryMock.createProjectReviewMark = jest.fn();
    projectReviewRepositoryMock.getAllProjectReviewData = jest.fn();
    projectReviewRepositoryMock.getProjectReviewMarkByStudentId = jest.fn();
    projectReviewRepositoryMock.updateProjectReviewDataByStudentId = jest.fn();
    projectReviewRepositoryMock.deleteProjectReviewData = jest.fn();
    // Instantiate the service and replace the internal repository with the mock
    projectReviewService = new projectReviewMarksService_1.default();
    projectReviewService["projectReviewRepository"] = projectReviewRepositoryMock;
});
afterEach(() => {
    jest.clearAllMocks();
});
describe("createProjectReviewData", () => {
    it("should create new project review data", () => __awaiter(void 0, void 0, void 0, function* () {
        // Mock the resolved value for the method
        projectReviewRepositoryMock.createProjectReviewMark.mockResolvedValue(mockProjectReviewData);
        const result = yield projectReviewService.createProjectReviewData(mockProjectReviewData);
        expect(projectReviewRepositoryMock.createProjectReviewMark).toHaveBeenCalledWith(mockProjectReviewData);
        expect(result).toEqual(mockProjectReviewData);
    }));
    // Add more tests as needed...
});
describe("getAllProjectReviewData", () => {
    it("should return all project review data", () => __awaiter(void 0, void 0, void 0, function* () {
        projectReviewRepositoryMock.getAllProjectReviewData.mockResolvedValue([
            mockProjectReviewData,
        ]);
        const result = yield projectReviewService.getAllProjectReviewData();
        expect(projectReviewRepositoryMock.getAllProjectReviewData).toHaveBeenCalled();
        expect(result).toEqual([mockProjectReviewData]);
    }));
    it("should return null if no project review data are found", () => __awaiter(void 0, void 0, void 0, function* () {
        projectReviewRepositoryMock.getAllProjectReviewData.mockResolvedValue(null);
        const result = yield projectReviewService.getAllProjectReviewData();
        expect(result).toBeNull();
    }));
});
describe("getProjectReviewDataByStudentId", () => {
    it("should return the project revioew data for a given student ID", () => __awaiter(void 0, void 0, void 0, function* () {
        projectReviewRepositoryMock.getProjectReviewMarkByStudentId.mockResolvedValue(mockProjectReviewData);
        const result = yield projectReviewService.getProjectReviewDataByStudentId("123");
        expect(projectReviewRepositoryMock.getProjectReviewMarkByStudentId).toHaveBeenCalledWith("123");
        expect(result).toEqual(mockProjectReviewData);
    }));
    it("should return null if no project review data is found for the given student ID", () => __awaiter(void 0, void 0, void 0, function* () {
        projectReviewRepositoryMock.getProjectReviewMarkByStudentId.mockResolvedValue(null);
        const result = yield projectReviewService.getProjectReviewDataByStudentId("123");
        expect(result).toBeNull();
    }));
});
describe("updateProjectReviewData", () => {
    it("should update project review data for the given student ID", () => __awaiter(void 0, void 0, void 0, function* () {
        const updates = { marks: 28 };
        const updatedMark = Object.assign(Object.assign({}, mockProjectReviewData), updates);
        projectReviewRepositoryMock.updateProjectReviewDataByStudentId.mockResolvedValue(updatedMark);
        const result = yield projectReviewService.updateProjectReviewData("123", updates);
        expect(projectReviewRepositoryMock.updateProjectReviewDataByStudentId).toHaveBeenCalledWith("123", updates);
        expect(result).toEqual(updatedMark);
    }));
    it("should return null if the project review data to update is not found", () => __awaiter(void 0, void 0, void 0, function* () {
        projectReviewRepositoryMock.updateProjectReviewDataByStudentId.mockResolvedValue(null);
        const result = yield projectReviewService.updateProjectReviewData("123", {
            marks: 24,
        });
        expect(result).toBeNull();
    }));
});
describe("deleteProjectReviewDataByStudentId", () => {
    it("should delete project submission data for the given student ID", () => __awaiter(void 0, void 0, void 0, function* () {
        projectReviewRepositoryMock.deleteProjectReviewData.mockResolvedValue(mockProjectReviewData);
        const result = yield projectReviewService.deleteProjectReviewDataByStudentId("123");
        expect(projectReviewRepositoryMock.deleteProjectReviewData).toHaveBeenCalledWith("123");
        expect(result).toEqual(mockProjectReviewData);
    }));
    it("should return null if no project review data is found for the given student ID", () => __awaiter(void 0, void 0, void 0, function* () {
        projectReviewRepositoryMock.deleteProjectReviewData.mockResolvedValue(null);
        const result = yield projectReviewService.deleteProjectReviewDataByStudentId("123");
        expect(result).toBeNull();
    }));
});
