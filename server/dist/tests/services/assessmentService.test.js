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
const assessmentRepository_1 = __importDefault(require("../../repositories/marks/assessmentRepository"));
const assessmentMarksService_1 = __importDefault(require("../../services/assessmentMarksService"));
const mongoose_1 = __importDefault(require("mongoose"));
jest.mock('../../repositories/marks/assessmentRepository');
let assessmentMarkService;
let assessmentMarkRepositoryMock;
let student_id = new mongoose_1.default.Types.ObjectId('8817507c84674a77f23e5a6d');
let sampleId = new mongoose_1.default.Types.ObjectId('4817509c84674a67f23e5a6d');
beforeEach(() => {
    assessmentMarkRepositoryMock = new assessmentRepository_1.default();
    assessmentMarkService = new assessmentMarksService_1.default();
    // Replace the internal repository instance with the mock
    assessmentMarkService['assessmentRepository'] = assessmentMarkRepositoryMock;
});
afterEach(() => {
    jest.clearAllMocks();
});
const mockAssessmentMark = {
    student: {
        _id: student_id,
        name: "John Doe",
        studentId: "12345",
    },
    _id: sampleId,
    subject: 'Programming  Fundamentals',
    marks: 27,
    date: new Date("2024-11-23")
};
describe('createAssessmenteData', () => {
    it('should create a new assessment data', () => __awaiter(void 0, void 0, void 0, function* () {
        assessmentMarkRepositoryMock.createAssessmentData.mockResolvedValue(mockAssessmentMark);
        const result = yield assessmentMarkService.createAssessment(mockAssessmentMark);
        expect(assessmentMarkRepositoryMock.createAssessmentData).toHaveBeenCalledWith(mockAssessmentMark);
        expect(result).toEqual(mockAssessmentMark);
    }));
});
describe('getAllAssessmentData', () => {
    it('should return all assessment data', () => __awaiter(void 0, void 0, void 0, function* () {
        assessmentMarkRepositoryMock.getAllAssessmentData.mockResolvedValue([mockAssessmentMark]);
        const result = yield assessmentMarkService.getAllAssessments();
        expect(assessmentMarkRepositoryMock.getAllAssessmentData).toHaveBeenCalled();
        expect(result).toEqual([mockAssessmentMark]);
    }));
    it('should return null if no assessment data are found', () => __awaiter(void 0, void 0, void 0, function* () {
        assessmentMarkRepositoryMock.getAllAssessmentData.mockResolvedValue(null);
        const result = yield assessmentMarkService.getAllAssessments();
        expect(result).toBeNull();
    }));
});
describe('getAssessmentDataByStudentId', () => {
    it('should return the assessment data for a given student ID', () => __awaiter(void 0, void 0, void 0, function* () {
        assessmentMarkRepositoryMock.getAssessmentDataByStudentId.mockResolvedValue(mockAssessmentMark);
        const result = yield assessmentMarkService.getAssessmentByStudentId('123');
        expect(assessmentMarkRepositoryMock.getAssessmentDataByStudentId).toHaveBeenCalledWith('123');
        expect(result).toEqual(mockAssessmentMark);
    }));
    it('should return null if no attendance mark is found for the given student ID', () => __awaiter(void 0, void 0, void 0, function* () {
        assessmentMarkRepositoryMock.getAssessmentDataByStudentId.mockResolvedValue(null);
        const result = yield assessmentMarkService.getAssessmentByStudentId('123');
        expect(result).toBeNull();
    }));
});
describe('updateAssessmentData', () => {
    it('should update assessment data for the given student ID', () => __awaiter(void 0, void 0, void 0, function* () {
        const updates = { marks: 28 };
        const updatedMark = Object.assign(Object.assign({}, mockAssessmentMark), updates);
        assessmentMarkRepositoryMock.updateAssessmentData.mockResolvedValue(updatedMark);
        const result = yield assessmentMarkService.updateAssessment('123', updates);
        expect(assessmentMarkRepositoryMock.updateAssessmentData).toHaveBeenCalledWith('123', updates);
        expect(result).toEqual(updatedMark);
    }));
    it('should return null if the assessment data to update is not found', () => __awaiter(void 0, void 0, void 0, function* () {
        assessmentMarkRepositoryMock.updateAssessmentData.mockResolvedValue(null);
        const result = yield assessmentMarkService.updateAssessment('123', { marks: 24 });
        expect(result).toBeNull();
    }));
});
describe('deleteAssessmentData', () => {
    it('should delete an assessment data for the given student ID', () => __awaiter(void 0, void 0, void 0, function* () {
        assessmentMarkRepositoryMock.deleteAssessmentDataByStudentId.mockResolvedValue(mockAssessmentMark);
        const result = yield assessmentMarkService.deleteAssessmentData('123');
        expect(assessmentMarkRepositoryMock.deleteAssessmentDataByStudentId).toHaveBeenCalledWith('123');
        expect(result).toEqual(mockAssessmentMark);
    }));
    it('should return null if no assessment data is found for the given student ID', () => __awaiter(void 0, void 0, void 0, function* () {
        assessmentMarkRepositoryMock.deleteAssessmentDataByStudentId.mockResolvedValue(null);
        const result = yield assessmentMarkService.deleteAssessmentData('123');
        expect(result).toBeNull();
    }));
});
