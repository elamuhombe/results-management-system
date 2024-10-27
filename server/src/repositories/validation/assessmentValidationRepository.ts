//src/repositories/validation/assessmentValidationRepository.ts

import { Types } from "mongoose";
import { IAssessmentMark } from "../../types/types";
import { assessmentMarkValidationSchema } from "../../validation/marksValidation";
import { AssessmentMarkModel } from "../../models/marksModel";



// Validate the assessment  data against the assessment validation schema
export const validateAssessmentData = async(
    assessmentData:IAssessmentMark):Promise<IAssessmentMark>=>{
        // validate the incoming data
        const validatedData = await assessmentMarkValidationSchema.parseAsync(assessmentData);

           // Convert _id to mongoose.Types.ObjectId and return a new object
       
  return {
    ...validatedData,
    _id: new Types.ObjectId(validatedData._id),  // Convert the main _id to ObjectId
    student: {
        _id: new Types.ObjectId(validatedData.student._id),  // Convert student._id to ObjectId
        studentId: validatedData.student.studentId,
        name: validatedData.student.name,
    }
} as IAssessmentMark;  // Type assertion to IAssessmentMark
};

// check existing assessment data
export const checkExistingAssessmentData = async(studentId: string): Promise<IAssessmentMark | null>=>{
   return AssessmentMarkModel.findOne({studentId})
}