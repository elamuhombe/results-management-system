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
const projectSubmissionMarksService_1 = __importDefault(require("../services/projectSubmissionMarksService"));
const errorHandler_1 = __importDefault(require("../middleware/errorHandler")); // Import the error handler
class ProjectSubmissionController {
    constructor() {
        this.projectSubmissionService = new projectSubmissionMarksService_1.default();
    }
    // Controller method to create a new project submission mark
    createProjectSubmissionMark(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const projectSubmissionData = req.body;
                const newProjectSubmissionMark = yield this.projectSubmissionService.createProjectSubmissionData(projectSubmissionData);
                return res.status(201).json(newProjectSubmissionMark);
            }
            catch (error) {
                return (0, errorHandler_1.default)(error, req, res, next); // Use the error handler
            }
        });
    }
    // Controller method to get all project submission marks
    getAllProjectSubmissionMarks(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const projectSubmissionMarks = yield this.projectSubmissionService.getAllProjectSubmissionData();
                return res.status(200).json(projectSubmissionMarks);
            }
            catch (error) {
                return (0, errorHandler_1.default)(error, req, res, next); // Use the error handler
            }
        });
    }
    // Controller method to get a specific project submission mark by student ID
    getProjectSubmissionMarkByStudentId(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { studentId } = req.params;
                const projectSubmissionMark = yield this.projectSubmissionService.getProjectSubmissionDataByStudentId(studentId);
                return res.status(200).json(projectSubmissionMark);
            }
            catch (error) {
                return (0, errorHandler_1.default)(error, req, res, next); // Use the error handler
            }
        });
    }
    // Controller method to update project submission mark using student ID
    updateProjectSubmissionMark(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { studentId } = req.params;
                const updates = req.body;
                const updatedProjectSubmissionMark = yield this.projectSubmissionService.updateProjectSubmissionData(studentId, updates);
                return res.status(200).json(updatedProjectSubmissionMark);
            }
            catch (error) {
                return (0, errorHandler_1.default)(error, req, res, next); // Use the error handler
            }
        });
    }
    // Controller method to delete a project submission mark by student ID
    deleteProjectSubmissionMark(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { studentId } = req.params;
                const deletedProjectSubmissionMark = yield this.projectSubmissionService.deleteProjectSubmissionDataByStudentId(studentId);
                return res.status(200).json(deletedProjectSubmissionMark);
            }
            catch (error) {
                return (0, errorHandler_1.default)(error, req, res, next); // Use the error handler
            }
        });
    }
}
exports.default = ProjectSubmissionController;
