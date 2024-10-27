"use strict";
// src/repositories/attendanceMarkRepository.ts
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
const marksModel_1 = require("../../models/marksModel");
const attendanceValidationRepository_1 = require("../validation/attendanceValidationRepository");
class AttendanceMarkRepository {
    // Method to create a new attendance mark
    createAttendanceMark(attendanceData) {
        return __awaiter(this, void 0, void 0, function* () {
            // Validate the attendance data using attendanceValidationRepository
            const validatedData = yield (0, attendanceValidationRepository_1.validateAttendanceData)(attendanceData);
            // check for existing attendance before creating a new one
            const existingAttendance = yield (0, attendanceValidationRepository_1.checkExistingAttendance)(validatedData.student.studentId, validatedData.date);
            if (existingAttendance) {
                throw new Error(`Attendance mark already exists for student with ID ${validatedData.student.studentId} on ${validatedData.date}`);
            }
            const newAttendanceMark = yield marksModel_1.AttendanceMarkModel.create(validatedData);
            return newAttendanceMark;
        });
    }
    // Method to get all attendance marks
    getAllAttendanceMarks() {
        return __awaiter(this, void 0, void 0, function* () {
            const attendanceMarks = yield marksModel_1.AttendanceMarkModel.find();
            if (attendanceMarks.length === 0 || !attendanceMarks) {
                throw new Error("No attendance marks found.");
            }
            return attendanceMarks;
        });
    }
    // Method to get a specific attendance mark by student id
    getAttendanceMarkByStudentId(studentId) {
        return __awaiter(this, void 0, void 0, function* () {
            const attendanceMark = yield marksModel_1.AttendanceMarkModel.findOne({ studentId });
            if (!attendanceMark) {
                throw new Error(`Attendance mark with ID ${studentId} does not exist.`);
            }
            return attendanceMark;
        });
    }
    // Method to update attendance marks data by student id
    updateAttendanceDataByStudentId(studentId, updatedData) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedAttendanceData = yield marksModel_1.AttendanceMarkModel.findOneAndUpdate({ studentId }, updatedData, { new: true });
            if (!updatedAttendanceData) {
                console.warn(`No attendance mark found for student with ID ${studentId}`);
                return null; // Return null instead of throwing an error
            }
            return updatedAttendanceData;
        });
    }
    // Method to delete an attendance mark
    deleteAttendanceMark(studentId) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedAttendanceMark = yield marksModel_1.AttendanceMarkModel.findByIdAndDelete(studentId);
            if (!deletedAttendanceMark) {
                console.warn(`No attendance mark found for student with ID ${studentId}`);
                return null; // Return null instead of throwing an error
            }
            return deletedAttendanceMark;
        });
    }
}
exports.default = AttendanceMarkRepository;
