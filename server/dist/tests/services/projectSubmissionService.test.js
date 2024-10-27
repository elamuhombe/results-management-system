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
const projectSubmissionMarksService_1 = __importDefault(require("../../services/projectSubmissionMarksService"));
const projectSubmissionRepository_1 = __importDefault(require("../../repositories/marks/projectSubmissionRepository"));
jest.mock('../../repositories/marks/projectSubmissionRepository'); // Mock the repository module
let projectSubmissionService;
let projectSubmissionRepositoryMock;
const student_id = new mongoose_1.default.Types.ObjectId('8817507c84674a77f23e5a6d');
const sampleId = new mongoose_1.default.Types.ObjectId('4817509c84674a67f23e5a6d');
const mockProjectSubmissionData = {
    student: {
        _id: student_id,
        name: "John Doe",
        studentId: "12345",
    },
    _id: sampleId,
    marks: 27,
    project_title: 'Library Management System',
    date: new Date("2024-11-23"),
};
beforeEach(() => {
    // Create a mock instance of the repository
    projectSubmissionRepositoryMock = new projectSubmissionRepository_1.default();
    // Define the methods to be mocked
    projectSubmissionRepositoryMock.createProjectSubmissionData = jest.fn();
    projectSubmissionRepositoryMock.getAllProjectSubmissionData = jest.fn();
    projectSubmissionRepositoryMock.getProjectSubmissionDataByStudentId = jest.fn();
    projectSubmissionRepositoryMock.updateProjectSubmissionData = jest.fn();
    projectSubmissionRepositoryMock.deleteProjectSubmissionDataByStudentId = jest.fn();
    // Instantiate the service and replace the internal repository with the mock
    projectSubmissionService = new projectSubmissionMarksService_1.default();
    projectSubmissionService['projectSubmissionRepository'] = projectSubmissionRepositoryMock;
});
afterEach(() => {
    jest.clearAllMocks();
});
describe('createProjectSubmissionData', () => {
    it('should create new project submission data', () => __awaiter(void 0, void 0, void 0, function* () {
        // Mock the resolved value for the method
        projectSubmissionRepositoryMock.createProjectSubmissionData.mockResolvedValue(mockProjectSubmissionData);
        const result = yield projectSubmissionService.createProjectSubmissionData(mockProjectSubmissionData);
        expect(projectSubmissionRepositoryMock.createProjectSubmissionData).toHaveBeenCalledWith(mockProjectSubmissionData);
        expect(result).toEqual(mockProjectSubmissionData);
    }));
    // Add more tests as needed...
});
describe('getAllProjectSubmissionData', () => {
    it('should return all project submission data', () => __awaiter(void 0, void 0, void 0, function* () {
        projectSubmissionRepositoryMock.getAllProjectSubmissionData.mockResolvedValue([mockProjectSubmissionData]);
        const result = yield projectSubmissionService.getAllProjectSubmissionData();
        expect(projectSubmissionRepositoryMock.getAllProjectSubmissionData).toHaveBeenCalled();
        expect(result).toEqual([mockProjectSubmissionData]);
    }));
    it('should return null if no project submission data are found', () => __awaiter(void 0, void 0, void 0, function* () {
        projectSubmissionRepositoryMock.getAllProjectSubmissionData.mockResolvedValue(null);
        const result = yield projectSubmissionService.getAllProjectSubmissionData();
        expect(result).toBeNull();
    }));
});
describe('getProjectSubmissionDataByStudentId', () => {
    it('should return the project submission data for a given student ID', () => __awaiter(void 0, void 0, void 0, function* () {
        projectSubmissionRepositoryMock.getProjectSubmissionDataByStudentId.mockResolvedValue(mockProjectSubmissionData);
        const result = yield projectSubmissionService.getProjectSubmissionDataByStudentId('123');
        expect(projectSubmissionRepositoryMock.getProjectSubmissionDataByStudentId).toHaveBeenCalledWith('123');
        expect(result).toEqual(mockProjectSubmissionData);
    }));
    it('should return null if no project submission data is found for the given student ID', () => __awaiter(void 0, void 0, void 0, function* () {
        projectSubmissionRepositoryMock.getProjectSubmissionDataByStudentId.mockResolvedValue(null);
        const result = yield projectSubmissionService.getProjectSubmissionDataByStudentId('123');
        expect(result).toBeNull();
    }));
});
describe('updateProjectSubmissionData', () => {
    it('should update project submission data for the given student ID', () => __awaiter(void 0, void 0, void 0, function* () {
        const updates = { marks: 28 };
        const updatedMark = Object.assign(Object.assign({}, mockProjectSubmissionData), updates);
        projectSubmissionRepositoryMock.updateProjectSubmissionData.mockResolvedValue(updatedMark);
        const result = yield projectSubmissionService.updateProjectSubmissionData('123', updates);
        expect(projectSubmissionRepositoryMock.updateProjectSubmissionData).toHaveBeenCalledWith('123', updates);
        expect(result).toEqual(updatedMark);
    }));
    it('should return null if the project submission data to update is not found', () => __awaiter(void 0, void 0, void 0, function* () {
        projectSubmissionRepositoryMock.updateProjectSubmissionData.mockResolvedValue(null);
        const result = yield projectSubmissionService.updateProjectSubmissionData('123', { marks: 24 });
        expect(result).toBeNull();
    }));
});
describe('deleteProjectSubmissionData', () => {
    it('should delete project submission data for the given student ID', () => __awaiter(void 0, void 0, void 0, function* () {
        projectSubmissionRepositoryMock.deleteProjectSubmissionDataByStudentId.mockResolvedValue(mockProjectSubmissionData);
        const result = yield projectSubmissionService.deleteProjectSubmissionDataByStudentId('123');
        expect(projectSubmissionRepositoryMock.deleteProjectSubmissionDataByStudentId).toHaveBeenCalledWith('123');
        expect(result).toEqual(mockProjectSubmissionData);
    }));
    it('should return null if no project submission data is found for the given student ID', () => __awaiter(void 0, void 0, void 0, function* () {
        projectSubmissionRepositoryMock.deleteProjectSubmissionDataByStudentId.mockResolvedValue(null);
        const result = yield projectSubmissionService.deleteProjectSubmissionDataByStudentId('123');
        expect(result).toBeNull();
    }));
});
