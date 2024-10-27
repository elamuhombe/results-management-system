"use strict";
//src/services/projectSubmissionMarksService.ts
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
const projectSubmissionRepository_1 = __importDefault(require("../repositories/marks/projectSubmissionRepository"));
class ProjectSubmissionService {
    constructor() {
        this.projectSubmissionRepository = new projectSubmissionRepository_1.default();
    }
    // Service method to create new project submission data
    createProjectSubmissionData(projectSubmissionData) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.projectSubmissionRepository.createProjectSubmissionData(projectSubmissionData);
        });
    }
    // Service method to get all project submission data
    getAllProjectSubmissionData() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.projectSubmissionRepository.getAllProjectSubmissionData();
        });
    }
    // Service method to get a specific project submission data by student ID
    getProjectSubmissionDataByStudentId(studentId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.projectSubmissionRepository.getProjectSubmissionDataByStudentId(studentId);
        });
    }
    // Service method to update project submission data using student Id
    updateProjectSubmissionData(studentId, updates) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.projectSubmissionRepository.updateProjectSubmissionData(studentId, updates);
        });
    }
    // Service method to delete project submission data
    deleteProjectSubmissionDataByStudentId(studentId) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedProjectSubmissionData = yield this.projectSubmissionRepository.deleteProjectSubmissionDataByStudentId(studentId);
            if (deletedProjectSubmissionData === null) {
                console.warn(`No project submission data found for student ID: ${studentId}`);
                return null;
            }
            return yield this.projectSubmissionRepository.deleteProjectSubmissionDataByStudentId(studentId);
        });
    }
}
exports.default = ProjectSubmissionService;
