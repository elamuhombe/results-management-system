"use strict";
// src/repositories/totalMarksRepository.ts
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
const totalMarks_1 = __importDefault(require("../../models/totalMarks"));
const calculateTotalMarks_1 = require("../../utils/calculateTotalMarks");
class TotalMarksRepository {
    // Method to create a new total marks entry
    createTotalMarks(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const newTotalMarks = yield totalMarks_1.default.create(data);
            return newTotalMarks;
        });
    }
    // Method to get all total marks entries
    getAllTotalMarks() {
        return __awaiter(this, void 0, void 0, function* () {
            const totalMarks = yield totalMarks_1.default.find();
            if (!totalMarks.length) {
                throw new Error("No total marks entries found.");
            }
            return totalMarks;
        });
    }
    // Method to get total marks by student ID
    getTotalMarksByStudentId(studentId) {
        return __awaiter(this, void 0, void 0, function* () {
            const totalMark = yield totalMarks_1.default.findOne({ studentId });
            if (!totalMark) {
                throw new Error(`Total marks entry for student ID ${studentId} not found.`);
            }
            return totalMark;
        });
    }
    // Method to update total marks by student ID
    updateTotalMarksByStudentId(studentId, updatedData) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedTotalMarks = yield totalMarks_1.default.findOneAndUpdate({ studentId }, updatedData, { new: true });
            if (!updatedTotalMarks) {
                console.warn(`Total marks entry for student ID ${studentId} not found.`);
                return null;
            }
            return updatedTotalMarks;
        });
    }
    // Method to delete total marks entry
    deleteTotalMarks(studentId) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedTotalMarks = yield totalMarks_1.default.findOneAndDelete({ studentId });
            if (!deletedTotalMarks) {
                console.warn(`Total marks entry for student ID ${studentId} not found.`);
                return null;
            }
            return deletedTotalMarks;
        });
    }
    // Method to calculate and save total marks for a student
    calculateAndSaveTotalMarks(studentId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const overallTotal = yield (0, calculateTotalMarks_1.calculateTotalMarks)(studentId);
                yield this.updateTotalMarksByStudentId(studentId, { overallTotal });
                return overallTotal;
            }
            catch (error) {
                throw new Error(`Error calculating and saving total marks: ${error.message}`);
            }
        });
    }
}
exports.default = TotalMarksRepository;
