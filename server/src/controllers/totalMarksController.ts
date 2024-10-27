//src/controllers/totalMarksController.ts
import { Request, Response, NextFunction } from 'express';


import errorHandler from '../middleware/errorHandler'; // Import the error handler
import TotalMarksService from '../services/totalMarksService';
import { ITotalMarks } from '../types/types';

class TotalMarksController {
    private totalMarksService: TotalMarksService;

    constructor() {
        this.totalMarksService = new TotalMarksService();
    }

    // Controller method to create a new total marks entry
    async createTotalMarks(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const data: ITotalMarks = req.body;
            const newTotalMarks = await this.totalMarksService.createTotalMarks(data);
            return res.status(201).json(newTotalMarks);
        } catch (error) {
            return errorHandler(error, req, res, next); // Use the error handler
        }
    }

    // Controller method to get all total marks entries
    async getAllTotalMarks(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const totalMarks = await this.totalMarksService.getAllTotalMarks();
            return res.status(200).json(totalMarks);
        } catch (error) {
            return errorHandler(error, req, res, next); // Use the error handler
        }
    }

    // Controller method to get total marks by student ID
    async getTotalMarksByStudentId(req: Request, res: Response, next: NextFunction): Promise<Response> {
        const { studentId } = req.params;
        try {
            const totalMarks = await this.totalMarksService.getTotalMarksByStudentId(studentId);
            return res.status(200).json(totalMarks);
        } catch (error) {
            return errorHandler(error, req, res, next); // Use the error handler
        }
    }

    // Controller method to update total marks by student ID
    async updateTotalMarksByStudentId(req: Request, res: Response, next: NextFunction): Promise<Response> {
        const { studentId } = req.params;
        const updatedData: Partial<ITotalMarks> = req.body;

        try {
            const updatedTotalMarks = await this.totalMarksService.updateTotalMarksByStudentId(studentId, updatedData);
            return res.status(200).json(updatedTotalMarks);
        } catch (error) {
            return errorHandler(error, req, res, next); // Use the error handler
        }
    }

    // Controller method to delete total marks entry
    async deleteTotalMarks(req: Request, res: Response, next: NextFunction): Promise<Response> {
        const { studentId } = req.params;

        try {
            const deletedTotalMarks = await this.totalMarksService.deleteTotalMarks(studentId);
            return res.status(200).json(deletedTotalMarks);
        } catch (error) {
            return errorHandler(error, req, res, next); // Use the error handler
        }
    }

    // Controller method to calculate and save total marks for a student
    async calculateAndSaveTotalMarks(req: Request, res: Response, next: NextFunction): Promise<Response> {
        const { studentId } = req.params;

        try {
            const overallTotal = await this.totalMarksService.calculateAndSaveTotalMarks(studentId);
            return res.status(200).json({ studentId, overallTotal });
        } catch (error) {
            return errorHandler(error, req, res, next); // Use the error handler
        }
    }
}

export default TotalMarksController;
