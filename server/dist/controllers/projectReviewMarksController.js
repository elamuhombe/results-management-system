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
const projectReviewMarksService_1 = __importDefault(require("../services/projectReviewMarksService"));
const errorHandler_1 = __importDefault(require("../middleware/errorHandler")); // Import the error handler
class ProjectReviewController {
    constructor() {
        this.projectReviewService = new projectReviewMarksService_1.default();
    }
    // Controller method to create a new project review mark
    createProjectReviewMark(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const projectReviewData = req.body;
                const newProjectReviewMark = yield this.projectReviewService.createProjectReviewData(projectReviewData);
                return res.status(201).json(newProjectReviewMark);
            }
            catch (error) {
                return (0, errorHandler_1.default)(error, req, res, next); // Use the error handler
            }
        });
    }
    // Controller method to get all project review marks
    getAllProjectReviewMarks(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const projectReviewMarks = yield this.projectReviewService.getAllProjectReviewData();
                return res.status(200).json(projectReviewMarks);
            }
            catch (error) {
                return (0, errorHandler_1.default)(error, req, res, next); // Use the error handler
            }
        });
    }
    // Controller method to get a specific project review mark by student ID
    getProjectReviewMarkByStudentId(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { studentId } = req.params;
                const projectReviewMark = yield this.projectReviewService.getProjectReviewDataByStudentId(studentId);
                return res.status(200).json(projectReviewMark);
            }
            catch (error) {
                return (0, errorHandler_1.default)(error, req, res, next); // Use the error handler
            }
        });
    }
    // Controller method to update project review mark using student ID
    updateProjectReviewMark(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { studentId } = req.params;
                const updates = req.body;
                const updatedProjectReviewMark = yield this.projectReviewService.updateProjectReviewData(studentId, updates);
                return res.status(200).json(updatedProjectReviewMark);
            }
            catch (error) {
                return (0, errorHandler_1.default)(error, req, res, next); // Use the error handler
            }
        });
    }
    // Controller method to delete a project review mark by student ID
    deleteProjectReviewMark(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { studentId } = req.params;
                const deletedProjectReviewMark = yield this.projectReviewService.deleteProjectReviewDataByStudentId(studentId);
                return res.status(200).json(deletedProjectReviewMark);
            }
            catch (error) {
                return (0, errorHandler_1.default)(error, req, res, next); // Use the error handler
            }
        });
    }
}
exports.default = ProjectReviewController;
