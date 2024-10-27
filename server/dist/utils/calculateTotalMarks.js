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
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateTotalMarks = void 0;
const marksModel_1 = require("../models/marksModel");
const calculateTotalMarks = (studentId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const attendanceMarks = yield marksModel_1.AttendanceMarkModel.find({ student: studentId });
        const assessmentMarks = yield marksModel_1.AssessmentMarkModel.find({ student: studentId });
        const projectReviewMarks = yield marksModel_1.ProjectReviewMarkModel.find({ student: studentId });
        const projectSubmissionMarks = yield marksModel_1.ProjectSubmissionMarkModel.find({ student: studentId });
        const linkedInPostMarks = yield marksModel_1.LinkedInPostMarkModel.find({ student: studentId });
        const allMarks = [
            ...attendanceMarks,
            ...assessmentMarks,
            ...projectReviewMarks,
            ...projectSubmissionMarks,
            ...linkedInPostMarks
        ];
        const total = allMarks.reduce((sum, mark) => sum + (mark.marks || 0), 0);
        return total;
    }
    catch (error) {
        console.error("Error calculating total marks:", error);
        throw new Error("Error calculating total marks: Database error");
    }
});
exports.calculateTotalMarks = calculateTotalMarks;
