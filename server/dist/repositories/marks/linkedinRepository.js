"use strict";
//src/repositoroies/marks/linkedinRepository.ts
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
const linkedinValidationRepository_1 = require("../validation/linkedinValidationRepository");
class LinkedInRepository {
    //Method to create and save new linkedin post data
    createLinkedinData(linkedinData) {
        return __awaiter(this, void 0, void 0, function* () {
            const validatedLinkedInData = yield (0, linkedinValidationRepository_1.validateLinkedInPostData)(linkedinData);
            // check for existing linkedin data before creating a new one
            const existingLinkedInData = yield (0, linkedinValidationRepository_1.checkExistingLinkedInData)(validatedLinkedInData.student.studentId);
            // throw an error if existing linkedin data exists
            if (existingLinkedInData) {
                throw new Error(`linkedin post marks already exist for student with id: ${validatedLinkedInData.student.studentId}`);
            }
            const newLinkedInData = yield marksModel_1.LinkedInPostMarkModel.create(Object.assign({}, validatedLinkedInData));
            return newLinkedInData;
        });
    }
    // Method to get linkedin post data by student Id
    getLinkedInData(studentId) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingLinkedinMarks = yield marksModel_1.LinkedInPostMarkModel.findOne({
                studentId,
            });
            if (!existingLinkedinMarks) {
                throw new Error(`Error occurred in fetching linkedin post marks for student with id: ${studentId}`);
            }
            return existingLinkedinMarks;
        });
    }
    //Method to get all linkedin post data
    getAllLinkedInData() {
        return __awaiter(this, void 0, void 0, function* () {
            const allLinkedinData = yield marksModel_1.LinkedInPostMarkModel.find();
            if (!allLinkedinData || allLinkedinData.length === 0) {
                throw new Error("No LinkedIn data found");
            }
            return allLinkedinData;
        });
    }
    // Method to update LinkedIn post data by student Id
    updateLinkedInData(studentId, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedLinkedInData = yield marksModel_1.LinkedInPostMarkModel.findOneAndUpdate({ studentId }, updateData, { new: true } // Ensure the updated document is returned
            );
            if (!updatedLinkedInData) {
                throw new Error(`Error occurred in updating linkedin data for student with id ${studentId}`);
            }
            return updatedLinkedInData;
        });
    }
    // Method to delete LinkedIn post data by student Id
    deleteLinkedInData(studentId) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedLinkedinData = yield marksModel_1.LinkedInPostMarkModel.findOneAndDelete({
                studentId,
            });
            if (!deletedLinkedinData) {
                console.warn(`No linkedin post data found for student with ID ${studentId}`);
                return null; // Return null instead of throwing an error
            }
            return deletedLinkedinData;
        });
    }
    // Method to delete all linkedin post data
    deleteAllLinkedInData() {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedAllLinkedInData = yield marksModel_1.LinkedInPostMarkModel.deleteMany();
            if (deletedAllLinkedInData.deletedCount === 0) {
                throw new Error("No LinkedIn posts to delete");
            }
            return { deletedCount: deletedAllLinkedInData.deletedCount };
        });
    }
}
exports.default = LinkedInRepository;
