"use strict";
// src/services/assessmentService.ts
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
const assessmentRepository_1 = __importDefault(require("../repositories/marks/assessmentRepository"));
class AssessmentService {
    constructor() {
        this.assessmentRepository = new assessmentRepository_1.default();
    }
    // Service method to create a new assessment mark
    createAssessment(assessmentData) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.assessmentRepository.createAssessmentData(assessmentData);
        });
    }
    // Service method to get all assessment marks
    getAllAssessments() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.assessmentRepository.getAllAssessmentData();
        });
    }
    // Service method to get a specific assessment mark by student ID
    getAssessmentByStudentId(studentId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.assessmentRepository.getAssessmentDataByStudentId(studentId);
        });
    }
    // Service method to update an assessment mark
    updateAssessment(studentId, updates) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.assessmentRepository.updateAssessmentData(studentId, updates);
        });
    }
    deleteAssessmentData(studentId) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedAssessmentData = yield this.assessmentRepository.deleteAssessmentDataByStudentId(studentId);
            if (deletedAssessmentData === null) {
                // You may choose to log this in a more user-friendly way, or handle it silently
                console.info(`No assessment mark found for student ID: ${studentId}`); // Changed to info
                return null; // Return null without warning
            }
            return deletedAssessmentData;
        });
    }
    deleteAllAssessmentData() {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedAllAssessmentData = yield this.assessmentRepository.deleteAllAssessmentData();
            return { deleteCount: deletedAllAssessmentData.deletedCount };
        });
    }
}
exports.default = AssessmentService;
