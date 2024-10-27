"use strict";
//src/repositories/validation/linkedinValidationRepository.ts
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
exports.checkExistingLinkedInData = exports.validateLinkedInPostData = void 0;
const mongoose_1 = require("mongoose");
const marksValidation_1 = require("../../validation/marksValidation");
const marksModel_1 = require("../../models/marksModel");
// Validate the linkedin post data against the linkedin post validation schema
const validateLinkedInPostData = (linkedinData) => __awaiter(void 0, void 0, void 0, function* () {
    const validatedLinkedInData = yield marksValidation_1.linkedInPostMarkValidationSchema.parseAsync(linkedinData);
    // Convert _id to mongoose.Types.ObjectId and return a new object
    return Object.assign(Object.assign({}, validatedLinkedInData), { _id: new mongoose_1.Types.ObjectId(validatedLinkedInData._id), student: {
            _id: new mongoose_1.Types.ObjectId(validatedLinkedInData.student._id), // Convert student._id to ObjectId
            name: validatedLinkedInData.student.name,
            studentId: validatedLinkedInData.student.studentId,
        } }); // Type assertion to IAttendanceMark
});
exports.validateLinkedInPostData = validateLinkedInPostData;
// Check if linkedin post  data already exists for the student
const checkExistingLinkedInData = (studentId) => __awaiter(void 0, void 0, void 0, function* () {
    const existingLinkedInData = yield marksModel_1.LinkedInPostMarkModel.findOne({ studentId });
    return existingLinkedInData;
});
exports.checkExistingLinkedInData = checkExistingLinkedInData;
