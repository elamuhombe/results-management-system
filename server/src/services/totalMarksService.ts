// src/services/TotalMarksService.ts

import TotalMarksRepository from "../repositories/marks/totalMarksRepository";
import { ITotalMarks } from "../types/types";


class TotalMarksService {
  private totalMarksRepository: TotalMarksRepository;

  constructor() {
    this.totalMarksRepository = new TotalMarksRepository();
  }

  // Create a new total marks entry
  async createTotalMarks(data: ITotalMarks): Promise<ITotalMarks> {
    return this.totalMarksRepository.createTotalMarks(data);
  }

  // Get all total marks entries
  async getAllTotalMarks(): Promise<ITotalMarks[] | null> {
    return this.totalMarksRepository.getAllTotalMarks();
  }

  // Get total marks by student ID
  async getTotalMarksByStudentId(studentId: string): Promise<ITotalMarks | null> {
    return this.totalMarksRepository.getTotalMarksByStudentId(studentId);
  }

  // Update total marks by student ID
  async updateTotalMarksByStudentId(
    studentId: string,
    updatedData: Partial<ITotalMarks>
  ): Promise<ITotalMarks | null> {
    return this.totalMarksRepository.updateTotalMarksByStudentId(studentId, updatedData);
  }

  // Delete total marks entry
  async deleteTotalMarks(studentId: string): Promise<ITotalMarks | null> {
    return this.totalMarksRepository.deleteTotalMarks(studentId);
  }

  // Calculate and save total marks for a student
  async calculateAndSaveTotalMarks(studentId: string): Promise<number> {
    return this.totalMarksRepository.calculateAndSaveTotalMarks(studentId);
  }
}

export default TotalMarksService;
