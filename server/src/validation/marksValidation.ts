//src/validation/marksValidation.ts

import mongoose from 'mongoose';
import { z } from 'zod';

// Custom validation for ObjectId
const objectId = z.string().refine(value => mongoose.Types.ObjectId.isValid(value), {
    message: 'Invalid ObjectId format',
});
// Schema for the User with only _id and userRole
const studentSchema = z.object({
    _id: objectId,
    studentId: z.string().min(1, 'Student ID is required'),
    name:z.string().min(1, 'student name is required'),
})

// Base schema for BaseMark
const baseMarkSchema = z.object({
    student: studentSchema, // Include student object with limited properties
    marks: z.number().min(0, 'Marks must be a non-negative number'),
    date: z.date(),
});

// Validation schema for AttendanceMark
export const attendanceMarkValidationSchema = baseMarkSchema.extend({
    _id: objectId, 
    attendancePercentage: z.number().min(0).max(100, 'Attendance percentage must be between 0 and 100'),
    status: z.enum(['present', 'absent']),
});

// Validation schema for ProjectReviewMark
export const projectReviewMarkValidationSchema = baseMarkSchema.extend({
    _id: objectId, 
    project_title: z.string().min(12,'Project title is required'),
    feedback: z.string().optional(),
});
// Validation schema for projectSubmissionMark
export const projectSubmissionMarkValidationSchema = baseMarkSchema.extend({
    _id: objectId,
    project_title: z.string().min(12,'Project title is required')
});
// validation schema for ProjectSubmissionMark


// Validation schema for LinkedInPostMark
export const linkedInPostMarkValidationSchema = baseMarkSchema.extend({
    _id: objectId, 
    postLink: z.string().url('Invalid URL format for LinkedIn post link'),
});

// Validation schema for AssessmentMark
export const assessmentMarkValidationSchema = baseMarkSchema.extend({
    _id: objectId,
    subject: z.string().min(1, 'Assessment title is required'),
});

// Validation schema for TotalMarks
export const totalMarksValidationSchema = z.object({
    _id: objectId, 
    studentId: z.string().min(1, 'Student ID is required'),
    totalAttendanceMarks: z.number().min(0, 'Total attendance marks must be a non-negative number'),
    totalProjectReviewMarks: z.number().min(0, 'Total project review marks must be a non-negative number'),
    totalLinkedInPostMarks: z.number().min(0, 'Total LinkedIn post marks must be a non-negative number'),
    totalAssessmentMarks: z.number().min(0, 'Total assessment marks must be a non-negative number'),
    overallTotal: z.number().min(0, 'Overall total marks must be a non-negative number'),
});