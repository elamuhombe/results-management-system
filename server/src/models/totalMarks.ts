// src/models/totalMarks.ts

import { model, Schema } from "mongoose";
import { ITotalMarks } from "../types/types";

const totalMarksSchema = new Schema({
    student: {
        _id: { type: Schema.Types.ObjectId, required: true },
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

export const TotalMarksModel = model<ITotalMarks>("TotalMarks", totalMarksSchema);

export default TotalMarksModel;
