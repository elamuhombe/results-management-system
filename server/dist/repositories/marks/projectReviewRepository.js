"use strict";
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
const projectReviewMarkValidation_1 = require("../validation/projectReviewMarkValidation");
const marksModel_1 = require("../../models/marksModel");
//Method to create and save new project review marks
class ProjectReviewRepository {
    createProjectReviewMark(projectReviewData) {
        return __awaiter(this, void 0, void 0, function* () {
            const validatedProjectReviewData = yield (0, projectReviewMarkValidation_1.validateProjectReviewData)(projectReviewData);
            // Check for existing project review data before creating a new one
            const existingProjectReviewData = yield (0, projectReviewMarkValidation_1.checkExistingProjectReviewData)(validatedProjectReviewData.student.studentId);
            if (existingProjectReviewData) {
                throw new Error(`Project review mark already exists for student with ID ${validatedProjectReviewData.student.studentId}`);
            }
            const newProjectReviewMark = yield marksModel_1.ProjectReviewMarkModel.create(validatedProjectReviewData);
            return newProjectReviewMark;
        });
    }
    // Method to get all project review marks
    getAllProjectReviewData() {
        return __awaiter(this, void 0, void 0, function* () {
            const allProjectReviewMarks = yield marksModel_1.ProjectReviewMarkModel.find();
            if (allProjectReviewMarks.length === 0 || !allProjectReviewMarks) {
                throw new Error("No project review marks found");
            }
            return allProjectReviewMarks;
        });
    }
    // Method to get a specific project review mark by ID
    getProjectReviewMarkByStudentId(studentId) {
        return __awaiter(this, void 0, void 0, function* () {
            const projectReviewMarks = yield marksModel_1.ProjectReviewMarkModel.findOne({
                studentId,
            });
            if (!projectReviewMarks) {
                throw new Error(`Project review marks for student with  ID: ${studentId} does not exist.`);
            }
            return projectReviewMarks;
        });
    }
    // Method to update project review mark
    updateProjectReviewDataByStudentId(studentId, updatedData) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedProjectReviewData = yield marksModel_1.ProjectReviewMarkModel.findOneAndUpdate({ studentId }, updatedData, { new: true });
            if (!updatedProjectReviewData) {
                throw new Error(`Project review data not updated for student with id: ${studentId}`);
            }
            return updatedProjectReviewData;
        });
    }
    // Method to delete a project review mark
    deleteProjectReviewData(studentId) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedProjectReviewData = yield marksModel_1.ProjectReviewMarkModel.findOneAndDelete({ studentId });
            try {
                const deletedProjectReviewData = yield marksModel_1.ProjectReviewMarkModel.findOneAndDelete({ studentId });
                if (!deletedProjectReviewData) {
                    throw new Error(`Problem occurred while deleting project review data for student with ID: ${studentId}`);
                }
                return deletedProjectReviewData;
            }
            catch (error) {
                // Handle unexpected errors
                throw new Error(`Failed to delete project review data: ${error.message}`);
            }
        });
    }
}
exports.default = ProjectReviewRepository;
