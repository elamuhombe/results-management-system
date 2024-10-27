import { AssessmentMarkModel, AttendanceMarkModel, LinkedInPostMarkModel, 
    ProjectReviewMarkModel, ProjectSubmissionMarkModel} from "../models/marksModel";

 

export const calculateTotalMarks = async (studentId: string) => {
    try {
        const attendanceMarks = await AttendanceMarkModel.find({ student: studentId });
        const assessmentMarks = await AssessmentMarkModel.find({ student: studentId });
        const projectReviewMarks = await ProjectReviewMarkModel.find({ student: studentId });
        const projectSubmissionMarks = await ProjectSubmissionMarkModel.find({ student: studentId });
        const linkedInPostMarks = await LinkedInPostMarkModel.find({ student: studentId });


        const allMarks = [
            ...attendanceMarks,
            ...assessmentMarks,
            ...projectReviewMarks,
            ...projectSubmissionMarks,
            ...linkedInPostMarks
        ];
        
        
        const total = allMarks.reduce((sum, mark) => sum + (mark.marks || 0), 0);
        
        return total;
    } catch (error) {
        console.error("Error calculating total marks:", error);
        throw new Error("Error calculating total marks: Database error");
    }
};
