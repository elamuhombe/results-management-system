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
const express_1 = require("express");
const assessmentMarksController_1 = __importDefault(require("../controllers/assessmentMarksController"));
const errorHandler_1 = __importDefault(require("../middleware/errorHandler"));
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const assessmentRouter = (0, express_1.Router)();
const assessmentController = new assessmentMarksController_1.default();
// Route to create and save assessment data
assessmentRouter.post("/add-assessment", authMiddleware_1.default, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Add your logic to add an assessment
        return res.status(201).json({ message: "Assessment added successfully." });
    }
    catch (error) {
        next(error);
    }
}));
// Route to get assessment data by student ID
assessmentRouter.get("/assessment/:studentId", authMiddleware_1.default, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const assessmentData = yield assessmentController.getAssessmentByStudentId(req, res, next);
        res.status(200).json(assessmentData);
    }
    catch (error) {
        next(error);
    }
}));
// Route to get all assessment data
assessmentRouter.get("/assessment", authMiddleware_1.default, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const assessments = yield assessmentController.getAllAssessments(req, res, next);
        res.status(200).json(assessments);
    }
    catch (error) {
        next(error);
    }
}));
// Route to update assessment data by student ID
assessmentRouter.put("/assessment/update-assessment/:studentId", authMiddleware_1.default, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedAssessmentData = yield assessmentController.updateAssessment(req, res, next);
        res.status(200).json(updatedAssessmentData);
    }
    catch (error) {
        next(error);
    }
}));
// Route to delete assessment data by student ID
assessmentRouter.delete("/assessment/:studentId", authMiddleware_1.default, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedAssessmentData = yield assessmentController.deleteAssessment(req, res, next);
        res.status(204).send(); // No Content
    }
    catch (error) {
        next(error);
    }
}));
// Route to delete all assessment data
assessmentRouter.delete("/assessment", authMiddleware_1.default, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield assessmentController.deleteAllAssessments(req, res, next);
        res.status(204).send(); // No Content
    }
    catch (error) {
        next(error);
    }
}));
// Add the error handler as middleware after all routes
assessmentRouter.use((err, req, res, next) => {
    (0, errorHandler_1.default)(err, req, res, next);
});
exports.default = assessmentRouter;
