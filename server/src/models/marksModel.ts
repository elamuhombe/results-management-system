//src/models/marksModel.ts
import mongoose, { Schema } from "mongoose";
import { IBaseMark, IAttendanceMark, IProjectReviewMark, ILinkedInPostMark, IAssessmentMark } from "../types/types";

// BaseMark schema
const BaseMarkSchema = new Schema<IBaseMark>({
    studentId: { type: String, required: true },
    marks: { type: Number, required: true, min: 0 },
    date: { type: Date, required: true },
});

// AttendanceMark schema
const AttendanceMarkSchema = new Schema<IAttendanceMark>();
AttendanceMarkSchema.add({
    ...BaseMarkSchema.obj, // Use .obj to get the base schema fields
    attendancePercentage: { type: Number, required: true, min: 0, max: 100 },
    status: { type: String, enum: ['present', 'absent'], required: true },
});

// ProjectReviewMark schema
const ProjectReviewMarkSchema = new Schema<IProjectReviewMark>();
ProjectReviewMarkSchema.add({
    ...BaseMarkSchema.obj,
    feedback: { type: String, required: true },
});

// LinkedInPostMark schema
const LinkedInPostMarkSchema = new Schema<ILinkedInPostMark>();
LinkedInPostMarkSchema.add({
    ...BaseMarkSchema.obj,
    postLink: { type: String, required: true },
});

// AssessmentMark schema
const AssessmentMarkSchema = new Schema<IAssessmentMark>();
AssessmentMarkSchema.add({
    ...BaseMarkSchema.obj,
    assessmentTitle: { type: String, required: true },
});

// Exporting the models
export const AttendanceMarkModel = mongoose.model<IAttendanceMark>('AttendanceMark', AttendanceMarkSchema);
export const ProjectReviewMarkModel = mongoose.model<IProjectReviewMark>('ProjectReviewMark', ProjectReviewMarkSchema);
export const LinkedInPostMarkModel = mongoose.model<ILinkedInPostMark>('LinkedInPostMark', LinkedInPostMarkSchema);
export const AssessmentMarkModel = mongoose.model<IAssessmentMark>('AssessmentMark', AssessmentMarkSchema);
