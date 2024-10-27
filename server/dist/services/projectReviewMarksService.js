"use strict";
//src/services/projectReviewMarksService.ts
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
const projectReviewRepository_1 = __importDefault(require("../repositories/marks/projectReviewRepository"));
class ProjectReviewService {
    constructor() {
        this.projectReviewRepository = new projectReviewRepository_1.default();
    }
    // Service method to create new project review data
    createProjectReviewData(projectReviewData) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.projectReviewRepository.createProjectReviewMark(projectReviewData);
        });
    }
    // Service method to get all project review data
    getAllProjectReviewData() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.projectReviewRepository.getAllProjectReviewData();
        });
    }
    // Service method to get a specific project review data by student ID
    getProjectReviewDataByStudentId(studentId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.projectReviewRepository.getProjectReviewMarkByStudentId(studentId);
        });
    }
    // Service method to update project review data using student Id
    updateProjectReviewData(studentId, updates) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.projectReviewRepository.updateProjectReviewDataByStudentId(studentId, updates);
        });
    }
    // Service method to delete project review data
    deleteProjectReviewDataByStudentId(studentId) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedProjectReviewData = yield this.projectReviewRepository.deleteProjectReviewData(studentId);
            if (deletedProjectReviewData === null) {
                console.warn(`No project review data found for student ID: ${studentId}`);
                return null;
            }
            return yield this.projectReviewRepository.deleteProjectReviewData(studentId);
        });
    }
}
exports.default = ProjectReviewService;
