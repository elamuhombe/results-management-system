//src/controllers/projectReviewMarksController.ts
import { Request, Response, NextFunction } from 'express';
import ProjectReviewService from '../services/projectReviewMarksService';
import { IProjectReviewMark } from '../types/types';
import errorHandler from '../middleware/errorHandler'; // Import the error handler

class ProjectReviewController {
    private projectReviewService: ProjectReviewService;

    constructor() {
        this.projectReviewService = new ProjectReviewService();
    }

    // Controller method to create a new project review mark
    async createProjectReviewMark(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const projectReviewData: IProjectReviewMark = req.body;
            const newProjectReviewMark = await this.projectReviewService.createProjectReviewData(projectReviewData);
            return res.status(201).json(newProjectReviewMark);
        } catch (error) {
            return errorHandler(error, req, res, next); // Use the error handler
        }
    }

    // Controller method to get all project review marks
    async getAllProjectReviewMarks(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const projectReviewMarks = await this.projectReviewService.getAllProjectReviewData();
            return res.status(200).json(projectReviewMarks);
        } catch (error) {
            return errorHandler(error, req, res, next); // Use the error handler
        }
    }

    // Controller method to get a specific project review mark by student ID
    async getProjectReviewMarkByStudentId(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const { studentId } = req.params;
            const projectReviewMark = await this.projectReviewService.getProjectReviewDataByStudentId(studentId);
            return res.status(200).json(projectReviewMark);
        } catch (error) {
            return errorHandler(error, req, res, next); // Use the error handler
        }
    }

    // Controller method to update project review mark using student ID
    async updateProjectReviewMark(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const { studentId } = req.params;
            const updates: Partial<IProjectReviewMark> = req.body;
            const updatedProjectReviewMark = await this.projectReviewService.updateProjectReviewData(studentId, updates);
            return res.status(200).json(updatedProjectReviewMark);
        } catch (error) {
            return errorHandler(error, req, res, next); // Use the error handler
        }
    }

    // Controller method to delete a project review mark by student ID
    async deleteProjectReviewMark(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const { studentId } = req.params;
            const deletedProjectReviewMark = await this.projectReviewService.deleteProjectReviewDataByStudentId(studentId);
            return res.status(200).json(deletedProjectReviewMark);
        } catch (error) {
            return errorHandler(error, req, res, next); // Use the error handler
        }
    }
}

export default ProjectReviewController;
