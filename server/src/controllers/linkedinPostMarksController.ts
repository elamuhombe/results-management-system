//src/controllers/LinkedinPostMarksController.ts
import { Request, Response, NextFunction } from 'express';
import { ILinkedInPostMark } from '../types/types';
import errorHandler from '../middleware/errorHandler';
import LinkedinService from '../services/linkedinPostMarksService';

class LinkedinPostMarksController {
    private linkedinService: LinkedinService;

    constructor() {
        this.linkedinService = new LinkedinService();
    }

    // Controller method to create a new LinkedIn post data
    async createLinkedinPostData(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const linkedinPostData: ILinkedInPostMark = req.body;
            const newLinkedinPost = await this.linkedinService.createLinkedinPostData(linkedinPostData);
            return res.status(201).json(newLinkedinPost);
        } catch (error) {
            return errorHandler(error, req, res, next); // Use the error handler
        }
    }

    // Controller method to get all LinkedIn post data
    async getAllLinkedinPostData(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const linkedinPosts = await this.linkedinService.getAllLinkedinPostData();
            return res.status(200).json(linkedinPosts);
        } catch (error) {
            return errorHandler(error, req, res, next); // Use the error handler
        }
    }

    // Controller method to get LinkedIn post data by student ID
    async getLinkedinPostDataByStudentId(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const { studentId } = req.params;
            const linkedinPost = await this.linkedinService.getLinkedinPostDataByStudentId(studentId);
            if (!linkedinPost) {
                return res.status(404).json({ message: `No post found for student ID: ${studentId}` });
            }
            return res.status(200).json(linkedinPost);
        } catch (error) {
            return errorHandler(error, req, res, next); // Use the error handler
        }
    }

    // Controller method to update LinkedIn post data
    async updateLinkedinPostData(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const { studentId } = req.params;
            const updates: Partial<ILinkedInPostMark> = req.body;
            const updatedLinkedinPost = await this.linkedinService.updateLinkedinPostData(studentId, updates);
            if (!updatedLinkedinPost) {
                return res.status(404).json({ message: `No post found for student ID: ${studentId}` });
            }
            return res.status(200).json(updatedLinkedinPost);
        } catch (error) {
            return errorHandler(error, req, res, next); // Use the error handler
        }
    }

    // Controller method to delete LinkedIn post data by student ID
    async deleteLinkedinPostData(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const { studentId } = req.params;
            const deletedLinkedinPost = await this.linkedinService.deleteLinkedinPostData(studentId);
            if (!deletedLinkedinPost) {
                return res.status(404).json({ message: `No post found for student ID: ${studentId}` });
            }
            return res.status(200).json({ message: `Post deleted successfully for student ID: ${studentId}`, result: deletedLinkedinPost });
        } catch (error) {
            return errorHandler(error, req, res, next); // Use the error handler
        }
    }

    // Controller method to delete all LinkedIn post data
    async deleteAllLinkedinPostData(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const result = await this.linkedinService.deleteAllLinkedinPostData();
            return res.status(200).json({ message: `${result.deletedCount} posts deleted successfully.` });
        } catch (error) {
            return errorHandler(error, req, res, next); // Use the error handler
        }
    }
}

export default LinkedinPostMarksController;
