// src/controllers/attendanceMarkController.ts

import { Request, Response, NextFunction } from 'express';

import { IAttendanceMark } from '../types/types';
import errorHandler from '../middleware/errorHandler'; // Import the error handler
import AttendanceMarkService from '../services/attendanceMarksService';

class AttendanceMarkController {
    private attendanceMarkService: AttendanceMarkService;

    constructor() {
        this.attendanceMarkService = new AttendanceMarkService();
    }

    // Controller method to create a new attendance mark
    async createAttendanceMark(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const attendanceData: IAttendanceMark = req.body;
            const newAttendanceMark = await this.attendanceMarkService.createAttendanceMark(attendanceData);
            return res.status(201).json(newAttendanceMark);
        } catch (error) {
            return errorHandler(error, req, res, next); // Use the error handler
        }
    }

    // Controller method to get all attendance marks
    async getAllAttendanceMarks(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const attendanceMarks = await this.attendanceMarkService.getAllAttendanceMarks();
            return res.status(200).json(attendanceMarks);
        } catch (error) {
            return errorHandler(error, req, res, next); // Use the error handler
        }
    }

    // Controller method to get a specific attendance mark by student ID
    async getAttendanceMarkByStudentId(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const { studentId } = req.params;
            const attendanceMark = await this.attendanceMarkService.getAttendanceMarkByStudentId(studentId);
            return res.status(200).json(attendanceMark);
        } catch (error) {
            return errorHandler(error, req, res, next); // Use the error handler
        }
    }

    // Controller method to update attendance mark
    async updateAttendanceMark(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const { studentId } = req.params;
            const updates: Partial<IAttendanceMark> = req.body;
            const updatedAttendanceMark = await this.attendanceMarkService.updateAttendanceMark(studentId, updates);
            return res.status(200).json(updatedAttendanceMark);
        } catch (error) {
            return errorHandler(error, req, res, next); // Use the error handler
        }
    }

    // Controller method to delete an attendance mark
    async deleteAttendanceMark(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const { studentId } = req.params;
            const deletedAttendanceMark = await this.attendanceMarkService.deleteAttendanceMark(studentId);
            return res.status(200).json(deletedAttendanceMark);
        } catch (error) {
            return errorHandler(error, req, res, next); // Use the error handler
        }
    }
}

export default AttendanceMarkController;
