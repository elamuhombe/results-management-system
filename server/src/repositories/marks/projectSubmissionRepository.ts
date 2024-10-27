//src/repositories/marks/projectSubmissionRepository.ts

import {
  ProjectReviewMarkModel,
  ProjectSubmissionMarkModel,
} from "../../models/marksModel";
import { IProjectSubmissionMark } from "../../types/types";
import { validateProjectReviewData } from "../validation/projectReviewMarkValidation";
import {
  checkExistingProjectSubmissionData,
  validateProjectSubmissionData,
} from "../validation/projectSubmissionValidationRepository";

class ProjectSubmissionRepository {
  //Method to create and save project submission marks

  async createProjectSubmissionData(
    projectSubmissionData: IProjectSubmissionMark
  ): Promise<IProjectSubmissionMark> {
    const validatedProjectSubmissionData = await validateProjectSubmissionData(
      projectSubmissionData
    );

    //check for existing project submission data
    const existingProjectSubmissionData =
      await checkExistingProjectSubmissionData(
        validatedProjectSubmissionData.student.studentId
      );

    // Throw exception if existing project submission data found
    if (existingProjectSubmissionData) {
      throw new Error(
        `Project submission data already exists for student with Id: ${validatedProjectSubmissionData.student.studentId}`
      );
    }

    const newProjectSubmissionData = await ProjectSubmissionMarkModel.create({
      ...validateProjectSubmissionData,
    });

    return newProjectSubmissionData;
  }

  // Method to get project submission data by student Id

  async getProjectSubmissionDataByStudentId(
    studentId: string
  ): Promise<IProjectSubmissionMark | null> {
    const projectSubmissionData = await ProjectSubmissionMarkModel.findOne({
      studentId,
    });

    if (!projectSubmissionData) {
      throw new Error(
        `Error in fetching project submission data for student with Id: ${studentId}`
      );
    }
    return projectSubmissionData;
  }

  // Method to get all project submission data

  async getAllProjectSubmissionData(): Promise<
    IProjectSubmissionMark[] | null
  > {
    const allProjectSubmissionData = await ProjectSubmissionMarkModel.find();

    if (allProjectSubmissionData.length === 0 || !allProjectSubmissionData) {
      throw new Error("Error occured in fetching all project submission data");
    }
    return allProjectSubmissionData;
  }

  // Method to update project submission data by student Id
  async updateProjectSubmissionData(
    studentId: string,
    updateData: Partial<IProjectSubmissionMark> // pass an update object
  ): Promise<IProjectSubmissionMark | null> {
    const updatedProjectSubmissionData = await ProjectSubmissionMarkModel.findOneAndUpdate(
      { studentId },
      updateData,
      { new: true }
    );
    if (!updatedProjectSubmissionData) {
      throw new Error(
        `Error occurred in updating project submission data for student with id: ${studentId}`
      );
    }
    return updatedProjectSubmissionData;
  }
  

  // Method to delete project submission data by student Id
  async deleteProjectSubmissionDataByStudentId(
    studentId: string
  ): Promise<IProjectSubmissionMark | null> {
    const deletedProjectSubmissionData =
      await ProjectSubmissionMarkModel.findOneAndDelete({ studentId });
    if (!deletedProjectSubmissionData) {
      throw new Error(
        `Error occured in deleting project submission data for student with Id ${studentId}`
      );
    }
    return deletedProjectSubmissionData;
  }

  // Method to delete all project submission data
  async deleteAllProjectSubmissionData(): Promise<{ deletedCount: number }> {
    const deletedAllProjectSubmissionData =
      await ProjectSubmissionMarkModel.deleteMany();
    if (deletedAllProjectSubmissionData.deletedCount === 0) {
      throw new Error("No project submission data to delete");
    }

    return {deletedCount:deletedAllProjectSubmissionData.deletedCount};
  }
}

export default ProjectSubmissionRepository;
