"use strict";
//src/repositories/marks/assessmentRepository.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const marksModel_1 = require("../../models/marksModel");
const assessmentValidationRepository_1 = require("../validation/assessmentValidationRepository");
class AssessmentRepository {
    // Method to create and save assessment data
    createAssessmentData(assessmentData) {
        return __awaiter(this, void 0, void 0, function* () {
            const validatedAssessmentData = yield (0, assessmentValidationRepository_1.validateAssessmentData)(assessmentData);
            // check for existing assessment data before creating a new one
            const existingAssessmentData = yield (0, assessmentValidationRepository_1.checkExistingAssessmentData)(validatedAssessmentData.student.studentId);
            if (existingAssessmentData) {
                throw new Error(`Assessment data for student with id: ${validatedAssessmentData.student.studentId} already exists`);
            }
            const newAssessmentData = yield marksModel_1.AssessmentMarkModel.create(validatedAssessmentData);
            return newAssessmentData;
        });
    }
    // Method to update assessment data by student Id
    updateAssessmentData(studentId, updatedData) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedAssessmentData = yield marksModel_1.AssessmentMarkModel.findOneAndUpdate({ studentId }, updatedData, { new: true });
            if (!updatedAssessmentData) {
                console.warn(`No assessment data found for student with ID ${studentId}`);
                return null;
            }
            return updatedAssessmentData;
        });
    }
    // Method to get assessment data by student Id
    getAssessmentDataByStudentId(studentId) {
        return __awaiter(this, void 0, void 0, function* () {
            const assessmentData = yield marksModel_1.AssessmentMarkModel.findOne({ studentId });
            if (!assessmentData) {
                throw new Error(`Error occured in fetching assessment data for student with id ${studentId}`);
            }
            return assessmentData;
        });
    }
    // Method to get all assessment data
    getAllAssessmentData() {
        return __awaiter(this, void 0, void 0, function* () {
            const allAssessmentData = yield marksModel_1.AssessmentMarkModel.find();
            if (!allAssessmentData || allAssessmentData.length === 0) {
                throw new Error(`Error in fetching all assessment data`);
            }
            return allAssessmentData;
        });
    }
    // Method to delete assessment data by student ID
    deleteAssessmentDataByStudentId(studentId) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedStudentAssessmentData = yield marksModel_1.AssessmentMarkModel.findOneAndDelete({ studentId });
            // Check if the assessment data was found and deleted
            if (!deletedStudentAssessmentData) {
                console.warn(`No assessment data found for student with ID ${studentId}`);
                return null; // Return null instead of throwing an error
            }
            return deletedStudentAssessmentData; // Return the deleted assessment mark
        });
    }
    //Method to delete all assessment data
    deleteAllAssessmentData() {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedAllAssessmentData = yield marksModel_1.AssessmentMarkModel.deleteMany();
            if (deletedAllAssessmentData.deletedCount === 0) {
                throw new Error(`No assessment data to delete`);
            }
            return { deletedCount: deletedAllAssessmentData.deletedCount };
        });
    }
}
exports.default = AssessmentRepository;
