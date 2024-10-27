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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler_1 = __importDefault(require("../middleware/errorHandler")); // Import the error handler
const assessmentMarksService_1 = __importDefault(require("../services/assessmentMarksService"));
class AssessmentController {
    constructor() {
        this.assessmentService = new assessmentMarksService_1.default();
    }
    // Controller method to create a new assessment mark
    createAssessment(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const assessmentData = req.body;
                const newAssessment = yield this.assessmentService.createAssessment(assessmentData);
                return res.status(201).json(newAssessment);
            }
            catch (error) {
                return (0, errorHandler_1.default)(error, req, res, next); // Use the error handler
            }
        });
    }
    // Controller method to get all assessment marks
    getAllAssessments(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const assessments = yield this.assessmentService.getAllAssessments();
                return res.status(200).json(assessments);
            }
            catch (error) {
                return (0, errorHandler_1.default)(error, req, res, next); // Use the error handler
            }
        });
    }
    // Controller method to get assessment marks by student ID
    getAssessmentByStudentId(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { studentId } = req.params;
            try {
                const assessment = yield this.assessmentService.getAssessmentByStudentId(studentId);
                if (!assessment) {
                    return res
                        .status(404)
                        .json({
                        message: `No assessment found for student ID: ${studentId}`,
                    });
                }
                return res.status(200).json(assessment);
            }
            catch (error) {
                return (0, errorHandler_1.default)(error, req, res, next); // Use the error handler
            }
        });
    }
    // Controller method to update an assessment mark
    updateAssessment(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { studentId } = req.params;
            const updates = req.body;
            try {
                const updatedAssessment = yield this.assessmentService.updateAssessment(studentId, updates);
                if (!updatedAssessment) {
                    return res
                        .status(404)
                        .json({
                        message: `Assessment for student ID ${studentId} not found.`,
                    });
                }
                return res.status(200).json(updatedAssessment);
            }
            catch (error) {
                return (0, errorHandler_1.default)(error, req, res, next); // Use the error handler
            }
        });
    }
    // Controller method to delete an assessment entry by student ID
    deleteAssessment(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { studentId } = req.params;
            try {
                const deletedAssessment = yield this.assessmentService.deleteAssessmentData(studentId);
                if (!deletedAssessment) {
                    return res
                        .status(404)
                        .json({
                        message: `No assessment mark found for student ID: ${studentId}`,
                    });
                }
                return res.status(200).json(deletedAssessment);
            }
            catch (error) {
                return (0, errorHandler_1.default)(error, req, res, next); // Use the error handler
            }
        });
    }
    // Controller method to delete all assessment entries
    deleteAllAssessments(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.assessmentService.deleteAllAssessmentData();
                return res
                    .status(200)
                    .json({ message: `${result.deleteCount} assessment entries deleted.` });
            }
            catch (error) {
                return (0, errorHandler_1.default)(error, req, res, next); // Use the error handler
            }
        });
    }
}
exports.default = AssessmentController;
