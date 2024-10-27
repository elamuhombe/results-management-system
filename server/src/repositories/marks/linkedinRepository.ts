//src/repositoroies/marks/linkedinRepository.ts

import { LinkedInPostMarkModel } from "../../models/marksModel";
import { ILinkedInPostMark } from "../../types/types";
import {
  checkExistingLinkedInData,
  validateLinkedInPostData,
} from "../validation/linkedinValidationRepository";

class LinkedInRepository {
  //Method to create and save new linkedin post data

  async createLinkedinData(
    linkedinData: ILinkedInPostMark
  ): Promise<ILinkedInPostMark> {
    const validatedLinkedInData = await validateLinkedInPostData(linkedinData);

    // check for existing linkedin data before creating a new one
    const existingLinkedInData = await checkExistingLinkedInData(
      validatedLinkedInData.student.studentId
    );

    // throw an error if existing linkedin data exists
    if (existingLinkedInData) {
      throw new Error(
        `linkedin post marks already exist for student with id: ${validatedLinkedInData.student.studentId}`
      );
    }

    const newLinkedInData = await LinkedInPostMarkModel.create({
      ...validatedLinkedInData,
    });
    return newLinkedInData;
  }

  // Method to get linkedin post data by student Id
  async getLinkedInData(studentId: string): Promise<ILinkedInPostMark | null> {
    const existingLinkedinMarks = await LinkedInPostMarkModel.findOne({
      studentId,
    });

    if (!existingLinkedinMarks) {
      throw new Error(
       `Error occurred in fetching linkedin post marks for student with id: ${studentId}`
      );
    }

    return existingLinkedinMarks;
  }

  //Method to get all linkedin post data

  async getAllLinkedInData(): Promise<ILinkedInPostMark[]> {
    const allLinkedinData = await LinkedInPostMarkModel.find();

    if (!allLinkedinData || allLinkedinData.length === 0) {
      throw new Error("No LinkedIn data found");
    }
    return allLinkedinData;
  }
// Method to update LinkedIn post data by student Id
async updateLinkedInData(
  studentId: string,
  updateData: Partial<ILinkedInPostMark>
): Promise<ILinkedInPostMark | null> {
  const updatedLinkedInData = await LinkedInPostMarkModel.findOneAndUpdate(
    { studentId },
    updateData,
    { new: true }  // Ensure the updated document is returned
  );

  if (!updatedLinkedInData) {
    throw new Error(
      `Error occurred in updating linkedin data for student with id ${studentId}`
    );
  }

  return updatedLinkedInData;
}

   
  // Method to delete LinkedIn post data by student Id
async deleteLinkedInData(studentId: string): Promise<ILinkedInPostMark | null> {
 

  const deletedLinkedinData = await LinkedInPostMarkModel.findOneAndDelete({
      studentId,
  });

  if (!deletedLinkedinData) {
    console.warn(`No linkedin post data found for student with ID ${studentId}`);
    return null; // Return null instead of throwing an error
  
  }

  return deletedLinkedinData;
}


  // Method to delete all linkedin post data
  async deleteAllLinkedInData(): Promise<{ deletedCount: number }> {
    const deletedAllLinkedInData = await LinkedInPostMarkModel.deleteMany();
    if (deletedAllLinkedInData.deletedCount === 0) {
      throw new Error("No LinkedIn posts to delete");
    }

    return {deletedCount: deletedAllLinkedInData.deletedCount};
  }
}
export default LinkedInRepository;
