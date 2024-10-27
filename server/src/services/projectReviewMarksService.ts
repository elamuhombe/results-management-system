//src/services/projectReviewMarksService.ts

import ProjectReviewRepository from '../repositories/marks/projectReviewRepository';
import {  IProjectReviewMark } from '../types/types';

class ProjectReviewService {
    private projectReviewRepository: ProjectReviewRepository;

    constructor() {
        this.projectReviewRepository = new ProjectReviewRepository();
    }

    // Service method to create new project review data
    async createProjectReviewData(projectReviewData: IProjectReviewMark): Promise<IProjectReviewMark> {
        return await this.projectReviewRepository.createProjectReviewMark(projectReviewData)
    }

    // Service method to get all project review data
    async getAllProjectReviewData(): Promise<IProjectReviewMark[]|null> {
        return await this.projectReviewRepository.getAllProjectReviewData();
    }

    // Service method to get a specific project review data by student ID
    async getProjectReviewDataByStudentId(studentId: string): Promise<IProjectReviewMark | null> {
        return await this.projectReviewRepository.getProjectReviewMarkByStudentId(studentId)
    }

    // Service method to update project review data using student Id
    async updateProjectReviewData(studentId: string, updates: Partial<IProjectReviewMark >): Promise<IProjectReviewMark | null> {
        return await this.projectReviewRepository.updateProjectReviewDataByStudentId(studentId, updates)
    }

    // Service method to delete project review data
    async deleteProjectReviewDataByStudentId(studentId: string): Promise<IProjectReviewMark | null > {
        const deletedProjectReviewData = await this.projectReviewRepository.deleteProjectReviewData(studentId)
        if (deletedProjectReviewData === null) {
            console.warn(`No project review data found for student ID: ${studentId}`);
            return null;
        }
        return await this.projectReviewRepository.deleteProjectReviewData(studentId)
    }
}

export default ProjectReviewService;
