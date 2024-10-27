"use strict";
// src/repositories/attendanceValidationRepository.ts
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
exports.checkExistingAttendance = exports.validateAttendanceData = void 0;
const marksValidation_1 = require("../../validation/marksValidation");
const mongoose_1 = require("mongoose");
const marksModel_1 = require("../../models/marksModel");
// Validate the attendance data against the attendance validation schema
const validateAttendanceData = (attendanceData) => __awaiter(void 0, void 0, void 0, function* () {
    // Validate the incoming data
    const validatedData = yield marksValidation_1.attendanceMarkValidationSchema.parseAsync(attendanceData);
    // Convert _id to mongoose.Types.ObjectId and return a new object
    return Object.assign(Object.assign({}, validatedData), { _id: new mongoose_1.Types.ObjectId(validatedData._id), student: {
            _id: new mongoose_1.Types.ObjectId(validatedData.student._id), // Convert student._id to ObjectId
            name: validatedData.student.name,
            studentId: validatedData.student.studentId,
        } }); // Type assertion to IAttendanceMark
});
exports.validateAttendanceData = validateAttendanceData;
// Check if attendance already exists for the student on a specific date
const checkExistingAttendance = (studentId, date) => __awaiter(void 0, void 0, void 0, function* () {
    return yield marksModel_1.AttendanceMarkModel.findOne({ studentId, date });
});
exports.checkExistingAttendance = checkExistingAttendance;
