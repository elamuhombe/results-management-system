"use strict";
// src/controllers/attendanceMarkController.ts
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
const errorHandler_1 = __importDefault(require("../middleware/errorHandler")); // Import the error handler
const attendanceMarksService_1 = __importDefault(require("../services/attendanceMarksService"));
class AttendanceMarkController {
    constructor() {
        this.attendanceMarkService = new attendanceMarksService_1.default();
    }
    // Controller method to create a new attendance mark
    createAttendanceMark(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const attendanceData = req.body;
                const newAttendanceMark = yield this.attendanceMarkService.createAttendanceMark(attendanceData);
                return res.status(201).json(newAttendanceMark);
            }
            catch (error) {
                return (0, errorHandler_1.default)(error, req, res, next); // Use the error handler
            }
        });
    }
    // Controller method to get all attendance marks
    getAllAttendanceMarks(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const attendanceMarks = yield this.attendanceMarkService.getAllAttendanceMarks();
                return res.status(200).json(attendanceMarks);
            }
            catch (error) {
                return (0, errorHandler_1.default)(error, req, res, next); // Use the error handler
            }
        });
    }
    // Controller method to get a specific attendance mark by student ID
    getAttendanceMarkByStudentId(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { studentId } = req.params;
                const attendanceMark = yield this.attendanceMarkService.getAttendanceMarkByStudentId(studentId);
                return res.status(200).json(attendanceMark);
            }
            catch (error) {
                return (0, errorHandler_1.default)(error, req, res, next); // Use the error handler
            }
        });
    }
    // Controller method to update attendance mark
    updateAttendanceMark(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { studentId } = req.params;
                const updates = req.body;
                const updatedAttendanceMark = yield this.attendanceMarkService.updateAttendanceMark(studentId, updates);
                return res.status(200).json(updatedAttendanceMark);
            }
            catch (error) {
                return (0, errorHandler_1.default)(error, req, res, next); // Use the error handler
            }
        });
    }
    // Controller method to delete an attendance mark
    deleteAttendanceMark(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { studentId } = req.params;
                const deletedAttendanceMark = yield this.attendanceMarkService.deleteAttendanceMark(studentId);
                return res.status(200).json(deletedAttendanceMark);
            }
            catch (error) {
                return (0, errorHandler_1.default)(error, req, res, next); // Use the error handler
            }
        });
    }
}
exports.default = AttendanceMarkController;
