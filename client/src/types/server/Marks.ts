// types/server/Marks.ts


export enum MarkCategory {
  Attendance = "attendance",
  ProjectReview = "projectReview",
  Assessment = "assessment",
  ProjectSubmission = "projectSubmission",
  LinkedInPost = "linkedinPost",
}

export interface IBaseMark {
  student: { id: string; studentId: string; name: string };
  marks: number;
  date: string;
}

export interface IAttendanceMark extends IBaseMark {
  _id: string;
  attendancePercentage: number;
  status: "present" | "absent";
}

export interface IProjectReviewMark extends IBaseMark {
  _id: string;
  project_title: string;
  feedback: string;
}

export interface IProjectSubmissionMark extends IBaseMark {
  _id: string;
  project_title: string;
}

export interface ILinkedInPostMark extends IBaseMark {
  _id: string;
  postLink: string;
}

export interface IAssessmentMark extends IBaseMark {
  _id: string;
  subject: string;
}

export interface ITotalMarks {
  id: string;
  student: {
      id: string;
      studentId: string;
      name: string;
  };
  totalAttendanceMarks: number;
  totalProjectReviewMarks: number;
  totalLinkedInPostMarks: number;
  totalAssessmentMarks: number;
  overallTotal: number;
}

export interface IExcelUpload {
  file: File;
  category: MarkCategory;
  userId: string;
}
