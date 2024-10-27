//src/services/linkedinPostMarksService.ts


import LinkedInRepository from '../repositories/marks/linkedinRepository';
import { IAssessmentMark, ILinkedInPostMark } from '../types/types';

class LinkedinService {
    private linkedinRepository: LinkedInRepository;

    constructor() {
        this.linkedinRepository = new LinkedInRepository();
    }

    // Service method to create a new linkedin post data
    async createLinkedinPostData(linkedinDPostata: ILinkedInPostMark): Promise<ILinkedInPostMark> {
        return await this.linkedinRepository.createLinkedinData(linkedinDPostata);
    }

    // Service method to get all linkedin post data
    async getAllLinkedinPostData(): Promise<ILinkedInPostMark[] | null> {
        return await this.linkedinRepository.getAllLinkedInData();
    }

    // Service method to get a specific linkedin post data by student ID
    async getLinkedinPostDataByStudentId(studentId: string): Promise<ILinkedInPostMark | null> {
        
        return await this.linkedinRepository.getLinkedInData(studentId) ;
    }

    // Service method to update linkedin post data
    async updateLinkedinPostData(studentId: string, updates: Partial<ILinkedInPostMark>): Promise<ILinkedInPostMark | null> {
        return await this.linkedinRepository.updateLinkedInData(studentId, updates);
    }

    // Service method to delete linkedin post data by student Id
    async deleteLinkedinPostData(studentId: string): Promise<ILinkedInPostMark | null> {
        const deletedLinkedinPostData = await this.linkedinRepository.deleteLinkedInData(studentId);
    
        if (deletedLinkedinPostData === null) {
    
            console.info(`No linkedin post data found for student ID: ${studentId}`); 
            return null; // Return null without warning
        }
        
        return deletedLinkedinPostData;
    }
    
    // Service method to delete all linkedin post data
    async deleteAllLinkedinPostData(): Promise<{ deletedCount: number }> {
        const deletedAllLinkedinPostData = await this.linkedinRepository.deleteAllLinkedInData();
        return { deletedCount: deletedAllLinkedinPostData.deletedCount };
      }
}

export default LinkedinService;
