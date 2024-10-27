// src/tests/projectReviewRepository.test.ts

import { ProjectReviewMarkModel } from "../../models/marksModel";
import { IProjectReviewMark } from "../../types/types";
import ProjectReviewRepository from "../../repositories/marks/projectReviewRepository";
import {
  checkExistingProjectReviewData,
  validateProjectReviewData,
} from "../../repositories/validation/projectReviewMarkValidation";
import mongoose from "mongoose";

jest.mock("../../models/marksModel"); // Mock the ProjectReviewMarkModel
jest.mock("../../repositories/validation/projectReviewMarkValidation"); // Mock validation functions

describe("ProjectReviewRepository", () => {
  let projectReviewRepo: ProjectReviewRepository;
  const student_id = new mongoose.Types.ObjectId("2317505c94677a67f23e5a6d");
  const studentId = "12345";
  const sampleProjectReviewId = new mongoose.Types.ObjectId(
    "4717509c94674a67f23e5a6d"
  );

  beforeEach(() => {
    projectReviewRepo = new ProjectReviewRepository();
  });

  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test
  });

  describe("createProjectReviewMark", () => {
    it("should create a new project review mark", async () => {
      const projectReviewData: IProjectReviewMark = {
        _id: sampleProjectReviewId,
        student: {
          _id: new mongoose.Types.ObjectId("7717505c94674a67f23e5a6d"),
          name: "John Doe",
          studentId: studentId,
        },
        marks: 85,
        feedback: "Great job!",
        project_title: "Creditons secure system",
        date: new Date("2024-10-23"),
      };

      (validateProjectReviewData as jest.Mock).mockResolvedValue(
        projectReviewData
      );
      (checkExistingProjectReviewData as jest.Mock).mockResolvedValue(null);
      (ProjectReviewMarkModel.create as jest.Mock).mockResolvedValue(
        projectReviewData
      );

      const result = await projectReviewRepo.createProjectReviewMark(
        projectReviewData
      );

      expect(validateProjectReviewData).toHaveBeenCalledWith(projectReviewData);
      expect(checkExistingProjectReviewData).toHaveBeenCalledWith(
        projectReviewData.student.studentId
      );
      expect(ProjectReviewMarkModel.create).toHaveBeenCalledWith(
        projectReviewData
      );
      expect(result).toEqual(projectReviewData);
    });

    it("should throw an error if project review mark already exists", async () => {
      const projectReviewData: IProjectReviewMark = {
        _id: sampleProjectReviewId,
        student: {
          _id: student_id,
          name: "John Doe",
          studentId: studentId,
        },
        marks: 85,
        feedback: "Great job!",
        project_title: "Creditons secure system",
        date: new Date("2024-10-23"),
      };

      (validateProjectReviewData as jest.Mock).mockResolvedValue(
        projectReviewData
      );
      (checkExistingProjectReviewData as jest.Mock).mockResolvedValue(true);

      await expect(
        projectReviewRepo.createProjectReviewMark(projectReviewData)
      ).rejects.toThrow(
        `Project review mark already exists for student with ID ${projectReviewData.student.studentId}`
      );
    });
  });

  describe("getAllProjectReviewMarks", () => {
    it("should return all project review marks", async () => {
      const projectReviewMarks = [
        {
          _id: sampleProjectReviewId,
          student: {
            _id: student_id,
            name: "John Doe",
            studentId: studentId,
          },
          marks: 85,
          feedback: "Great job!",
          project_title: "Crediton secure system",
          date: new Date("2024-10-23"),
        },
      ];

      (ProjectReviewMarkModel.find as jest.Mock).mockResolvedValue(
        projectReviewMarks
      );

      const result = await projectReviewRepo.getAllProjectReviewData();

      expect(ProjectReviewMarkModel.find).toHaveBeenCalled();
      expect(result).toEqual(projectReviewMarks);
    });

    it("should throw an error if no project review marks are found", async () => {
      (ProjectReviewMarkModel.find as jest.Mock).mockResolvedValue([]);

      await expect(
        projectReviewRepo.getAllProjectReviewData()
      ).rejects.toThrow("No project review marks found");
    });
  });

  describe("getProjectReviewMarkByStudentId", () => {
    it("should return a project review mark by student ID", async () => {
      const projectReviewMark = {
        _id: sampleProjectReviewId,
        student: {
          _id: student_id,
          name: "John Doe",
          studentId: studentId,
        },
        marks: 85,
        feedback: "Great job!",
        project_title: "Crediton secure system",
        date: new Date("2024-10-23"),
      };

      (ProjectReviewMarkModel.findOne as jest.Mock).mockResolvedValue(
        projectReviewMark
      );

      const result = await projectReviewRepo.getProjectReviewMarkByStudentId(
        studentId
      );

      expect(ProjectReviewMarkModel.findOne).toHaveBeenCalledWith({
        studentId,
      });
      expect(result).toEqual(projectReviewMark);
    });

    it("should throw an error if project review mark does not exist", async () => {
      (ProjectReviewMarkModel.findOne as jest.Mock).mockResolvedValue(null);

      await expect(
        projectReviewRepo.getProjectReviewMarkByStudentId(studentId)
      ).rejects.toThrow(
        `Project review marks for student with  ID: ${studentId} does not exist.`
      );
    });
  });

  describe("updateProjectReviewDataByStudentId", () => {
    it("should update project review data for a given student ID", async () => {
      const updatedData = {
        _id: sampleProjectReviewId,
        student: {
          _id: student_id,
          name: "John Doe",
          studentId: studentId,
        },
        marks: 90,
        project_title: "Creditons secure system",
        feedback: "Improved performance.",
        date: new Date("2024-10-24"),
      };

      (ProjectReviewMarkModel.findOneAndUpdate as jest.Mock).mockResolvedValue(
        updatedData
      );

      const result = await projectReviewRepo.updateProjectReviewDataByStudentId(
        studentId, updatedData
      );

      expect(ProjectReviewMarkModel.findOneAndUpdate).toHaveBeenCalledWith(
        { studentId: "12345" },
        expect.any(Object),
        { new: true }
    );
    
      expect(result).toEqual(updatedData);
    });

    it("should throw an error if updating project review data fails", async () => {
      (ProjectReviewMarkModel.findOneAndUpdate as jest.Mock).mockResolvedValue(
        null
      );

      await expect(
        projectReviewRepo.updateProjectReviewDataByStudentId(studentId, {marks: 25})
      ).rejects.toThrow(
        `Project review data not updated for student with id: ${studentId}`
      );
    });
  });

  describe("deleteProjectReviewData", () => {
    it("should delete a project review mark by student ID", async () => {
      const deletedData = {
        _id: sampleProjectReviewId,
        student: {
          _id: student_id,
          name: "John Doe",
          studentId: studentId,
        },
        marks: 85,
        feedback: "Great job!",
        project_title: "Crediton secure system",
        date: new Date("2024-10-23"),
      };

      (ProjectReviewMarkModel.findOneAndDelete as jest.Mock).mockResolvedValue(
        deletedData
      );

      const result = await projectReviewRepo.deleteProjectReviewData(studentId);

      expect(ProjectReviewMarkModel.findOneAndDelete).toHaveBeenCalledWith({
        studentId,
      });
      expect(result).toEqual(deletedData);
    });

    it("should throw an error if deleting a project review mark fails", async () => {
      (ProjectReviewMarkModel.findOneAndDelete as jest.Mock).mockResolvedValue(
        null
      );

      await expect(
        projectReviewRepo.deleteProjectReviewData(studentId)
      ).rejects.toThrow(
        `Problem occurred while deleting project review data for student with ID: ${studentId}`
      );
    });
  });
});
