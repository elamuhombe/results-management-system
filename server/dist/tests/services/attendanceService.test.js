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
const attendanceRepository_1 = __importDefault(require("../../repositories/marks/attendanceRepository"));
const attendanceMarksService_1 = __importDefault(require("../../services/attendanceMarksService"));
const mongoose_1 = __importDefault(require("mongoose"));
jest.mock('../../repositories/marks/attendanceRepository');
describe('AttendanceMarkService', () => {
    let attendanceMarkService;
    let attendanceMarkRepositoryMock;
    let student_id = new mongoose_1.default.Types.ObjectId('8817507c84674a77f23e5a6d');
    let sampleId = new mongoose_1.default.Types.ObjectId('4817509c84674a67f23e5a6d');
    beforeEach(() => {
        attendanceMarkRepositoryMock = new attendanceRepository_1.default();
        attendanceMarkService = new attendanceMarksService_1.default();
        // Replace the internal repository instance with the mock
        attendanceMarkService['attendanceMarkRepository'] = attendanceMarkRepositoryMock;
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    const mockAttendanceMark = {
        student: {
            _id: student_id,
            name: "John Doe",
            studentId: "12345",
        },
        date: new Date("2024-10-23"),
        attendancePercentage: 100,
        marks: 17,
        status: "present",
        _id: sampleId
    };
    describe('createAttendanceMark', () => {
        it('should create a new attendance mark', () => __awaiter(void 0, void 0, void 0, function* () {
            attendanceMarkRepositoryMock.createAttendanceMark.mockResolvedValue(mockAttendanceMark);
            const result = yield attendanceMarkService.createAttendanceMark(mockAttendanceMark);
            expect(attendanceMarkRepositoryMock.createAttendanceMark).toHaveBeenCalledWith(mockAttendanceMark);
            expect(result).toEqual(mockAttendanceMark);
        }));
    });
    describe('getAllAttendanceMarks', () => {
        it('should return all attendance marks', () => __awaiter(void 0, void 0, void 0, function* () {
            attendanceMarkRepositoryMock.getAllAttendanceMarks.mockResolvedValue([mockAttendanceMark]);
            const result = yield attendanceMarkService.getAllAttendanceMarks();
            expect(attendanceMarkRepositoryMock.getAllAttendanceMarks).toHaveBeenCalled();
            expect(result).toEqual([mockAttendanceMark]);
        }));
        it('should return null if no attendance marks are found', () => __awaiter(void 0, void 0, void 0, function* () {
            attendanceMarkRepositoryMock.getAllAttendanceMarks.mockResolvedValue(null);
            const result = yield attendanceMarkService.getAllAttendanceMarks();
            expect(result).toBeNull();
        }));
    });
    describe('getAttendanceMarkByStudentId', () => {
        it('should return the attendance mark for a given student ID', () => __awaiter(void 0, void 0, void 0, function* () {
            attendanceMarkRepositoryMock.getAttendanceMarkByStudentId.mockResolvedValue(mockAttendanceMark);
            const result = yield attendanceMarkService.getAttendanceMarkByStudentId('123');
            expect(attendanceMarkRepositoryMock.getAttendanceMarkByStudentId).toHaveBeenCalledWith('123');
            expect(result).toEqual(mockAttendanceMark);
        }));
        it('should return null if no attendance mark is found for the given student ID', () => __awaiter(void 0, void 0, void 0, function* () {
            attendanceMarkRepositoryMock.getAttendanceMarkByStudentId.mockResolvedValue(null);
            const result = yield attendanceMarkService.getAttendanceMarkByStudentId('123');
            expect(result).toBeNull();
        }));
    });
    describe('updateAttendanceMark', () => {
        it('should update an attendance mark for the given student ID', () => __awaiter(void 0, void 0, void 0, function* () {
            const updates = { status: 'absent' };
            const updatedMark = Object.assign(Object.assign({}, mockAttendanceMark), updates);
            attendanceMarkRepositoryMock.updateAttendanceDataByStudentId.mockResolvedValue(updatedMark);
            const result = yield attendanceMarkService.updateAttendanceMark('123', updates);
            expect(attendanceMarkRepositoryMock.updateAttendanceDataByStudentId).toHaveBeenCalledWith('123', updates);
            expect(result).toEqual(updatedMark);
        }));
        it('should return null if the attendance mark to update is not found', () => __awaiter(void 0, void 0, void 0, function* () {
            attendanceMarkRepositoryMock.updateAttendanceDataByStudentId.mockResolvedValue(null);
            const result = yield attendanceMarkService.updateAttendanceMark('123', { status: 'absent' });
            expect(result).toBeNull();
        }));
    });
    describe('deleteAttendanceMark', () => {
        it('should delete an attendance mark for the given student ID', () => __awaiter(void 0, void 0, void 0, function* () {
            attendanceMarkRepositoryMock.deleteAttendanceMark.mockResolvedValue(mockAttendanceMark);
            const result = yield attendanceMarkService.deleteAttendanceMark('123');
            expect(attendanceMarkRepositoryMock.deleteAttendanceMark).toHaveBeenCalledWith('123');
            expect(result).toEqual(mockAttendanceMark);
        }));
        it('should return null if no attendance mark is found for the given student ID', () => __awaiter(void 0, void 0, void 0, function* () {
            attendanceMarkRepositoryMock.deleteAttendanceMark.mockResolvedValue(null);
            const result = yield attendanceMarkService.deleteAttendanceMark('123');
            expect(result).toBeNull();
        }));
    });
});
