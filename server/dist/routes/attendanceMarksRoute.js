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
//src/routes/attendanceMarksRoute.ts
const express_1 = require("express");
const attendanceMarksController_1 = __importDefault(require("../controllers/attendanceMarksController"));
const attendanceRoute = (0, express_1.Router)();
const attendanceMarkController = new attendanceMarksController_1.default();
// Route to add attendance data
attendanceRoute.post('/attendance/add-attendance', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield attendanceMarkController.createAttendanceMark(req, res, next);
    }
    catch (error) {
        next(error); // Pass error to global error handler
    }
}));
// Route to get attendance for a specific student by studentId
attendanceRoute.get('/attendance/student/:studentId', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield attendanceMarkController.getAttendanceMarkByStudentId(req, res, next);
    }
    catch (error) {
        next(error); // Pass error to global error handler
    }
}));
// // Route to get attendance for a specific date
// attendanceRoute.get('/attendance/date/:date', async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         await attendanceMarkController.getAttendanceByDate(req, res, next);
//     } catch (error) {
//         next(error);  // Pass error to global error handler
//     }
// });
// Route to update attendance
attendanceRoute.put('/attendance/update/:studentId', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield attendanceMarkController.updateAttendanceMark(req, res, next);
    }
    catch (error) {
        next(error); // Pass error to global error handler
    }
}));
// Route to delete attendance
attendanceRoute.delete('/attendance/delete/:studentId', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield attendanceMarkController.deleteAttendanceMark(req, res, next);
    }
    catch (error) {
        next(error); // Pass error to global error handler
    }
}));
exports.default = attendanceRoute;
