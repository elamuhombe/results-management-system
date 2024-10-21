//src/models/marksModel.ts
import mongoose, { model, Schema } from "mongoose";
import { IBaseMark, IAttendanceMark, IProjectReviewMark, ILinkedInPostMark, IAssessmentMark } from "../types/types";

// BaseMark schema
const BaseMarkSchema = new Schema<IBaseMark>({
    studentId: { type: String, required: true },
    marks: { type: Number, required: true, min: 0 },
    date: { type: Date, required: true },
});

// AttendanceMark schema
const AttendanceMarkSchema = new Schema<IAttendanceMark>({}, { timestamps: true });

AttendanceMarkSchema.add({
    ...BaseMarkSchema.obj,
    attendancePercentage: { type: Number, required: true, min: 0, max: 100 },
    status: { type: String, enum: ['present', 'absent'], required: true },
}, );

// ProjectReviewMark schema
const ProjectReviewMarkSchema = new Schema<IProjectReviewMark>({}, { timestamps: true });
ProjectReviewMarkSchema.add({
    ...BaseMarkSchema.obj,
    feedback: { type: String, required: true },
});

// LinkedInPostMark schema
const LinkedInPostMarkSchema = new Schema<ILinkedInPostMark>({}, { timestamps: true });
LinkedInPostMarkSchema.add({
    ...BaseMarkSchema.obj,
    postLink: { type: String, required: true },
});

// AssessmentMark schema
const AssessmentMarkSchema = new Schema<IAssessmentMark>({}, { timestamps: true });
AssessmentMarkSchema.add({
    ...BaseMarkSchema.obj,
    assessmentTitle: { type: String, required: true },
});

// Export the models
export const AttendanceMarkModel = model<IAttendanceMark>('AttendanceMark', AttendanceMarkSchema);
export const ProjectReviewMarkModel = model<IProjectReviewMark>('ProjectReviewMark', ProjectReviewMarkSchema);
export const LinkedInPostMarkModel = model<ILinkedInPostMark>('LinkedInPostMark', LinkedInPostMarkSchema);
export const AssessmentMarkModel = model<IAssessmentMark>('AssessmentMark', AssessmentMarkSchema);
