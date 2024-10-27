// src/services/assessmentService.ts

import AssessmentRepository from '../repositories/marks/assessmentRepository';
import { IAssessmentMark } from '../types/types';

class AssessmentService {
    private assessmentRepository: AssessmentRepository;

    constructor() {
        this.assessmentRepository = new AssessmentRepository();
    }

    // Service method to create a new assessment mark
    async createAssessment(assessmentData: IAssessmentMark): Promise<IAssessmentMark> {
        return await this.assessmentRepository.createAssessmentData(assessmentData);
    }

    // Service method to get all assessment marks
    async getAllAssessments(): Promise<IAssessmentMark[] | null> {
        return await this.assessmentRepository.getAllAssessmentData();
    }

    // Service method to get a specific assessment mark by student ID
    async getAssessmentByStudentId(studentId: string): Promise<IAssessmentMark | null> {
        return await this.assessmentRepository.getAssessmentDataByStudentId(studentId);
    }

    // Service method to update an assessment mark
    async updateAssessment(studentId: string, updates: Partial<IAssessmentMark>): Promise<IAssessmentMark | null> {
        return await this.assessmentRepository.updateAssessmentData(studentId, updates);
    }

    async deleteAssessmentData(studentId: string): Promise<IAssessmentMark | null> {
        const deletedAssessmentData = await this.assessmentRepository.deleteAssessmentDataByStudentId(studentId);
    
        if (deletedAssessmentData === null) {
            // You may choose to log this in a more user-friendly way, or handle it silently
            console.info(`No assessment mark found for student ID: ${studentId}`); // Changed to info
            return null; // Return null without warning
        }
        
        return deletedAssessmentData;
    }
    
    async deleteAllAssessmentData(): Promise<{ deleteCount: number }> {
        const deletedAllAssessmentData = await this.assessmentRepository.deleteAllAssessmentData();
        return { deleteCount: deletedAllAssessmentData.deletedCount };
      }
}

export default AssessmentService;
