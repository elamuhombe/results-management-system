//src/repositories/marks/assessmentRepository.ts

import { AssessmentMarkModel } from "../../models/marksModel";
import { IAssessmentMark } from "../../types/types";
import {
  checkExistingAssessmentData,
  validateAssessmentData,
} from "../validation/assessmentValidationRepository";


class AssessmentRepository {
  // Method to create and save assessment data
  async createAssessmentData(
    assessmentData: IAssessmentMark
  ): Promise<IAssessmentMark> {
    const validatedAssessmentData = await validateAssessmentData(
      assessmentData
    );

    // check for existing assessment data before creating a new one
    const existingAssessmentData = await checkExistingAssessmentData(
      validatedAssessmentData.student.studentId
    );

    if (existingAssessmentData) {
      throw new Error(
        `Assessment data for student with id: ${validatedAssessmentData.student.studentId} already exists`
      );
    }

    const newAssessmentData = await AssessmentMarkModel.create(validatedAssessmentData);
    return newAssessmentData;
  }

  // Method to update assessment data by student Id
  async updateAssessmentData(
    studentId: string,
    updatedData: Partial<IAssessmentMark>
  ): Promise<IAssessmentMark | null> {
    const updatedAssessmentData = await AssessmentMarkModel.findOneAndUpdate(
      { studentId },
      updatedData ,
      { new: true }
    );

    if (!updatedAssessmentData) {
      console.warn(`No assessment data found for student with ID ${studentId}`);
      return null;
    }
    return updatedAssessmentData;
  }

  // Method to get assessment data by student Id

  async getAssessmentDataByStudentId(
    studentId: string
  ): Promise<IAssessmentMark | null> {
    const assessmentData = await AssessmentMarkModel.findOne({ studentId });

    if (!assessmentData) {
      throw new Error(
        `Error occured in fetching assessment data for student with id ${studentId}`
      );
    }

    return assessmentData;
  }

  // Method to get all assessment data
  async getAllAssessmentData(): Promise<IAssessmentMark[] | null> {
    const allAssessmentData = await AssessmentMarkModel.find();

    if (!allAssessmentData || allAssessmentData.length === 0) {
      throw new Error(`Error in fetching all assessment data`);
    }
    return allAssessmentData;
  }

// Method to delete assessment data by student ID
async deleteAssessmentDataByStudentId(
  studentId: string
): Promise<IAssessmentMark | null> {
  const deletedStudentAssessmentData = await AssessmentMarkModel.findOneAndDelete({ studentId });

  // Check if the assessment data was found and deleted
  if (!deletedStudentAssessmentData) {
      console.warn(`No assessment data found for student with ID ${studentId}`);
      return null; // Return null instead of throwing an error
  }

  return deletedStudentAssessmentData; // Return the deleted assessment mark
}


  //Method to delete all assessment data
  async deleteAllAssessmentData(): Promise<{ deletedCount: number }> {
    const deletedAllAssessmentData = await AssessmentMarkModel.deleteMany();

    if (deletedAllAssessmentData.deletedCount === 0) {
      throw new Error(`No assessment data to delete`);
    }
    return { deletedCount: deletedAllAssessmentData.deletedCount };
  }
}
export default AssessmentRepository;
