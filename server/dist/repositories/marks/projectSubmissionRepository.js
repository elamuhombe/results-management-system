"use strict";
//src/repositories/marks/projectSubmissionRepository.ts
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
const projectSubmissionValidationRepository_1 = require("../validation/projectSubmissionValidationRepository");
class ProjectSubmissionRepository {
    //Method to create and save project submission marks
    createProjectSubmissionData(projectSubmissionData) {
        return __awaiter(this, void 0, void 0, function* () {
            const validatedProjectSubmissionData = yield (0, projectSubmissionValidationRepository_1.validateProjectSubmissionData)(projectSubmissionData);
            //check for existing project submission data
            const existingProjectSubmissionData = yield (0, projectSubmissionValidationRepository_1.checkExistingProjectSubmissionData)(validatedProjectSubmissionData.student.studentId);
            // Throw exception if existing project submission data found
            if (existingProjectSubmissionData) {
                throw new Error(`Project submission data already exists for student with Id: ${validatedProjectSubmissionData.student.studentId}`);
            }
            const newProjectSubmissionData = yield marksModel_1.ProjectSubmissionMarkModel.create(Object.assign({}, projectSubmissionValidationRepository_1.validateProjectSubmissionData));
            return newProjectSubmissionData;
        });
    }
    // Method to get project submission data by student Id
    getProjectSubmissionDataByStudentId(studentId) {
        return __awaiter(this, void 0, void 0, function* () {
            const projectSubmissionData = yield marksModel_1.ProjectSubmissionMarkModel.findOne({
                studentId,
            });
            if (!projectSubmissionData) {
                throw new Error(`Error in fetching project submission data for student with Id: ${studentId}`);
            }
            return projectSubmissionData;
        });
    }
    // Method to get all project submission data
    getAllProjectSubmissionData() {
        return __awaiter(this, void 0, void 0, function* () {
            const allProjectSubmissionData = yield marksModel_1.ProjectSubmissionMarkModel.find();
            if (allProjectSubmissionData.length === 0 || !allProjectSubmissionData) {
                throw new Error("Error occured in fetching all project submission data");
            }
            return allProjectSubmissionData;
        });
    }
    // Method to update project submission data by student Id
    updateProjectSubmissionData(studentId, updateData // pass an update object
    ) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedProjectSubmissionData = yield marksModel_1.ProjectSubmissionMarkModel.findOneAndUpdate({ studentId }, updateData, { new: true });
            if (!updatedProjectSubmissionData) {
                throw new Error(`Error occurred in updating project submission data for student with id: ${studentId}`);
            }
            return updatedProjectSubmissionData;
        });
    }
    // Method to delete project submission data by student Id
    deleteProjectSubmissionDataByStudentId(studentId) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedProjectSubmissionData = yield marksModel_1.ProjectSubmissionMarkModel.findOneAndDelete({ studentId });
            if (!deletedProjectSubmissionData) {
                throw new Error(`Error occured in deleting project submission data for student with Id ${studentId}`);
            }
            return deletedProjectSubmissionData;
        });
    }
    // Method to delete all project submission data
    deleteAllProjectSubmissionData() {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedAllProjectSubmissionData = yield marksModel_1.ProjectSubmissionMarkModel.deleteMany();
            if (deletedAllProjectSubmissionData.deletedCount === 0) {
                throw new Error("No project submission data to delete");
            }
            return { deletedCount: deletedAllProjectSubmissionData.deletedCount };
        });
    }
}
exports.default = ProjectSubmissionRepository;
