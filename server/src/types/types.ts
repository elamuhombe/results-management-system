// src/types/types.ts

// Interface representing a user in the system
interface User {
    name: string;            // The name of the user
    email: string;           // The email address of the user
    password: string;        // The password for user authentication
    userRole: 'admin' | 'student'; // The role of the user in the system
}

// Base interface for different types of marks
interface BaseMark {
    studentId: string;      // Unique identifier for the student
    marks: number;           // Marks received by the student
    date: Date;              // Date of the marks entry
}

// Interface for attendance marks, extending BaseMark
interface AttendanceMark extends BaseMark {
    attendancePercentage: number; // Percentage of attendance
    status: 'present' | 'absent';  // Attendance status of the student
}

// Interface for project review marks, extending BaseMark
interface ProjectReviewMark extends BaseMark {
    feedback: string;         // Feedback provided for the project review
}

// Interface for LinkedIn post marks, extending BaseMark
interface LinkedInPostMark extends BaseMark { 
    postLink: string;        // Link to the student's LinkedIn post
}

// Interface for Assessment marks, extending BaseMark
interface AssessmentMark extends BaseMark{
    assessmentTitle: string // Title of the assessment
}