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
const errorHandler_1 = __importDefault(require("../middleware/errorHandler"));
const linkedinPostMarksService_1 = __importDefault(require("../services/linkedinPostMarksService"));
class LinkedinPostMarksController {
    constructor() {
        this.linkedinService = new linkedinPostMarksService_1.default();
    }
    // Controller method to create a new LinkedIn post data
    createLinkedinPostData(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const linkedinPostData = req.body;
                const newLinkedinPost = yield this.linkedinService.createLinkedinPostData(linkedinPostData);
                return res.status(201).json(newLinkedinPost);
            }
            catch (error) {
                return (0, errorHandler_1.default)(error, req, res, next); // Use the error handler
            }
        });
    }
    // Controller method to get all LinkedIn post data
    getAllLinkedinPostData(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const linkedinPosts = yield this.linkedinService.getAllLinkedinPostData();
                return res.status(200).json(linkedinPosts);
            }
            catch (error) {
                return (0, errorHandler_1.default)(error, req, res, next); // Use the error handler
            }
        });
    }
    // Controller method to get LinkedIn post data by student ID
    getLinkedinPostDataByStudentId(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { studentId } = req.params;
                const linkedinPost = yield this.linkedinService.getLinkedinPostDataByStudentId(studentId);
                if (!linkedinPost) {
                    return res.status(404).json({ message: `No post found for student ID: ${studentId}` });
                }
                return res.status(200).json(linkedinPost);
            }
            catch (error) {
                return (0, errorHandler_1.default)(error, req, res, next); // Use the error handler
            }
        });
    }
    // Controller method to update LinkedIn post data
    updateLinkedinPostData(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { studentId } = req.params;
                const updates = req.body;
                const updatedLinkedinPost = yield this.linkedinService.updateLinkedinPostData(studentId, updates);
                if (!updatedLinkedinPost) {
                    return res.status(404).json({ message: `No post found for student ID: ${studentId}` });
                }
                return res.status(200).json(updatedLinkedinPost);
            }
            catch (error) {
                return (0, errorHandler_1.default)(error, req, res, next); // Use the error handler
            }
        });
    }
    // Controller method to delete LinkedIn post data by student ID
    deleteLinkedinPostData(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { studentId } = req.params;
                const deletedLinkedinPost = yield this.linkedinService.deleteLinkedinPostData(studentId);
                if (!deletedLinkedinPost) {
                    return res.status(404).json({ message: `No post found for student ID: ${studentId}` });
                }
                return res.status(200).json({ message: `Post deleted successfully for student ID: ${studentId}`, result: deletedLinkedinPost });
            }
            catch (error) {
                return (0, errorHandler_1.default)(error, req, res, next); // Use the error handler
            }
        });
    }
    // Controller method to delete all LinkedIn post data
    deleteAllLinkedinPostData(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.linkedinService.deleteAllLinkedinPostData();
                return res.status(200).json({ message: `${result.deletedCount} posts deleted successfully.` });
            }
            catch (error) {
                return (0, errorHandler_1.default)(error, req, res, next); // Use the error handler
            }
        });
    }
}
exports.default = LinkedinPostMarksController;
