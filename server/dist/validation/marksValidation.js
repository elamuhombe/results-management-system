"use strict";
//src/validation/marksValidation.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.totalMarksValidationSchema = exports.assessmentMarkValidationSchema = exports.linkedInPostMarkValidationSchema = exports.projectSubmissionMarkValidationSchema = exports.projectReviewMarkValidationSchema = exports.attendanceMarkValidationSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const zod_1 = require("zod");
// Custom validation for ObjectId
const objectId = zod_1.z.string().refine(value => mongoose_1.default.Types.ObjectId.isValid(value), {
    message: 'Invalid ObjectId format',
});
// Schema for the User with only _id and userRole
const studentSchema = zod_1.z.object({
    _id: objectId,
    studentId: zod_1.z.string().min(1, 'Student ID is required'),
    name: zod_1.z.string().min(1, 'student name is required'),
});
// Base schema for BaseMark
const baseMarkSchema = zod_1.z.object({
    student: studentSchema, // Include student object with limited properties
    marks: zod_1.z.number().min(0, 'Marks must be a non-negative number'),
    date: zod_1.z.date(),
});
// Validation schema for AttendanceMark
exports.attendanceMarkValidationSchema = baseMarkSchema.extend({
    _id: objectId,
    attendancePercentage: zod_1.z.number().min(0).max(100, 'Attendance percentage must be between 0 and 100'),
    status: zod_1.z.enum(['present', 'absent']),
});
// Validation schema for ProjectReviewMark
exports.projectReviewMarkValidationSchema = baseMarkSchema.extend({
    _id: objectId,
    project_title: zod_1.z.string().min(12, 'Project title is required'),
    feedback: zod_1.z.string().optional(),
});
// Validation schema for projectSubmissionMark
exports.projectSubmissionMarkValidationSchema = baseMarkSchema.extend({
    _id: objectId,
    project_title: zod_1.z.string().min(12, 'Project title is required')
});
// validation schema for ProjectSubmissionMark
// Validation schema for LinkedInPostMark
exports.linkedInPostMarkValidationSchema = baseMarkSchema.extend({
    _id: objectId,
    postLink: zod_1.z.string().url('Invalid URL format for LinkedIn post link'),
});
// Validation schema for AssessmentMark
exports.assessmentMarkValidationSchema = baseMarkSchema.extend({
    _id: objectId,
    subject: zod_1.z.string().min(1, 'Assessment title is required'),
});
// Validation schema for TotalMarks
exports.totalMarksValidationSchema = zod_1.z.object({
    _id: objectId,
    studentId: zod_1.z.string().min(1, 'Student ID is required'),
    totalAttendanceMarks: zod_1.z.number().min(0, 'Total attendance marks must be a non-negative number'),
    totalProjectReviewMarks: zod_1.z.number().min(0, 'Total project review marks must be a non-negative number'),
    totalLinkedInPostMarks: zod_1.z.number().min(0, 'Total LinkedIn post marks must be a non-negative number'),
    totalAssessmentMarks: zod_1.z.number().min(0, 'Total assessment marks must be a non-negative number'),
    overallTotal: zod_1.z.number().min(0, 'Overall total marks must be a non-negative number'),
});
