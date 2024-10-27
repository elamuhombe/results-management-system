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
const totalMarksService_1 = __importDefault(require("../services/totalMarksService"));
class TotalMarksController {
    constructor() {
        this.totalMarksService = new totalMarksService_1.default();
    }
    // Controller method to create a new total marks entry
    createTotalMarks(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                const newTotalMarks = yield this.totalMarksService.createTotalMarks(data);
                return res.status(201).json(newTotalMarks);
            }
            catch (error) {
                return (0, errorHandler_1.default)(error, req, res, next); // Use the error handler
            }
        });
    }
    // Controller method to get all total marks entries
    getAllTotalMarks(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const totalMarks = yield this.totalMarksService.getAllTotalMarks();
                return res.status(200).json(totalMarks);
            }
            catch (error) {
                return (0, errorHandler_1.default)(error, req, res, next); // Use the error handler
            }
        });
    }
    // Controller method to get total marks by student ID
    getTotalMarksByStudentId(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { studentId } = req.params;
            try {
                const totalMarks = yield this.totalMarksService.getTotalMarksByStudentId(studentId);
                return res.status(200).json(totalMarks);
            }
            catch (error) {
                return (0, errorHandler_1.default)(error, req, res, next); // Use the error handler
            }
        });
    }
    // Controller method to update total marks by student ID
    updateTotalMarksByStudentId(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { studentId } = req.params;
            const updatedData = req.body;
            try {
                const updatedTotalMarks = yield this.totalMarksService.updateTotalMarksByStudentId(studentId, updatedData);
                return res.status(200).json(updatedTotalMarks);
            }
            catch (error) {
                return (0, errorHandler_1.default)(error, req, res, next); // Use the error handler
            }
        });
    }
    // Controller method to delete total marks entry
    deleteTotalMarks(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { studentId } = req.params;
            try {
                const deletedTotalMarks = yield this.totalMarksService.deleteTotalMarks(studentId);
                return res.status(200).json(deletedTotalMarks);
            }
            catch (error) {
                return (0, errorHandler_1.default)(error, req, res, next); // Use the error handler
            }
        });
    }
    // Controller method to calculate and save total marks for a student
    calculateAndSaveTotalMarks(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { studentId } = req.params;
            try {
                const overallTotal = yield this.totalMarksService.calculateAndSaveTotalMarks(studentId);
                return res.status(200).json({ studentId, overallTotal });
            }
            catch (error) {
                return (0, errorHandler_1.default)(error, req, res, next); // Use the error handler
            }
        });
    }
}
exports.default = TotalMarksController;
