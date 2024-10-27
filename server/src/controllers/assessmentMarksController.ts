//src/controllers/attendanceMarksController.ts
// src/controllers/AssessmentController.ts
import { Request, Response, NextFunction } from "express";

import { IAssessmentMark } from "../types/types";
import errorHandler from "../middleware/errorHandler"; // Import the error handler
import AssessmentService from "../services/assessmentMarksService";

class AssessmentController {
  private assessmentService: AssessmentService;

  constructor() {
    this.assessmentService = new AssessmentService();
  }

  // Controller method to create a new assessment mark
  async createAssessment(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    try {
      const assessmentData: IAssessmentMark = req.body;
      const newAssessment = await this.assessmentService.createAssessment(
        assessmentData
      );
      return res.status(201).json(newAssessment);
    } catch (error) {
      return errorHandler(error, req, res, next); // Use the error handler
    }
  }

  // Controller method to get all assessment marks
  async getAllAssessments(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    try {
      const assessments = await this.assessmentService.getAllAssessments();
      return res.status(200).json(assessments);
    } catch (error) {
      return errorHandler(error, req, res, next); // Use the error handler
    }
  }

  // Controller method to get assessment marks by student ID
  async getAssessmentByStudentId(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    const { studentId } = req.params;
    try {
      const assessment = await this.assessmentService.getAssessmentByStudentId(
        studentId
      );
      if (!assessment) {
        return res
          .status(404)
          .json({
            message: `No assessment found for student ID: ${studentId}`,
          });
      }
      return res.status(200).json(assessment);
    } catch (error) {
      return errorHandler(error, req, res, next); // Use the error handler
    }
  }

  // Controller method to update an assessment mark
  async updateAssessment(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    const { studentId } = req.params;
    const updates: Partial<IAssessmentMark> = req.body;

    try {
      const updatedAssessment = await this.assessmentService.updateAssessment(
        studentId,
        updates
      );
      if (!updatedAssessment) {
        return res
          .status(404)
          .json({
            message: `Assessment for student ID ${studentId} not found.`,
          });
      }
      return res.status(200).json(updatedAssessment);
    } catch (error) {
      return errorHandler(error, req, res, next); // Use the error handler
    }
  }

  // Controller method to delete an assessment entry by student ID
  async deleteAssessment(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    const { studentId } = req.params;

    try {
      const deletedAssessment =
        await this.assessmentService.deleteAssessmentData(studentId);
      if (!deletedAssessment) {
        return res
          .status(404)
          .json({
            message: `No assessment mark found for student ID: ${studentId}`,
          });
      }
      return res.status(200).json(deletedAssessment);
    } catch (error) {
      return errorHandler(error, req, res, next); // Use the error handler
    }
  }

  // Controller method to delete all assessment entries
  async deleteAllAssessments(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    try {
      const result = await this.assessmentService.deleteAllAssessmentData();
      return res
        .status(200)
        .json({ message: `${result.deleteCount} assessment entries deleted.` });
    } catch (error) {
      return errorHandler(error, req, res, next); // Use the error handler
    }
  }
}

export default AssessmentController;
