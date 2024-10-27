"use strict";
// src/services/TotalMarksService.ts
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
const totalMarksRepository_1 = __importDefault(require("../repositories/marks/totalMarksRepository"));
class TotalMarksService {
    constructor() {
        this.totalMarksRepository = new totalMarksRepository_1.default();
    }
    // Create a new total marks entry
    createTotalMarks(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.totalMarksRepository.createTotalMarks(data);
        });
    }
    // Get all total marks entries
    getAllTotalMarks() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.totalMarksRepository.getAllTotalMarks();
        });
    }
    // Get total marks by student ID
    getTotalMarksByStudentId(studentId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.totalMarksRepository.getTotalMarksByStudentId(studentId);
        });
    }
    // Update total marks by student ID
    updateTotalMarksByStudentId(studentId, updatedData) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.totalMarksRepository.updateTotalMarksByStudentId(studentId, updatedData);
        });
    }
    // Delete total marks entry
    deleteTotalMarks(studentId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.totalMarksRepository.deleteTotalMarks(studentId);
        });
    }
    // Calculate and save total marks for a student
    calculateAndSaveTotalMarks(studentId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.totalMarksRepository.calculateAndSaveTotalMarks(studentId);
        });
    }
}
exports.default = TotalMarksService;
