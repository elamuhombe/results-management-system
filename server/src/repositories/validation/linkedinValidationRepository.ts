//src/repositories/validation/linkedinValidationRepository.ts

import { Types } from "mongoose";
import { ILinkedInPostMark } from "../../types/types";
import { linkedInPostMarkValidationSchema } from "../../validation/marksValidation";
import { LinkedInPostMarkModel } from "../../models/marksModel";

// Validate the linkedin post data against the linkedin post validation schema
export const validateLinkedInPostData= async(linkedinData: ILinkedInPostMark): 
Promise<ILinkedInPostMark>=>{
    const validatedLinkedInData = await linkedInPostMarkValidationSchema.parseAsync(linkedinData);

    // Convert _id to mongoose.Types.ObjectId and return a new object
  return {
    ... validatedLinkedInData,
    _id: new Types.ObjectId(validatedLinkedInData._id),  // Convert the main _id to ObjectId
    student: {
        _id: new Types.ObjectId(validatedLinkedInData.student._id),  // Convert student._id to ObjectId
        name:validatedLinkedInData.student.name,
        studentId: validatedLinkedInData.student.studentId,
    }
} as ILinkedInPostMark;  // Type assertion to IAttendanceMark
};

  // Check if linkedin post  data already exists for the student
  export const checkExistingLinkedInData = async(studentId:string): Promise<ILinkedInPostMark | null>=>{
    const existingLinkedInData = await LinkedInPostMarkModel.findOne({studentId});

    return existingLinkedInData
  }