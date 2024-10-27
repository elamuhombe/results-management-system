//src/controllers/projectSubmissionMarksController.ts
import { Request, Response, NextFunction } from 'express';
import ProjectSubmissionService from '../services/projectSubmissionMarksService';
import { IProjectSubmissionMark } from '../types/types';
import errorHandler from '../middleware/errorHandler'; // Import the error handler

class ProjectSubmissionController {
    private projectSubmissionService: ProjectSubmissionService;

    constructor() {
        this.projectSubmissionService = new ProjectSubmissionService();
    }

    // Controller method to create a new project submission mark
    async createProjectSubmissionMark(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const projectSubmissionData: IProjectSubmissionMark = req.body;
            const newProjectSubmissionMark = await this.projectSubmissionService.createProjectSubmissionData(projectSubmissionData);
            return res.status(201).json(newProjectSubmissionMark);
        } catch (error) {
            return errorHandler(error, req, res, next); // Use the error handler
        }
    }

    // Controller method to get all project submission marks
    async getAllProjectSubmissionMarks(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const projectSubmissionMarks = await this.projectSubmissionService.getAllProjectSubmissionData();
            return res.status(200).json(projectSubmissionMarks);
        } catch (error) {
            return errorHandler(error, req, res, next); // Use the error handler
        }
    }

    // Controller method to get a specific project submission mark by student ID
    async getProjectSubmissionMarkByStudentId(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const { studentId } = req.params;
            const projectSubmissionMark = await this.projectSubmissionService.getProjectSubmissionDataByStudentId(studentId);
            return res.status(200).json(projectSubmissionMark);
        } catch (error) {
            return errorHandler(error, req, res, next); // Use the error handler
        }
    }

    // Controller method to update project submission mark using student ID
    async updateProjectSubmissionMark(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const { studentId } = req.params;
            const updates: Partial<IProjectSubmissionMark> = req.body;
            const updatedProjectSubmissionMark = await this.projectSubmissionService.updateProjectSubmissionData(studentId, updates);
            return res.status(200).json(updatedProjectSubmissionMark);
        } catch (error) {
            return errorHandler(error, req, res, next); // Use the error handler
        }
    }

    // Controller method to delete a project submission mark by student ID
    async deleteProjectSubmissionMark(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const { studentId } = req.params;
            const deletedProjectSubmissionMark = await this.projectSubmissionService.deleteProjectSubmissionDataByStudentId(studentId);
            return res.status(200).json(deletedProjectSubmissionMark);
        } catch (error) {
            return errorHandler(error, req, res, next); // Use the error handler
        }
    }
}

export default ProjectSubmissionController;
