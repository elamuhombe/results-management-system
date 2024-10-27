// src/repositories/totalMarksRepository.ts


import TotalMarksModel from "../../models/totalMarks";
import { ITotalMarks } from "../../types/types";
import { calculateTotalMarks } from "../../utils/calculateTotalMarks";


class TotalMarksRepository {
  // Method to create a new total marks entry
  async createTotalMarks(data: ITotalMarks): Promise<ITotalMarks> {
    const newTotalMarks = await TotalMarksModel.create(data);
    return newTotalMarks;
  }

  // Method to get all total marks entries
  async getAllTotalMarks(): Promise<ITotalMarks[] | null> {
    const totalMarks = await TotalMarksModel.find();
    if (!totalMarks.length) {
      throw new Error("No total marks entries found.");
    }
    return totalMarks;
  }

  // Method to get total marks by student ID
  async getTotalMarksByStudentId(studentId: string): Promise<ITotalMarks | null> {
    const totalMark = await TotalMarksModel.findOne({ studentId });
    if (!totalMark) {
      throw new Error(`Total marks entry for student ID ${studentId} not found.`);
    }
    return totalMark;
  }

  // Method to update total marks by student ID
  async updateTotalMarksByStudentId(
    studentId: string,
    updatedData: Partial<ITotalMarks>
  ): Promise<ITotalMarks | null> {
    const updatedTotalMarks = await TotalMarksModel.findOneAndUpdate(
      { studentId },
      updatedData,
      { new: true }
    );

    if (!updatedTotalMarks) {
      console.warn(`Total marks entry for student ID ${studentId} not found.`);
      return null;
    }
    return updatedTotalMarks;
  }

  // Method to delete total marks entry
  async deleteTotalMarks(studentId: string): Promise<ITotalMarks | null> {
    const deletedTotalMarks = await TotalMarksModel.findOneAndDelete({ studentId });
    if (!deletedTotalMarks) {
      console.warn(`Total marks entry for student ID ${studentId} not found.`);
      return null;
    }
    return deletedTotalMarks;
  }

  // Method to calculate and save total marks for a student
  async calculateAndSaveTotalMarks(studentId: string): Promise<number> {
    try {
      const overallTotal = await calculateTotalMarks(studentId);
      await this.updateTotalMarksByStudentId(studentId, { overallTotal });
      return overallTotal;
    } catch (error: any) {
      throw new Error(`Error calculating and saving total marks: ${error.message}`);
    }
  }
}

export default TotalMarksRepository;
