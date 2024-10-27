//src/services/projectSubmissionMarksService.ts

import ProjectSubmissionRepository from '../repositories/marks/projectSubmissionRepository';
import {  IProjectSubmissionMark } from '../types/types';

class ProjectSubmissionService {
    private projectSubmissionRepository: ProjectSubmissionRepository;

    constructor() {
        this.projectSubmissionRepository = new ProjectSubmissionRepository();
    }

    // Service method to create new project submission data
    async createProjectSubmissionData(projectSubmissionData: IProjectSubmissionMark): Promise<IProjectSubmissionMark> {
        return await this.projectSubmissionRepository.createProjectSubmissionData(projectSubmissionData)
    }

    // Service method to get all project submission data
    async getAllProjectSubmissionData(): Promise<IProjectSubmissionMark[]|null> {
        return await this.projectSubmissionRepository.getAllProjectSubmissionData();
    }

    // Service method to get a specific project submission data by student ID
    async getProjectSubmissionDataByStudentId(studentId: string): Promise<IProjectSubmissionMark | null> {
        return await this.projectSubmissionRepository.getProjectSubmissionDataByStudentId(studentId)
    }

    // Service method to update project submission data using student Id
    async updateProjectSubmissionData(studentId: string, updates: Partial<IProjectSubmissionMark >): Promise<IProjectSubmissionMark | null> {
        return await this.projectSubmissionRepository.updateProjectSubmissionData(studentId, updates)
    }

    // Service method to delete project submission data
    async deleteProjectSubmissionDataByStudentId(studentId: string): Promise<IProjectSubmissionMark | null > {
        const deletedProjectSubmissionData = await this.projectSubmissionRepository.deleteProjectSubmissionDataByStudentId(studentId)
        if (deletedProjectSubmissionData === null) {
            console.warn(`No project submission data found for student ID: ${studentId}`);
            return null;
        }
        return await this.projectSubmissionRepository.deleteProjectSubmissionDataByStudentId(studentId)
    }
}

export default ProjectSubmissionService;
