//src/validation/marksValidation.ts

import { z } from 'zod';

// Base schema for BaseMark
const baseMarkSchema = z.object({
    studentId: z.string().min(1, 'Student ID is required'),
    marks: z.number().min(0, 'Marks must be a non-negative number'),
    date: z.date(),
});

// Validation schema for AttendanceMark
export const attendanceMarkValidationSchema = baseMarkSchema.extend({
    attendancePercentage: z.number().min(0).max(100, 'Attendance percentage must be between 0 and 100'),
    status: z.enum(['present', 'absent']),
});

// Validation schema for ProjectReviewMark
export const projectReviewMarkValidationSchema = baseMarkSchema.extend({
    feedback: z.string().optional(),
});

// Validation schema for LinkedInPostMark
export const linkedInPostMarkValidationSchema = baseMarkSchema.extend({
    postLink: z.string().url('Invalid URL format for LinkedIn post link'),
});

// Validation schema for AssessmentMark
export const assessmentMarkValidationSchema = baseMarkSchema.extend({
    assessmentTitle: z.string().min(1, 'Assessment title is required'),
});

// Validation schema for TotalMarks
export const totalMarksValidationSchema = z.object({
    studentId: z.string().min(1, 'Student ID is required'),
    totalAttendanceMarks: z.number().min(0, 'Total attendance marks must be a non-negative number'),
    totalProjectReviewMarks: z.number().min(0, 'Total project review marks must be a non-negative number'),
    totalLinkedInPostMarks: z.number().min(0, 'Total LinkedIn post marks must be a non-negative number'),
    totalAssessmentMarks: z.number().min(0, 'Total assessment marks must be a non-negative number'),
    overallTotal: z.number().min(0, 'Overall total marks must be a non-negative number'),
});