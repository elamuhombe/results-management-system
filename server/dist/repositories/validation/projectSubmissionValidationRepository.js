"use strict";
//src/repositories/validation/projectSubmissionValidationRepository.ts
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
exports.checkExistingProjectSubmissionData = exports.validateProjectSubmissionData = void 0;
const mongoose_1 = require("mongoose");
const marksModel_1 = require("../../models/marksModel");
const marksValidation_1 = require("../../validation/marksValidation");
// Validate the project submission data against the project submission validation schema
const validateProjectSubmissionData = (projectSubmissionData) => __awaiter(void 0, void 0, void 0, function* () {
    const validatedProjectSubmissionData = yield marksValidation_1.projectSubmissionMarkValidationSchema.parseAsync(projectSubmissionData);
    // Convert _id to mongoose.Types.ObjectId and return a new object
    return Object.assign(Object.assign({}, validatedProjectSubmissionData), { _id: new mongoose_1.Types.ObjectId(validatedProjectSubmissionData._id), student: {
            _id: new mongoose_1.Types.ObjectId(validatedProjectSubmissionData.student._id), // Convert student._id to ObjectId
            name: validatedProjectSubmissionData.student.name,
            studentId: validatedProjectSubmissionData.student.studentId,
        } });
});
exports.validateProjectSubmissionData = validateProjectSubmissionData;
// Check if project submission datat already exists for the student
const checkExistingProjectSubmissionData = (studentId) => __awaiter(void 0, void 0, void 0, function* () {
    const existingProjectSubmissionData = yield marksModel_1.ProjectSubmissionMarkModel.findOne({ studentId });
    return existingProjectSubmissionData;
});
exports.checkExistingProjectSubmissionData = checkExistingProjectSubmissionData;
