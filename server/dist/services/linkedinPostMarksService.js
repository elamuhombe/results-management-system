"use strict";
//src/services/linkedinPostMarksService.ts
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
const linkedinRepository_1 = __importDefault(require("../repositories/marks/linkedinRepository"));
class LinkedinService {
    constructor() {
        this.linkedinRepository = new linkedinRepository_1.default();
    }
    // Service method to create a new linkedin post data
    createLinkedinPostData(linkedinDPostata) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.linkedinRepository.createLinkedinData(linkedinDPostata);
        });
    }
    // Service method to get all linkedin post data
    getAllLinkedinPostData() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.linkedinRepository.getAllLinkedInData();
        });
    }
    // Service method to get a specific linkedin post data by student ID
    getLinkedinPostDataByStudentId(studentId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.linkedinRepository.getLinkedInData(studentId);
        });
    }
    // Service method to update linkedin post data
    updateLinkedinPostData(studentId, updates) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.linkedinRepository.updateLinkedInData(studentId, updates);
        });
    }
    // Service method to delete linkedin post data by student Id
    deleteLinkedinPostData(studentId) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedLinkedinPostData = yield this.linkedinRepository.deleteLinkedInData(studentId);
            if (deletedLinkedinPostData === null) {
                console.info(`No linkedin post data found for student ID: ${studentId}`);
                return null; // Return null without warning
            }
            return deletedLinkedinPostData;
        });
    }
    // Service method to delete all linkedin post data
    deleteAllLinkedinPostData() {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedAllLinkedinPostData = yield this.linkedinRepository.deleteAllLinkedInData();
            return { deletedCount: deletedAllLinkedinPostData.deletedCount };
        });
    }
}
exports.default = LinkedinService;
