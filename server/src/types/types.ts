// src/types/types.ts
import mongoose, { Document} from 'mongoose';

// Interface representing a user in the system
export default interface IUser {
    name: string;            // The name of the user
    email: string;           // The email address of the user
    password: string;        // The password for user authentication
    userRole: 'admin' | 'student'; // The role of the user in the system
}


// Interface representing session
export interface ISession extends Document {
  userId: mongoose.Types.ObjectId;  // Reference to the User model
  expiresAt: Date;  // Session expiration time
  ipAddress: string;  // IP address of the user
  userAgent: string;  // Details about the user's browser or device
  isActive: boolean;  // Status of the session
}


// Base interface for different types of marks
export  interface IBaseMark extends Document {
    studentId: string;      // Unique identifier for the student
    marks: number;           // Marks received by the student
    date: Date;              // Date of the marks entry
}

// Interface for attendance marks, extending BaseMark
export  interface IAttendanceMark extends IBaseMark {
    attendancePercentage: number; // Percentage of attendance
    status: 'present' | 'absent';  // Attendance status of the student
}

// Interface for project review marks, extending BaseMark
export interface IProjectReviewMark extends IBaseMark {
    feedback: string;         // Feedback provided for the project review
}

// Interface for LinkedIn post marks, extending BaseMark
export interface ILinkedInPostMark extends IBaseMark { 
    postLink: string;        // Link to the student's LinkedIn post
}

// Interface for Assessment marks, extending BaseMark
export interface IAssessmentMark extends IBaseMark{
    assessmentTitle: string // Title of the assessment
}

// Interface representing total marks for a student
export interface ITotalMarks {
    studentId: string;             // Unique identifier for the student
    totalAttendanceMarks: number;   // Total attendance marks
    totalProjectReviewMarks: number; // Total project review marks
    totalLinkedInPostMarks: number;  // Total LinkedIn post marks
    totalAssessmentMarks: number;    // Total assessment marks
    overallTotal: number;            // Overall total marks
}
