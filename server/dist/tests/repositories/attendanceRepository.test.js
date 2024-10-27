"use strict";
//src/tests/attendanceRepository.test.ts
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
const attendanceRepository_1 = __importDefault(require("../../repositories/marks/attendanceRepository"));
const attendanceValidationRepository_1 = require("../../repositories/validation/attendanceValidationRepository");
const mongoose_1 = __importDefault(require("mongoose"));
jest.mock("../../models/marksModel"); // Mock the AttendanceMarkModel
jest.mock("../../repositories/validation/attendanceValidationRepository"); // Mock validation functions
describe("AttendanceMarkRepository", () => {
    let attendanceMarkRepo;
    const student_id = new mongoose_1.default.Types.ObjectId('7717505c94674a67f23e5a6d');
    const sampleAttendanceId = new mongoose_1.default.Types.ObjectId('4717509c94674a67f23e5a6d');
    beforeEach(() => {
        attendanceMarkRepo = new attendanceRepository_1.default();
    });
    afterEach(() => {
        jest.clearAllMocks(); // Clear mocks after each test
    });
    describe("createAttendanceMark", () => {
        it("should create a new attendance mark", () => __awaiter(void 0, void 0, void 0, function* () {
            const attendanceData = {
                student: {
                    _id: student_id,
                    name: "John Doe",
                    studentId: "12345",
                },
                date: new Date("2024-10-23"),
                attendancePercentage: 100,
                marks: 17,
                status: "present",
                _id: sampleAttendanceId
            };
            attendanceValidationRepository_1.validateAttendanceData.mockResolvedValue(attendanceData);
            attendanceValidationRepository_1.checkExistingAttendance.mockResolvedValue(null);
            marksModel_1.AttendanceMarkModel.create.mockResolvedValue(attendanceData);
            const result = yield attendanceMarkRepo.createAttendanceMark(attendanceData);
            expect(attendanceValidationRepository_1.validateAttendanceData).toHaveBeenCalledWith(attendanceData);
            expect(attendanceValidationRepository_1.checkExistingAttendance).toHaveBeenCalledWith(attendanceData.student.studentId, attendanceData.date);
            expect(marksModel_1.AttendanceMarkModel.create).toHaveBeenCalledWith(attendanceData);
            expect(result).toEqual(attendanceData);
        }));
        it("should throw an error if attendance mark already exists", () => __awaiter(void 0, void 0, void 0, function* () {
            const attendanceData = {
                student: {
                    _id: student_id,
                    name: "John Doe",
                    studentId: "12345",
                },
                date: new Date("2024-10-23"),
                attendancePercentage: 100,
                marks: 18,
                status: "present",
                _id: sampleAttendanceId
            };
            attendanceValidationRepository_1.validateAttendanceData.mockResolvedValue(attendanceData);
            attendanceValidationRepository_1.checkExistingAttendance.mockResolvedValue(true);
            yield expect(attendanceMarkRepo.createAttendanceMark(attendanceData)).rejects.toThrow(`Attendance mark already exists for student with ID ${attendanceData.student.studentId} on ${attendanceData.date}`);
        }));
    });
    describe("getAllAttendanceMarks", () => {
        it("should return all attendance marks", () => __awaiter(void 0, void 0, void 0, function* () {
            const attendanceMarks = [
                {
                    student: {
                        _id: student_id,
                        name: "John Doe",
                        userRole: "student",
                        studentId: "12345",
                    },
                    date: new Date("2024-10-23"),
                    attendancePercentage: 100,
                    marks: 17,
                    status: "present",
                    _id: sampleAttendanceId
                },
            ];
            marksModel_1.AttendanceMarkModel.find.mockResolvedValue(attendanceMarks);
            const result = yield attendanceMarkRepo.getAllAttendanceMarks();
            expect(marksModel_1.AttendanceMarkModel.find).toHaveBeenCalled();
            expect(result).toEqual(attendanceMarks);
        }));
        it("should throw an error if no attendance marks are found", () => __awaiter(void 0, void 0, void 0, function* () {
            marksModel_1.AttendanceMarkModel.find.mockResolvedValue([]);
            yield expect(attendanceMarkRepo.getAllAttendanceMarks()).rejects.toThrow("No attendance marks found.");
        }));
    });
    describe("getAttendanceMarkByStudentId", () => {
        it("should return an attendance mark by student ID", () => __awaiter(void 0, void 0, void 0, function* () {
            const attendanceMark = {
                student: {
                    _id: student_id,
                    name: "John Doe",
                    studentId: "12345",
                },
                date: new Date("2024-10-23"),
                attendancePercentage: 100,
                status: "present",
                marks: 25,
            };
            marksModel_1.AttendanceMarkModel.findOne.mockResolvedValue(attendanceMark);
            const result = yield attendanceMarkRepo.getAttendanceMarkByStudentId("12345");
            expect(marksModel_1.AttendanceMarkModel.findOne).toHaveBeenCalledWith({ studentId: "12345" });
            expect(result).toEqual(attendanceMark);
        }));
        it("should throw an error if attendance mark does not exist", () => __awaiter(void 0, void 0, void 0, function* () {
            marksModel_1.AttendanceMarkModel.findOne.mockResolvedValue(null);
            yield expect(attendanceMarkRepo.getAttendanceMarkByStudentId("12345")).rejects.toThrow("Attendance mark with ID 12345 does not exist.");
        }));
    });
    describe("updateAttendanceDataByStudentId", () => {
        it("should update attendance data for a given student ID", () => __awaiter(void 0, void 0, void 0, function* () {
            const updatedData = {
                student: {
                    _id: student_id,
                    name: "John Doe",
                    studentId: "12345",
                },
                date: "2024-10-23",
                attendancePercentage: 100,
                status: "present",
                marks: 26,
                _id: sampleAttendanceId
            };
            marksModel_1.AttendanceMarkModel.findOneAndUpdate.mockResolvedValue(updatedData);
            const result = yield attendanceMarkRepo.updateAttendanceDataByStudentId("12345", { status: 'absent' });
            expect(marksModel_1.AttendanceMarkModel.findOneAndUpdate).toHaveBeenCalledWith({ studentId: "12345" }, { status: 'absent' }, { new: true });
            expect(result).toEqual(updatedData);
        }));
        it("should throw an error if updating attendance data fails", () => __awaiter(void 0, void 0, void 0, function* () {
            marksModel_1.AttendanceMarkModel.findOneAndUpdate.mockRejectedValue(new Error("Error updating attendance data for student with id: 12345"));
            yield expect(attendanceMarkRepo.updateAttendanceDataByStudentId("12345", { marks: 31 })).rejects.toThrow("Error updating attendance data for student with id: 12345");
        }));
    });
    describe("deleteAttendanceMark", () => {
        it("should delete an attendance mark by student ID", () => __awaiter(void 0, void 0, void 0, function* () {
            const deletedData = {
                student: {
                    _id: student_id,
                    name: "John Doe",
                    studentId: "12345",
                },
                date: "2024-10-23",
                attendancePercentage: 100,
                status: "present",
                marks: 28,
                _id: sampleAttendanceId
            };
            marksModel_1.AttendanceMarkModel.findByIdAndDelete.mockResolvedValue(deletedData);
            const result = yield attendanceMarkRepo.deleteAttendanceMark("12345");
            expect(marksModel_1.AttendanceMarkModel.findByIdAndDelete).toHaveBeenCalledWith("12345");
            expect(result).toEqual(deletedData);
        }));
        it("should throw an error if deleting an attendance mark fails", () => __awaiter(void 0, void 0, void 0, function* () {
            // Mock `findByIdAndDelete` to throw an error instead of resolving to null
            marksModel_1.AttendanceMarkModel.findByIdAndDelete.mockRejectedValue(new Error("Error occurred while deleting attendance mark with ID: 12345"));
            // Now `deleteAttendanceMark` should reject, allowing `rejects.toThrow` to catch it
            yield expect(attendanceMarkRepo.deleteAttendanceMark("12345")).rejects.toThrow("Error occurred while deleting attendance mark with ID: 12345");
        }));
    });
});
