import { Schema } from "zod";
import { IProjectReviewMark } from "../../types/types";
import { projectReviewMarkValidationSchema } from "../../validation/marksValidation";
import {
  checkExistingProjectReviewData,
  validateProjectReviewData,
} from "../validation/projectReviewMarkValidation";
import { ProjectReviewMarkModel } from "../../models/marksModel";

//Method to create and save new project review marks
class ProjectReviewRepository {
  async createProjectReviewMark(
    projectReviewData: IProjectReviewMark
  ): Promise<IProjectReviewMark> {
    const validatedProjectReviewData = await validateProjectReviewData(
      projectReviewData
    );

    // Check for existing project review data before creating a new one
    const existingProjectReviewData = await checkExistingProjectReviewData(
      validatedProjectReviewData.student.studentId
    );

    if (existingProjectReviewData) {
      throw new Error(
        `Project review mark already exists for student with ID ${validatedProjectReviewData.student.studentId}`
      );
    }

    const newProjectReviewMark = await ProjectReviewMarkModel.create(
      validatedProjectReviewData
    );
    return newProjectReviewMark;
  }

  // Method to get all project review marks
  async getAllProjectReviewData(): Promise<IProjectReviewMark[] | null> {
    const allProjectReviewMarks = await ProjectReviewMarkModel.find();
    if (allProjectReviewMarks.length === 0 || !allProjectReviewMarks) {
      throw new Error("No project review marks found");
    }
    return allProjectReviewMarks;
  }

  // Method to get a specific project review mark by ID
  async getProjectReviewMarkByStudentId(
    studentId: string
  ): Promise<IProjectReviewMark | null> {
    const projectReviewMarks = await ProjectReviewMarkModel.findOne({
      studentId,
    });

    if (!projectReviewMarks) {
      throw new Error(
        `Project review marks for student with  ID: ${studentId} does not exist.`
      );
    }
    return projectReviewMarks;
  }

  // Method to update project review mark
  async updateProjectReviewDataByStudentId(
    studentId: string,
    updatedData: Partial<IProjectReviewMark>
  ): Promise<IProjectReviewMark | null> {
    const updatedProjectReviewData =
      await ProjectReviewMarkModel.findOneAndUpdate(
        { studentId },
        updatedData,
        { new: true }
      );

    if (!updatedProjectReviewData) {
      throw new Error(
        `Project review data not updated for student with id: ${studentId}`
      );
    }
    return updatedProjectReviewData;
  }

  // Method to delete a project review mark
  async deleteProjectReviewData(
    studentId: string
  ): Promise<IProjectReviewMark | null> {
    const deletedProjectReviewData =
      await ProjectReviewMarkModel.findOneAndDelete({ studentId });

    try {
      const deletedProjectReviewData =
        await ProjectReviewMarkModel.findOneAndDelete({ studentId });

      if (!deletedProjectReviewData) {
        throw new Error(
          `Problem occurred while deleting project review data for student with ID: ${studentId}`
        );
      }

      return deletedProjectReviewData;
    } catch (error: any) {
      // Handle unexpected errors
      throw new Error(`Failed to delete project review data: ${error.message}`);
    }
  }
}

export default ProjectReviewRepository;
