"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssessmentMarkModel = exports.LinkedInPostMarkModel = exports.ProjectSubmissionMarkModel = exports.ProjectReviewMarkModel = exports.AttendanceMarkModel = void 0;
//src/models/marksModel.ts
const mongoose_1 = require("mongoose");
// BaseMark schema
const BaseMarkSchema = new mongoose_1.Schema({
    student: {
        _id: { type: mongoose_1.Schema.Types.ObjectId, required: true },
        name: { type: String, required: true }, // Student name
        studentId: { type: String, required: true }, // Student ID
    },
    marks: { type: Number, required: true, min: 0 }, // Marks received by the student
    date: { type: Date, required: true }, // Date of the marks entry
});
// AttendanceMark schema
const AttendanceMarkSchema = new mongoose_1.Schema({}, { timestamps: true });
AttendanceMarkSchema.add(Object.assign(Object.assign({}, BaseMarkSchema.obj), { _id: { type: mongoose_1.Schema.Types.ObjectId, required: true, auto: true }, attendancePercentage: { type: Number, required: true, min: 0, max: 100 }, status: { type: String, enum: ["present", "absent"], required: true } }));
// ProjectReviewMark schema
const ProjectReviewMarkSchema = new mongoose_1.Schema({}, { timestamps: true });
ProjectReviewMarkSchema.add(Object.assign(Object.assign({}, BaseMarkSchema.obj), { _id: { type: mongoose_1.Schema.Types.ObjectId, required: true, auto: true }, project_title: { type: String, required: true }, feedback: { type: String, required: true } }));
// ProjectSubmissionMark schema
const ProjectSubmissionMarkSchema = new mongoose_1.Schema({}, { timestamps: true });
ProjectSubmissionMarkSchema.add(Object.assign(Object.assign({}, BaseMarkSchema.obj), { _id: { type: mongoose_1.Schema.Types.ObjectId, required: true, auto: true }, project_title: { type: String, required: true } }));
// LinkedInPostMark schema
const LinkedInPostMarkSchema = new mongoose_1.Schema({}, { timestamps: true });
LinkedInPostMarkSchema.add(Object.assign(Object.assign({}, BaseMarkSchema.obj), { postLink: { type: String, required: true } }));
// AssessmentMark schema
const AssessmentMarkSchema = new mongoose_1.Schema({}, { timestamps: true });
AssessmentMarkSchema.add(Object.assign(Object.assign({}, BaseMarkSchema.obj), { _id: { type: mongoose_1.Schema.Types.ObjectId, required: true, auto: true }, subject: { type: String, required: true } }));
// Export the models
exports.AttendanceMarkModel = (0, mongoose_1.model)("AttendanceMark", AttendanceMarkSchema);
exports.ProjectReviewMarkModel = (0, mongoose_1.model)("ProjectReviewMark", ProjectReviewMarkSchema);
exports.ProjectSubmissionMarkModel = (0, mongoose_1.model)("ProjectSubmissionMark", ProjectSubmissionMarkSchema);
exports.LinkedInPostMarkModel = (0, mongoose_1.model)("LinkedInPostMark", LinkedInPostMarkSchema);
exports.AssessmentMarkModel = (0, mongoose_1.model)("AssessmentMark", AssessmentMarkSchema);
