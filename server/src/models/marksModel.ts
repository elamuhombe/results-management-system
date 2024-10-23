//src/models/marksModel.ts
import  { model, Schema } from "mongoose";
import { IBaseMark, IAttendanceMark, IProjectReviewMark, ILinkedInPostMark, IAssessmentMark } from "../types/types";


// BaseMark schema
const BaseMarkSchema = new Schema<IBaseMark>({
    student: {
        _id: { type: Schema.Types.ObjectId, required: true },
        name: { type: String, required: true }, // Student name
        userRole: { type: String, required: true, enum: ['student'] }, // Only 'student' role
        studentId: { type: String, required: true }, // Student ID
    },
   
    marks: { type: Number, required: true, min: 0 }, // Marks received by the student
    date: { type: Date, required: true }, // Date of the marks entry
});

// AttendanceMark schema
const AttendanceMarkSchema = new Schema<IAttendanceMark>({}, { timestamps: true });

AttendanceMarkSchema.add({
    ...BaseMarkSchema.obj,
    _id: { type: Schema.Types.ObjectId, required: true, auto: true },
    attendancePercentage: { type: Number, required: true, min: 0, max: 100 },
    status: { type: String, enum: ['present', 'absent'], required: true },
}, );

// ProjectReviewMark schema
const ProjectReviewMarkSchema = new Schema<IProjectReviewMark>({}, { timestamps: true });
ProjectReviewMarkSchema.add({
    ...BaseMarkSchema.obj,
    _id: { type: Schema.Types.ObjectId, required: true, auto: true },
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
