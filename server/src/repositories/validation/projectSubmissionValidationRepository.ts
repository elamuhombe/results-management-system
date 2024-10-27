//src/repositories/validation/projectSubmissionValidationRepository.ts

import { Types } from "mongoose";
import { ProjectSubmissionMarkModel } from "../../models/marksModel";

import { projectSubmissionMarkValidationSchema } from "../../validation/marksValidation";
import { IProjectSubmissionMark } from "../../types/types";

// Validate the project submission data against the project submission validation schema
export const validateProjectSubmissionData = async (
  projectSubmissionData: IProjectSubmissionMark
): Promise<IProjectSubmissionMark> => {
  const validatedProjectSubmissionData =
    await projectSubmissionMarkValidationSchema.parseAsync(
      projectSubmissionData
    );

  // Convert _id to mongoose.Types.ObjectId and return a new object

  return {
    ...validatedProjectSubmissionData,
    _id: new Types.ObjectId(validatedProjectSubmissionData._id), // Convert the main _id to ObjectId
    student: {
      _id: new Types.ObjectId(validatedProjectSubmissionData.student._id), // Convert student._id to ObjectId
      name: validatedProjectSubmissionData.student.name,
      studentId: validatedProjectSubmissionData.student.studentId,
    },
  } as IProjectSubmissionMark;
};

// Check if project submission datat already exists for the student

export const checkExistingProjectSubmissionData = async (
  studentId: string
): Promise<IProjectSubmissionMark | null> => {
  const existingProjectSubmissionData =
    await ProjectSubmissionMarkModel.findOne({ studentId });

  return existingProjectSubmissionData;
};
