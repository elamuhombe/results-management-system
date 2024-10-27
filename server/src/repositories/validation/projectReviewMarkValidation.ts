//src/repositories/validation/projectMarkValidation.ts

import { Types } from "mongoose";
import { IProjectReviewMark } from "../../types/types"
import { projectReviewMarkValidationSchema } from "../../validation/marksValidation"
import { ProjectReviewMarkModel } from "../../models/marksModel";


// Validate the project review data against the project review validation schema
export const validateProjectReviewData = async(
    projectReviewData:IProjectReviewMark):Promise<IProjectReviewMark>=>{
        // validate the incoming data
        const validatedData = await projectReviewMarkValidationSchema.parseAsync(projectReviewData);

           // Convert _id to mongoose.Types.ObjectId and return a new object
       
  return {
    ...validatedData,
    _id: new Types.ObjectId(validatedData._id),  // Convert the main _id to ObjectId
    student: {
        _id: new Types.ObjectId(validatedData.student._id),  // Convert student._id to ObjectId
        studentId: validatedData.student.studentId,
        name: validatedData.student.name,
    }
} as IProjectReviewMark;  // Type assertion to IAttendanceMark
};
  // Check if project review data already exists for the student
  export const checkExistingProjectReviewData = async(studentId: string):
  Promise<IProjectReviewMark|null>=>{
    return await ProjectReviewMarkModel.findOne({studentId})
  }


