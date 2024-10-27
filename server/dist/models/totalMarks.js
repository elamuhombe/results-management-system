"use strict";
// src/models/totalMarks.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.TotalMarksModel = void 0;
const mongoose_1 = require("mongoose");
const totalMarksSchema = new mongoose_1.Schema({
    student: {
        _id: { type: mongoose_1.Schema.Types.ObjectId, required: true },
        userRole: { type: String, required: true, enum: ['student'] }, // Only 'student' role
        studentId: { type: String, required: true }, // Student ID
    },
    totalAttendanceMarks: { type: Number },
    totalProjectReviewMarks: { type: Number },
    totalLinkedInPostMarks: { type: Number },
    totalAssessmentMarks: { type: Number },
    overallTotal: { type: Number }
}, { timestamps: true });
//export the model
exports.TotalMarksModel = (0, mongoose_1.model)("TotalMarks", totalMarksSchema);
exports.default = exports.TotalMarksModel;
