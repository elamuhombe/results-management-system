"use strict";
//src/
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
exports.checkExistingAssessmentData = exports.validateAssessmentData = void 0;
const mongoose_1 = require("mongoose");
const marksValidation_1 = require("../../validation/marksValidation");
const marksModel_1 = require("../../models/marksModel");
// Validate the assessment  data against the assessment validation schema
const validateAssessmentData = (assessmentData) => __awaiter(void 0, void 0, void 0, function* () {
    // validate the incoming data
    const validatedData = yield marksValidation_1.assessmentMarkValidationSchema.parseAsync(assessmentData);
    // Convert _id to mongoose.Types.ObjectId and return a new object
    return Object.assign(Object.assign({}, validatedData), { _id: new mongoose_1.Types.ObjectId(validatedData._id), student: {
            _id: new mongoose_1.Types.ObjectId(validatedData.student._id), // Convert student._id to ObjectId
            studentId: validatedData.student.studentId,
            name: validatedData.student.name,
        } }); // Type assertion to IAssessmentMark
});
exports.validateAssessmentData = validateAssessmentData;
// check existing assessment data
const checkExistingAssessmentData = (studentId) => __awaiter(void 0, void 0, void 0, function* () {
    return marksModel_1.AssessmentMarkModel.findOne({ studentId });
});
exports.checkExistingAssessmentData = checkExistingAssessmentData;
