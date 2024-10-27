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
const linkedinRepository_1 = __importDefault(require("../../repositories/marks/linkedinRepository"));
const linkedinPostMarksService_1 = __importDefault(require("../../services/linkedinPostMarksService"));
const mongoose_1 = __importDefault(require("mongoose"));
jest.mock('../../repositories/marks/linkedinRepository');
describe('LinkedinService', () => {
    let linkedinPostService;
    let linkedinRepositoryMock;
    const student_id = new mongoose_1.default.Types.ObjectId('507f1f77bcf86cd799439011');
    const sampleId = new mongoose_1.default.Types.ObjectId('4917109c84674a67f23e5a6d');
    beforeEach(() => {
        linkedinRepositoryMock = new linkedinRepository_1.default();
        linkedinPostService = new linkedinPostMarksService_1.default();
        linkedinPostService['linkedinRepository'] = linkedinRepositoryMock;
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    const mockLinkedInPostData = {
        student: {
            _id: student_id,
            name: "John Doe",
            studentId: "245",
        },
        date: new Date("2024-10-23"),
        marks: 25,
        postLink: 'https://www.linkedin.com/posts/sample-post-id',
        _id: sampleId
    };
    describe('createLinkedInPostData', () => {
        it('should create new LinkedIn post data', () => __awaiter(void 0, void 0, void 0, function* () {
            linkedinRepositoryMock.createLinkedinData.mockResolvedValue(mockLinkedInPostData);
            const result = yield linkedinPostService.createLinkedinPostData(mockLinkedInPostData);
            expect(linkedinRepositoryMock.createLinkedinData).toHaveBeenCalledWith(mockLinkedInPostData);
            expect(result).toEqual(mockLinkedInPostData);
        }));
    });
    describe('getAllLinkedinPostData', () => {
        it('should return all LinkedIn post data', () => __awaiter(void 0, void 0, void 0, function* () {
            linkedinRepositoryMock.getAllLinkedInData.mockResolvedValue([mockLinkedInPostData]);
            const result = yield linkedinPostService.getAllLinkedinPostData();
            expect(linkedinRepositoryMock.getAllLinkedInData).toHaveBeenCalled();
            expect(result).toEqual([mockLinkedInPostData]);
        }));
        it('should return null if no LinkedIn post data is found', () => __awaiter(void 0, void 0, void 0, function* () {
            linkedinRepositoryMock.getAllLinkedInData.mockResolvedValue([]);
            const result = yield linkedinPostService.getAllLinkedinPostData();
            expect(linkedinRepositoryMock.getAllLinkedInData).toHaveBeenCalled();
            expect(result).toEqual([]); // Adjust to an empty array instead of null for consistency
        }));
    });
    describe('getLinkedinPostDataByStudentId', () => {
        it('should return LinkedIn post data if found', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockData = {
                student: {
                    _id: student_id,
                    name: "Jane Doe",
                    studentId: "123",
                },
                date: new Date(),
                marks: 90,
                postLink: 'https://www.linkedin.com/posts/example',
                _id: new mongoose_1.default.Types.ObjectId(),
            };
            linkedinRepositoryMock.getLinkedInData.mockResolvedValue(mockData);
            const result = yield linkedinPostService.getLinkedinPostDataByStudentId(student_id.toString());
            expect(linkedinRepositoryMock.getLinkedInData).toHaveBeenCalledWith(student_id.toString());
            expect(result).toEqual(mockData);
        }));
        it('should return null if no LinkedIn post data is found', () => __awaiter(void 0, void 0, void 0, function* () {
            linkedinRepositoryMock.getLinkedInData.mockResolvedValue(null);
            const result = yield linkedinPostService.getLinkedinPostDataByStudentId('non-existent-id');
            expect(linkedinRepositoryMock.getLinkedInData).toHaveBeenCalledWith('non-existent-id');
            expect(result).toBeNull();
        }));
    });
    describe('updateLinkedinPostData', () => {
        it('should update LinkedIn post data for the given student ID', () => __awaiter(void 0, void 0, void 0, function* () {
            const updates = { marks: 34 };
            const updatedMark = Object.assign(Object.assign({}, mockLinkedInPostData), updates);
            linkedinRepositoryMock.updateLinkedInData.mockResolvedValue(updatedMark);
            const result = yield linkedinPostService.updateLinkedinPostData(sampleId.toString(), updates);
            expect(linkedinRepositoryMock.updateLinkedInData).toHaveBeenCalledWith(sampleId.toString(), updates);
            expect(result).toEqual(updatedMark);
        }));
        it('should return null if the LinkedIn post data to update is not found', () => __awaiter(void 0, void 0, void 0, function* () {
            linkedinRepositoryMock.updateLinkedInData.mockResolvedValue(null);
            const result = yield linkedinPostService.updateLinkedinPostData('123', { marks: 36 });
            expect(result).toBeNull();
        }));
    });
    describe('deleteLinkedinPostData', () => {
        it('should delete LinkedIn post data for the given student ID', () => __awaiter(void 0, void 0, void 0, function* () {
            linkedinRepositoryMock.deleteLinkedInData.mockResolvedValue(mockLinkedInPostData);
            const result = yield linkedinPostService.deleteLinkedinPostData(sampleId.toString());
            expect(linkedinRepositoryMock.deleteLinkedInData).toHaveBeenCalledWith(sampleId.toString());
            expect(result).toEqual(mockLinkedInPostData);
        }));
        it('should return null if no LinkedIn post data is found for the given student ID', () => __awaiter(void 0, void 0, void 0, function* () {
            linkedinRepositoryMock.deleteLinkedInData.mockResolvedValue(null);
            const result = yield linkedinPostService.deleteLinkedinPostData('123');
            expect(result).toBeNull();
        }));
    });
    describe('deleteAllLinkedinPostData', () => {
        it('should delete all LinkedIn post data and return the count of deleted documents', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockDeletedCount = 5;
            linkedinRepositoryMock.deleteAllLinkedInData.mockResolvedValue({ deletedCount: mockDeletedCount });
            const result = yield linkedinPostService.deleteAllLinkedinPostData();
            expect(linkedinRepositoryMock.deleteAllLinkedInData).toHaveBeenCalled();
            expect(result).toEqual({ deletedCount: mockDeletedCount });
        }));
        it('should return a delete count of 0 if no documents were deleted', () => __awaiter(void 0, void 0, void 0, function* () {
            linkedinRepositoryMock.deleteAllLinkedInData.mockResolvedValue({ deletedCount: 0 });
            const result = yield linkedinPostService.deleteAllLinkedinPostData();
            expect(linkedinRepositoryMock.deleteAllLinkedInData).toHaveBeenCalled();
            expect(result).toEqual({ deletedCount: 0 });
        }));
        it('should throw an error if delete operation fails', () => __awaiter(void 0, void 0, void 0, function* () {
            linkedinRepositoryMock.deleteAllLinkedInData.mockRejectedValue(new Error('Delete operation failed'));
            yield expect(linkedinPostService.deleteAllLinkedinPostData()).rejects.toThrow('Delete operation failed');
            expect(linkedinRepositoryMock.deleteAllLinkedInData).toHaveBeenCalled();
        }));
    });
});
