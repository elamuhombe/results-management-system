import mongoose, { Types } from "mongoose";

// Interface representing a user in the system
export default interface IUser {
  _id: Types.ObjectId;
  name: string; // The name of the user
  studentId?: string;//Unique student id
  email: string; // The email address of the user
  password: string; // The password for user authentication
  userRole: "admin" | "student"; // The role of the user in the system
}

export interface ResetPasswordResponse {
  user: IUser; // The user object
  resetToken: string; // The generated reset token
}

// Interface representing session
export interface ISession {
  _id: Types.ObjectId;
  user: IUser;
  sessionId: string;
  expiresAt: Date; // Session expiration time
  ipAddress: string; // IP address of the user
  userAgent: string; // Details about the user's browser or device
  isActive: boolean; // Status of the session
  createdAt?: Date;
  updatedAt?: Date;
}

export enum MarkCategory {
  Attendance = "attendance",
  ProjectReview = "projectReview",
  Assessment = "assessment",
  ProjectSubmission = "projectSubmission",
  LinkedInPost = "linkedinPost",
}

// Base interface for different types of marks
export interface IBaseMark  {
  student: Pick<IUser, '_id'> & { userRole: 'student', studentId: string, name: string }; // Only include _id and userRole
  marks: number; // Marks received by the student
  date: Date; // Date of the marks entry
}

// Interface for attendance marks, extending BaseMark
export interface IAttendanceMark extends IBaseMark {
 
  _id: Types.ObjectId;
  attendancePercentage: number; // Percentage of attendance
  status: "present" | "absent"; // Attendance status of the student
}
// // Extend with Document for Mongoose-specific properties
// export interface IAttendanceMarkDocument extends IAttendanceMark, Document {
  
// }

// Interface for project review marks, extending BaseMark
 
export interface IProjectReviewMark extends IBaseMark {
  _id: Types.ObjectId;
  feedback: string; // Feedback provided for the project review
}

// Interface for LinkedIn post marks, extending BaseMark
export interface ILinkedInPostMark extends IBaseMark {
  _id: Types.ObjectId;
  postLink: string; // Link to the student's LinkedIn post
}

// Interface for Assessment marks, extending BaseMark
export interface IAssessmentMark extends IBaseMark {
  _id: Types.ObjectId;
  assessmentTitle: string; // Title of the assessment
}

// Interface representing total marks for a student
export interface ITotalMarks {
  _id: Types.ObjectId;
  student: Pick<IUser, '_id'> & { userRole: 'student', studentId: string, name: string }; // Only include _id and userRole
  totalAttendanceMarks: number; // Total attendance marks
  totalProjectReviewMarks: number; // Total project review marks
  totalLinkedInPostMarks: number; // Total LinkedIn post marks
  totalAssessmentMarks: number; // Total assessment marks
  overallTotal: number; // Overall total marks
}

export interface IExcelUpload {
  file: File; // Uploaded Excel file
  category: MarkCategory; // Category of marks
  userId: mongoose.Types.ObjectId; // User uploading the file (ObjectId)
}
