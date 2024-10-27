"use strict";
//src/services/attendanceMarksService
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
const attendanceRepository_1 = __importDefault(require("../repositories/marks/attendanceRepository"));
class AttendanceMarkService {
    constructor() {
        this.attendanceMarkRepository = new attendanceRepository_1.default();
    }
    // Service method to create a new attendance mark
    createAttendanceMark(attendanceData) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.attendanceMarkRepository.createAttendanceMark(attendanceData);
        });
    }
    // Service method to get all attendance marks
    getAllAttendanceMarks() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.attendanceMarkRepository.getAllAttendanceMarks();
        });
    }
    // Service method to get a specific attendance mark by student ID
    getAttendanceMarkByStudentId(studentId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.attendanceMarkRepository.getAttendanceMarkByStudentId(studentId);
        });
    }
    // Service method to update attendance mark
    updateAttendanceMark(studentId, updates) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.attendanceMarkRepository.updateAttendanceDataByStudentId(studentId, updates);
        });
    }
    // Service method to delete an attendance mark
    deleteAttendanceMark(studentId) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedAttendanceData = yield this.attendanceMarkRepository.deleteAttendanceMark(studentId);
            if (deletedAttendanceData === null) {
                console.warn(`No assessment mark found for student ID: ${studentId}`);
                return null;
            }
            return yield this.attendanceMarkRepository.deleteAttendanceMark(studentId);
        });
    }
}
exports.default = AttendanceMarkService;
