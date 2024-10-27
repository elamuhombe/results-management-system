//src/services/attendanceMarksService

import AttendanceMarkRepository from '../repositories/marks/attendanceRepository';
import { IAttendanceMark } from '../types/types';

class AttendanceMarkService {
    private attendanceMarkRepository: AttendanceMarkRepository;

    constructor() {
        this.attendanceMarkRepository = new AttendanceMarkRepository();
    }

    // Service method to create a new attendance mark
    async createAttendanceMark(attendanceData: IAttendanceMark): Promise<IAttendanceMark> {
        return await this.attendanceMarkRepository.createAttendanceMark(attendanceData);
    }

    // Service method to get all attendance marks
    async getAllAttendanceMarks(): Promise<IAttendanceMark[]|null> {
        return await this.attendanceMarkRepository.getAllAttendanceMarks();
    }

    // Service method to get a specific attendance mark by student ID
    async getAttendanceMarkByStudentId(studentId: string): Promise<IAttendanceMark | null> {
        return await this.attendanceMarkRepository.getAttendanceMarkByStudentId(studentId);
    }

    // Service method to update attendance mark
    async updateAttendanceMark(studentId: string, updates: Partial<IAttendanceMark >): Promise<IAttendanceMark | null> {
        return await this.attendanceMarkRepository.updateAttendanceDataByStudentId(studentId, updates)
    }

    // Service method to delete an attendance mark
    async deleteAttendanceMark(studentId: string): Promise<IAttendanceMark | null > {
        const deletedAttendanceData = await this.attendanceMarkRepository.deleteAttendanceMark(studentId)
        if (deletedAttendanceData === null) {
            console.warn(`No assessment mark found for student ID: ${studentId}`);
            return null;
        }
        return await this.attendanceMarkRepository.deleteAttendanceMark(studentId);
    }
}

export default AttendanceMarkService;
